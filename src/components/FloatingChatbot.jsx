/* eslint-disable react/prop-types */
"use client"

import { useState, useCallback, useEffect } from "react"
import { cn } from "../utils/helpers"
import Chatbot from "./Chatbot"

// Custom Modal Component
const Modal = ({ isOpen, onClose, children, screenSize }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div
        className={cn(
          "bg-white p-0 relative rounded-lg shadow-xl overflow-hidden flex flex-col",
          screenSize === "small"
            ? "w-[95vw] h-[90vh] max-w-none"
            : screenSize === "medium"
              ? "w-[85vw] h-[85vh] max-w-[800px] rounded-xl"
              : "w-[75vw] h-[85vh] max-w-[1200px] rounded-xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute z-50 rounded-full backdrop-blur-sm",
            screenSize === "small"
              ? "right-2 top-2 p-1.5 bg-white/70 hover:bg-white"
              : screenSize === "medium"
                ? "right-3 top-3 p-2 bg-white/75 hover:bg-white shadow-md"
                : "right-4 top-4 p-2.5 bg-white/80 hover:bg-white shadow-lg",
          )}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              screenSize === "small" ? "h-4 w-4" : screenSize === "medium" ? "h-4.5 w-4.5" : "h-5 w-5",
              "text-blue-800",
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [screenSize, setScreenSize] = useState("medium")

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small")
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium")
      } else {
        setScreenSize("large")
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Memoize the open/close handlers to prevent unnecessary re-renders
  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={handleOpen}
        className={cn(
          "fixed rounded-full shadow-lg z-50",
          "flex items-center justify-center",
          "bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300",
          screenSize === "small"
            ? "bottom-4 right-4 w-12 h-12 gap-1"
            : screenSize === "medium"
              ? "bottom-6 right-6 w-14 h-14 gap-1.5"
              : "bottom-8 right-8 w-16 h-16 gap-2",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        aria-label="Open chat"
      >
        {/* {screenSize !== "small" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn(screenSize === "medium" ? "h-4 w-4" : "h-5 w-5")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        )} */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn(screenSize === "small" ? "h-5 w-5" : screenSize === "medium" ? "h-5.5 w-5.5" : "h-6 w-6")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {/* Custom Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} screenSize={screenSize}>
        {isOpen && <Chatbot />}
      </Modal>
    </>
  )
}

export default FloatingChatbot

