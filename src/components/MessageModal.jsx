/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { cn, formatDateTime } from "../utils/helpers"

const MessageModal = ({ isOpen, onClose, message, screenSize }) => {
  return (
    <AnimatePresence>
      {isOpen && message && (
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
              "bg-white dark:bg-surface-dark-subtle relative rounded-xl2 shadow-soft-lg flex flex-col border border-ink-100 dark:border-ink-800",
              "w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]",
              "max-w-3xl max-h-[90vh]",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute rounded-full transition-colors z-10",
                "right-2 top-2 sm:right-4 sm:top-4 md:right-6 md:top-6",
                "p-1.5 sm:p-2 md:p-2.5 bg-ink-100 dark:bg-ink-800 hover:bg-stamp-100 dark:hover:bg-ink-700",
              )}
              aria-label="Close"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-ink-700 dark:text-ink-200" />
            </button>

            {/* Header */}
            <div className="p-3 sm:p-6 md:p-8 pb-0 sm:pb-2 md:pb-4 flex-shrink-0">
              <h2
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-3",
                  "text-base sm:text-lg md:text-xl lg:text-2xl font-display font-semibold",
                  "text-ink-900 dark:text-white",
                )}
              >
                {message?.role === "user" ? "Your Message" : "Visa Navigator"}
                <span className="text-xs sm:text-sm md:text-base font-normal text-ink-400 dark:text-ink-400">
                  {message ? formatDateTime(message.timestamp) : ""}
                </span>
              </h2>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-3 sm:p-6 md:p-8 pt-2 sm:pt-2 md:pt-2">
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-ink-800 dark:text-ink-100 whitespace-pre-wrap">
                {message?.text}
              </div>
            </div>

            {/* Bottom close button */}
            <div className="p-3 sm:p-6 md:p-8 pt-2 sm:pt-4 md:pt-4 flex justify-center flex-shrink-0">
              <button
                onClick={onClose}
                className="btn-secondary text-sm sm:text-base md:text-lg py-1.5 sm:py-2 md:py-2.5 px-4 sm:px-6 md:px-8"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MessageModal
