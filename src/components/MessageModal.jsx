/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client"
import { cn, formatDateTime } from "../utils/helpers"

const MessageModal = ({ isOpen, onClose, message, screenSize }) => {
  if (!isOpen || !message) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div
        className={cn(
          "bg-white relative rounded-lg shadow-xl flex flex-col",
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
            "p-1.5 sm:p-2 md:p-2.5 bg-blue-100 hover:bg-blue-200",
          )}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-800"
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

        {/* Header */}
        <div className="p-3 sm:p-6 md:p-8 pb-0 sm:pb-2 md:pb-4 flex-shrink-0">
          <h2
            className={cn(
              "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-3",
              "text-base sm:text-lg md:text-xl lg:text-2xl font-semibold",
              message.role === "user" ? "text-blue-700" : "text-blue-800",
            )}
          >
            {message.role === "user" ? "Your Message" : "Visa Navigator"}
            <span className="text-xs sm:text-sm md:text-base font-normal text-gray-500">
              {formatDateTime(message.timestamp)}
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-3 sm:p-6 md:p-8 pt-2 sm:pt-2 md:pt-2">
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-black whitespace-pre-wrap">
            {message.text}
          </div>
        </div>

        {/* Bottom close button */}
        <div className="p-3 sm:p-6 md:p-8 pt-2 sm:pt-4 md:pt-4 flex justify-center flex-shrink-0">
          <button
            onClick={onClose}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300 rounded-md text-sm sm:text-base md:text-lg py-1.5 sm:py-2 md:py-2.5 h-auto px-4 sm:px-6 md:px-8"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageModal

