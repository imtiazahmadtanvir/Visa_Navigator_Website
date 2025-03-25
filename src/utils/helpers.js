// Helper functions for the chatbot

// Format classNames conditionally (similar to the cn function from Next.js)
export const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }
  
  // Format date using a simple function (instead of date-fns)
  export const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }
  
  export const formatDateTime = (date) => {
    return new Date(date).toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }
  
  