'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  useEffect(() => {
    document.documentElement.classList.add('studio-page')
    return () => document.documentElement.classList.remove('studio-page')
  }, [])
  return <NextStudio config={config} />
}
