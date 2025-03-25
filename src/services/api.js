// Mock implementation for testing UI without backend
export const initializeChat = async () => {
    console.log("Using mock chat initialization")
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { sessionId: "mock-session-" + Date.now() }
  }
  
  export const sendMessage = async (message, sessionId) => {
    console.log("Using mock message sending for:", message)
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Generate a relevant mock response based on the message content
    let response
    const lowerMessage = message.toLowerCase()
  
    if (lowerMessage.includes("visa") && lowerMessage.includes("type")) {
      response =
        "There are several visa types including Tourist (B-2), Business (B-1), Student (F-1), Work (H-1B), and Permanent Resident visas. Each has different requirements and purposes."
    } else if (lowerMessage.includes("process") || lowerMessage.includes("time")) {
      response =
        "Visa processing times vary by country and visa type. Tourist visas typically take 3-5 business days, while work visas can take 2-3 months."
    } else if (lowerMessage.includes("document") || lowerMessage.includes("need")) {
      response =
        "Common documents for visa applications include a valid passport, completed application form, passport-sized photos, proof of financial means, and purpose of visit documentation."
    } else if (lowerMessage.includes("cost") || lowerMessage.includes("fee")) {
      response =
        "Visa application fees vary by country and visa type. Tourist visas typically range from $160-$190, student visas around $160, and work visas between $190-$250."
    } else {
      response = `Thank you for your question about "${message}". As a visa navigator assistant, I can help with information about visa types, application processes, required documents, and fees.`
    }
  
    return {
      sessionId,
      response,
    }
  }
  
  