/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { cn, formatTime } from "../utils/helpers"
import MessageModal from "./MessageModal"
import { initializeChat, sendMessage } from "../services/api"

const Chatbot = () => {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState("")
  const [sessionId, setSessionId] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [screenSize, setScreenSize] = useState("medium")
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Define predefined questions and answers for visa navigation
  const predefinedQuestions = [
    {
      question: "What visa types are available?",
      answer:
        "There are several visa types available including Tourist (B-2), Business (B-1), Student (F-1), Work (H-1B), and Permanent Resident (Green Card). Each has different requirements and duration of stay allowances.",
    },
    {
      question: "How long does visa processing take?",
      answer:
        "Visa processing times vary by type and country. Tourist visas typically take 3-5 business days, while work visas can take 2-3 months. Student visas usually take 2-4 weeks. Processing times may be longer during peak seasons.",
    },
    {
      question: "What documents do I need for a visa application?",
      answer:
        "Common documents include a valid passport, completed visa application form, passport-sized photos, proof of financial means, travel itinerary, and purpose of visit documentation. Specific requirements vary by visa type and country.",
    },
    {
      question: "How much does a visa application cost?",
      answer:
        "Visa application fees vary by country and visa type. Tourist visas typically range from $160-$190, student visas around $160, and work visas between $190-$250. Additional service fees may apply depending on your application method.",
    },
    {
      question: "Can I extend my visa after arrival?",
      answer:
        "Yes, in many cases you can apply for a visa extension before your current visa expires. The process typically requires submitting an extension application, providing a valid reason for extension, and paying a fee. Requirements vary by country.",
    },
  ]

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

  // Initialize chat session
  useEffect(() => {
    let isMounted = true

    const initChat = async () => {
      if (!isMounted) return

      setIsLoading(true)
      try {
        const data = await initializeChat()

        if (data.error) {
          throw new Error(data.error)
        }

        if (isMounted) {
          setSessionId(data.sessionId)
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to initialize chat: " + err.message)
          setIsLoading(false)
        }
      }
    }

    initChat()

    // Focus the input field when the component mounts
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => {
      isMounted = false
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to handle predefined questions directly
  const handlePredefinedQuestion = useCallback(
    (question) => {
      // Find the matching predefined question
      const predefinedQuestion = predefinedQuestions.find((item) => item.question.trim() === question.trim())

      if (!predefinedQuestion) return false

      // Add user message
      const userMessage = {
        text: question,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")

      // Show loading indicator
      setIsLoading(true)

      // Add a small delay to simulate processing
      setTimeout(() => {
        // Add bot response with predefined answer
        const botMessage = {
          text: predefinedQuestion.answer,
          role: "model",
          timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])
        setIsLoading(false)
        setShowSuggestions(true)

        // Scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }, 800)

      return true
    },
    [predefinedQuestions],
  )

  const handleSendMessage = useCallback(
    async (input) => {
      const messageToSend = input || userInput
      if (!messageToSend.trim() || !sessionId) return

      // Hide suggestions when sending a message
      setShowSuggestions(false)

      // Check if it's a predefined question first
      // If it is, handle it and return early
      const isPredefined = handlePredefinedQuestion(messageToSend)
      if (isPredefined) return

      // If not a predefined question, proceed with normal flow
      const userMessage = {
        text: messageToSend,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")

      // For non-predefined questions, make the API call
      setIsLoading(true)
      try {
        const data = await sendMessage(messageToSend, sessionId)

        if (data.error) {
          throw new Error(data.error)
        }

        const botMessage = {
          text: data.response,
          role: "model",
          timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])

        // Show suggestions again after receiving a response
        setShowSuggestions(true)
      } catch (err) {
        setError("Failed to send message: " + err.message)
      } finally {
        setIsLoading(false)
        // Focus the input field after sending a message
        setTimeout(() => {
          inputRef.current?.focus()
          // Scroll to the bottom after a short delay to ensure the DOM has updated
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }, 100)
      }
    },
    [sessionId, userInput, handlePredefinedQuestion],
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  const handlePredefinedQuestionClick = useCallback(
    (question) => {
      handlePredefinedQuestion(question)
    },
    [handlePredefinedQuestion],
  )

  const handleMessageClick = useCallback((message) => {
    setSelectedMessage(message)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Filter out the questions that have already been asked
  const getUnaskedQuestions = useCallback(() => {
    const askedQuestions = messages.filter((msg) => msg.role === "user").map((msg) => msg.text)
    return predefinedQuestions.filter((item) => !askedQuestions.includes(item.question))
  }, [messages, predefinedQuestions])

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Fixed Header */}
      <div className="bg-blue-700 text-white py-2 px-3 sm:py-3 sm:px-6 md:py-4 md:px-8 border-b border-blue-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl mx-auto font-bold text-center flex items-center gap-1 sm:gap-2 md:gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
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
            Visa Navigator
          </h2>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-hidden relative">
        {error && (
          <div className="m-2 sm:m-4 md:m-7 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span className="text-sm sm:text-base md:text-lg">{error}</span>
            </div>
          </div>
        )}

        <div className="h-full overflow-y-auto bg-blue-50 pb-4">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-3 sm:p-6 md:p-8 lg:p-10">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-1 sm:mb-2 md:mb-3 text-blue-800">
                  Welcome to Visa Navigator
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-700 max-w-2xl mx-auto">
                  Ask me anything about visa applications, requirements, processing times, or travel documentation!
                </p>
                <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 space-y-2 md:space-y-3 w-full max-w-2xl">
                  {predefinedQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedQuestionClick(item.question)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300 rounded-md w-full text-left justify-start text-xs sm:text-sm md:text-base lg:text-lg py-2 px-3 md:py-3 md:px-4 h-auto min-h-[40px] md:min-h-[50px]"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col rounded-lg cursor-pointer transition-all hover:opacity-90 hover:shadow-md",
                      "p-3 sm:p-4 md:p-5",
                      msg.role === "user" ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-blue-100 text-blue-900",
                      "max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%]",
                    )}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <div className="whitespace-pre-wrap text-sm sm:text-base md:text-lg">
                      {msg.text.length > 150 ? `${msg.text.substring(0, 150)}...` : msg.text}
                    </div>
                    <div className="flex items-center justify-between mt-1 sm:mt-2 md:mt-3">
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs md:text-sm",
                          msg.role === "user" ? "text-blue-100" : "text-blue-700",
                        )}
                      >
                        {msg.role === "model" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 inline mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                          </svg>
                        )}
                        Click to expand
                      </span>
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs md:text-sm",
                          msg.role === "user" ? "text-blue-100" : "text-blue-700",
                        )}
                      >
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex flex-col max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-lg p-3 sm:p-4 md:p-5 mr-auto bg-blue-100 text-blue-900">
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                      <span className="text-sm sm:text-base md:text-lg">Thinking...</span>
                    </div>
                  </div>
                )}

                {/* Show remaining questions after each bot response */}
                {showSuggestions && messages.length > 0 && messages[messages.length - 1].role === "model" && (
                  <div className="my-3 sm:my-4 md:my-5 p-2 sm:p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl mx-auto">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-blue-800 mb-1 sm:mb-2 md:mb-3">
                      You might also want to ask:
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {getUnaskedQuestions()
                        .slice(0, 4)
                        .map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handlePredefinedQuestionClick(item.question)}
                            className="bg-white hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-md w-full text-left justify-start text-xs sm:text-sm md:text-base py-1.5 px-2 md:py-2 md:px-3 h-auto min-h-[32px] md:min-h-[40px]"
                          >
                            {item.question}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-6 border-t border-blue-200 bg-blue-50 flex-shrink-0">
        <div className="flex gap-1 sm:gap-2 md:gap-3 max-w-4xl mx-auto">
          <input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about visa requirements..."
            disabled={isLoading || !sessionId}
            className="flex-1 border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg h-9 sm:h-10 md:h-12"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !userInput.trim() || !sessionId}
            className={cn(
              "bg-blue-700 hover:bg-blue-800 text-white rounded-md h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center",
              (isLoading || !userInput.trim() || !sessionId) && "opacity-50 cursor-not-allowed",
            )}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal isOpen={isModalOpen} onClose={closeModal} message={selectedMessage} screenSize={screenSize} />
    </div>
  )
}

export default Chatbot

