// Безопасная сериализация данных для <script type="application/ld+json">.
// JSON.stringify НЕ экранирует '<', '>', '&', поэтому строка вида
// "</script><script>…" в любом поле (в т.ч. из CMS) ломает контекст тега
// и приводит к stored XSS. Экранируем эти символы в \uXXXX-форму —
// валидный JSON, но безопасный внутри HTML <script>.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}
