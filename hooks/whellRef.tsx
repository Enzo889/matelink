"use client"
import { useEffect, useRef, type ReactNode } from "react"

interface ScrollContainerProps {
  children: ReactNode
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as Element

      // Si el scroll ya está ocurriendo dentro del main, no interceptar
      if (mainRef.current && mainRef.current.contains(target)) {
        return // Permitir comportamiento nativo
      }

      // Solo interceptar si el scroll viene de fuera del main
      e.preventDefault()

      if (mainRef.current) {
        // Usar scrollBy para mantener la barra de scroll nativa
        mainRef.current.scrollBy({
          top: e.deltaY,
          behavior: "smooth", // Cambiar a 'smooth' si quieres scroll suave
        })
      }
    }

    // Agregar el event listener a todo el documento
    document.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      document.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return (
    <main ref={mainRef} className="overflow-y-auto h-full scrollbar-hide scroll-smooth">
      {children}
    </main>
  )
}
