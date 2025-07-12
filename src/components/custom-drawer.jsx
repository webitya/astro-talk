"use client"

import { useRef, useEffect, useCallback } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming cn utility is available

const CustomDrawer = ({ children, isOpen, onClose, title, side = "right", className }) => {
  const drawerRef = useRef(null)

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden" // Prevent scrolling background
    } else {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKeyDown])

  const getDrawerClasses = () => {
    let baseClasses = "fixed z-50 bg-background shadow-lg transition-transform ease-in-out duration-300 flex flex-col"
    let transformClasses = ""
    let sizeClasses = ""

    switch (side) {
      case "top":
        baseClasses += " inset-x-0 top-0 border-b"
        transformClasses = isOpen ? "translate-y-0" : "-translate-y-full"
        sizeClasses = "h-1/2" // Example height
        break
      case "bottom":
        baseClasses += " inset-x-0 bottom-0 border-t"
        transformClasses = isOpen ? "translate-y-0" : "translate-y-full"
        sizeClasses = "h-1/2" // Example height
        break
      case "left":
        baseClasses += " inset-y-0 left-0 h-full border-r"
        transformClasses = isOpen ? "translate-x-0" : "-translate-x-full"
        sizeClasses = "w-3/4 sm:max-w-sm"
        break
      case "right":
      default:
        baseClasses += " inset-y-0 right-0 h-full border-l"
        transformClasses = isOpen ? "translate-x-0" : "translate-x-full"
        sizeClasses = "w-3/4 sm:max-w-sm"
        break
    }

    return cn(baseClasses, transformClasses, sizeClasses, className)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/80 transition-opacity duration-300" onClick={onClose}></div>

      {/* Drawer Content */}
      <div ref={drawerRef} className={getDrawerClasses()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </>
  )
}

export default CustomDrawer
