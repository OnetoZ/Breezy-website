"use client"

import { useEffect, useRef, useState } from "react"

export function useInView(options = { threshold: 0.1 }) {
  const ref = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      // Toggle based on visibility so animations can re-run
      setIsInView(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { ref, isInView }
}
