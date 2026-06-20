/* eslint-disable react/prop-types */
"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, MessageCircle } from "lucide-react"
import { cn } from "../utils/helpers"
import Chatbot from "./Chatbot"

// Custom Modal Component
const Modal = ({ isOpen, onClose, children, screenSize }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-ink-950/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={cn(
              "bg-white dark:bg-surface-dark-subtle p-0 relative rounded-xl2 shadow-soft-lg overflow-hidden flex flex-col border border-ink-100 dark:border-ink-800",
              screenSize === "small"
                ? "w-[95vw] h-[90vh] max-w-none"
                : screenSize === "medium"
                  ? "w-[85vw] h-[85vh] max-w-[800px]"
                  : "w-[75vw] h-[85vh] max-w-[1200px]",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute z-50 rounded-full backdrop-blur-sm transition-colors",
                "bg-white/80 hover:bg-white dark:bg-ink-800/80 dark:hover:bg-ink-700",
                screenSize === "small"
                  ? "right-2 top-2 p-1.5"
                  : screenSize === "medium"
                    ? "right-3 top-3 p-2 shadow-md"
                    : "right-4 top-4 p-2.5 shadow-lg",
              )}
              aria-label="Close"
            >
              <X
                className={cn(
                  screenSize === "small" ? "h-4 w-4" : screenSize === "medium" ? "h-4.5 w-4.5" : "h-5 w-5",
                  "text-ink-700 dark:text-ink-200",
                )}
              />
            </button>

            <div className="h-full w-full overflow-hidden">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "fixed rounded-full shadow-soft-lg z-50",
          "flex items-center justify-center",
          "bg-ink-800 text-white hover:bg-ink-900 dark:bg-stamp-400 dark:text-ink-950 dark:hover:bg-stamp-300 transition-colors duration-300",
          "ring-4 ring-stamp-400/20",
          screenSize === "small"
            ? "bottom-4 right-4 w-12 h-12"
            : screenSize === "medium"
              ? "bottom-6 right-6 w-14 h-14"
              : "bottom-8 right-8 w-16 h-16",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        aria-label="Open chat"
      >
        <MessageCircle className={cn(screenSize === "small" ? "h-5 w-5" : screenSize === "medium" ? "h-5 w-5" : "h-6 w-6")} />
      </motion.button>

      {/* Custom Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} screenSize={screenSize}>
        {isOpen && <Chatbot />}
      </Modal>
    </>
  )
}

export default FloatingChatbot
