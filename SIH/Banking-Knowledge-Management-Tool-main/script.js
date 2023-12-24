const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;
// Function to speak the given text
const speak = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
};

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<div class="chat-flex"><span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};
// const createChatLi = (message, className) => {
//   const chatLi = document.createElement("li");
//   chatLi.classList.add("chat", `${className}`);
//   let chatContent =
//     className === "outgoing"
//       ? `<p></p>`
//       : `<div class="chat-flex"><span class="material-symbols-outlined">smart_toy</span><p></p>`;
//   chatLi.innerHTML = chatContent;
//   chatLi.querySelector("p").textContent = message;
//   return chatLi;
// };
const startVoiceRecognition = () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    
    // Remove trailing full stop
    transcript = transcript.replace(/\.$/, '').trim();
    
    chatInput.value = transcript;
    handleChat(); // Process the voice input
  };

  recognition.start();
};
const convertToHindi = (text) => {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|hi`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.responseData && data.responseData.translatedText) {
          resolve(data.responseData.translatedText);
        } else {
          reject("Translation failed");
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
// Add a button to start voice recognition
const voiceRecognitionBtn = document.querySelector(".voice-recognition-btn");
voiceRecognitionBtn.addEventListener("click", startVoiceRecognition);

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");
  const chat = chatElement.querySelector(".chat-flex");
  const container = document.createElement("div");
  container.classList.add("chat-replay");

  const lowerCaseMessage = userMessage.toLowerCase();

  if (lowerCaseMessage.includes("bank")) {
    messageElement.textContent =
      "I see you mentioned the word 'Bank.' How can I assist you with that?";
    // Speak the generated response
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      { text: "Account", 
        message: "I want to know about my account information." 
      },
      {
        text: "Cards",
        message: "I want to know my card details .",
      },
      {
        text: "Transaction",
        message: "I need to know about transaction information.",
      },
      {
       text:"Loan",
       message:"I want to know about my loan information." 
      },
     
    ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
  } else if (lowerCaseMessage.includes("account")) {
    messageElement.textContent =
      "I see you mentioned the word 'Account.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Existing Account ",
        message: "I want to know my existing acc details.",
      },
      {
        text: "New account",
        message: "I have to create a new acc. Kindly help me!",
      },
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("existing acc details")) {
    messageElement.textContent =
      "I see you mentioned the word 'Existing Account.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Savings ",
        message: "I have queries related to my savings acc."
      },
      {
        text: "Current ",
        message: "I want information about current acc.",
      },
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("current") || lowerCaseMessage.includes("savings"))  {
    messageElement.textContent =
      "I see you mentioned the word 'Current/savings account.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Balance ",
        message: "The balnce of your savings acc is Rs.203."
      },
      {
        text: "Verification",
        message: "I have queries related to verification.",
      },
      {
        text:"Update information",
        message:"I have issues in updating my information."
      },
      {
        text:"Enable Services",
        message:"I want to information about enabling services in my acc."
      }
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("verification")) {
    messageElement.textContent =
      "I see you mentioned the word 'Verification.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Phone Number/ Email ",
        message: "1. Access your profile from User Settings, click 'Profile,' and find the 'Personal Details' section. Verify email addresses or phone numbers with 'Verify' listed to enable security features like two-factor authentication. Start verification by clicking 'Verify' next to the desired email or phone number.",
      
      },
      {
        text: "Account Verification",
        message: "1.Visit a branch for in-person bank account verification. Provide ID, address proof, and undergo identity checks with an agent. Account opened upon validation. 2. Verify your bank account online with a fully automated process. Submit digital documents for identity, personal details, and proof of life. No need to visit a branch.",
      },
      {
        text:"Card verification",
        message:"1.For Online PIN, cardholders enter their PIN, encrypted and verified by the host. 2. Offline PIN verification is local between card and terminal, with successful checks reported to the host. 3. Signatures or Consumer Device CDCVM (passcode or biometrics) are used for transaction approval, enhancing payment flexibility."
      },
      
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("updating my information")) {
    messageElement.textContent =
      "I see you mentioned the word 'Update Information.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Name/DOB/PhoneNumber/Adress/E-Mail",
        message: "1.Update your bank account online by logging in, editing details, and confirming changes. 2. For an in-person update, visit a bank branch, provide ID, verify changes with a representative, and get written confirmation. 3. Retain the confirmation for proof, whether through online or in-person updates."
      },
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("enabling services")) {
    messageElement.textContent =
      "I see you mentioned the word 'Enable Services.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Online Banking Services",
        message: "1.Visit the bank website. 2. Click on login or register. 3. Enter account details, including account number, mobile number, branch code, and CIF number. 4. Click submit. 5. Verify identity with OTP. 6. Create a user ID and password. 7. Re-enter net banking credentials to access online services."
      },
      {
        text:"UPI",
        message:"I want information related to UPI."        
      },
      {
        text:"Limit",
        message:"1.Savings accounts typically have no specific deposit limit, but cash deposits over INR 50,000 require PAN card details. Annual transactions exceeding INR 10 lakhs are reported to the Income Tax Department. Monthly transaction limits range from 3 to 5 without charges. 2. Current accounts have no transaction limits, catering to frequent transactions."
      },
      {
        text:"Cross-Currency Transaction",
        message:"A cross currency involves exchange rates or transactions without the US dollar, where it is not used for contract settlement. Cross-currency pairs exclude the US dollar and may include currencies like the euro and Japanese yen. For further clarification, please visit the bank's website or a nearby branch.."
      }  
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  }
  else if (lowerCaseMessage.includes("new acc")) {
    messageElement.textContent =
      "I see you mentioned the word 'New Acc.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Opening a new acc",
        message: "Visit the bank branch or apply online, providing personal details and signatures. 2. Submit required proof of identity and photos. 3. After bank approval, collect your account details, debit card, and internet banking information for online transactions."
      },
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
   else if (lowerCaseMessage.includes("card")) {
    messageElement.textContent =
      "I see you mentioned the word 'Card.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Existing card ",
        message: "I have problems with my existing crd.",
      },
      {
        text: "New card",
        message: "I have to get a new crd.Kindly help me.",
      },
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("existing crd")) {
    messageElement.textContent =
      "I see you mentioned the word 'Existing crd.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Debit",
        message: "I want about my debit crd details."
      },
      {
       text:"Credit",
       message:"I have queries related to my credit crd details." 
      }
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("debit crd details")||(lowerCaseMessage.includes("credit crd details"))) {
    messageElement.textContent =
      "I see you mentioned the word 'debit/card' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Expiry",
        message: "1. Credit cards expire every 3-5 years, set by banks for wear, security, and plan reviews. Once expired, the card is unusable, returning a 'declined' notice. 2. Debit cards expire within 2-5 years, valid through the last day of the expiration month. On expiration, the sixteen-digit number may change on the new card."
      },
      {
       text:"Limit",
       message:"1.The Credit Card Limit is the maximum amount a person can spend, set by the issuing company. It represents the cap on Credit Card spending. 2. Debit card usage for cash withdrawals is subject to limits on the number and amount of withdrawals, with costs varying based on the customer's account type or the debit card used." 
      },
      {
        text:"Balance",
        message:"The balance in your credit crd or debit crd is Rs.30000."
      },
      {
        text:"Deactivate",
        message:"1.To deactivate a credit card, contact your bank's customer service, settle outstanding balances, and request cancellation. Alternatively, send a deactivation request via email with your credit card details. Some banks offer online deactivation through their website by filling out an opt-out form in the Credit Cards section."
      },
      {
        text:"Change Pin",
        message:"Reset your ATM PIN at the ATM by entering your mobile number and setting a new PIN with the received OTP. For online options, log in to NetBanking, request Instant PIN Generation, and authenticate with an OTP. Mobile banking apps also offer PIN reset with card details, CVV, and OTP entry. Contact the bank's customer care for a PIN reset and receive the new PIN at your address or collect it from the nearest branch.."
      }
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  } 
  else if (lowerCaseMessage.includes("new crd")) {
    messageElement.textContent =
      "I see you mentioned the word 'New crd.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "To Apply for a credit/debit card",
        message: "1.Visit your bank's website, navigate to the personal banking section, and apply for a debit/credit card. Choose the card category based on your preferences. After submitting details and required documents, wait for 2-3 days to receive the card along with confidential information, including a Personal Identification Number (PIN). With the card and PIN, you can start making transactions at your convenience."
      },
      
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  }
  else if (lowerCaseMessage.includes("transaction")) {
    messageElement.textContent =
      "I see you mentioned the word 'transaction.' How can I assist you with that?";
    speak(messageElement.textContent);
    // Button data
    const buttonData = [
      {
        text: "Transaction history",
        message: "It shows the history of all money debited and credited with the date of transaction."
      },
      {
        text:"Stopped/blocked payment",
        message:"Banks block transactions due to suspicion, regulatory compliance, and potential errors in automated systems. The reasons may include low suspicion thresholds, the filing of Suspicious Activity Reports (SARs), and human errors influenced by outdated banking systems. Specific details may not be disclosed to prevent alerting individuals to investigations."
      },
      {
        text:"UPI",
        message:"I have issues related to my UPI."
      },
      {
        text:"NEFT",
        message:"I want to know anout NEFT."
      },
      {
        text:"RTGS",
        message:"I want details about RTGS."
      },
      {
        text:"IMPS",
        message:"Give me information on IMPS."
      }
      
          ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
    return;
  }
  else {
    messageElement.textContent =
      "I'm not sure how to assist with that. Click the bot icon below and Retype your query kindly!";
    speak(messageElement.textContent);
  }
};

// const scrollToBottom = () => {
//   chatbox.scrollTop = chatbox.scrollHeight;
// };

// const handleChat = () => {
//   userMessage = chatInput.value.trim();
//   if (!userMessage) return;
//   chatInput.value = "";
//   chatInput.style.height = `${inputInitHeight}px`;
//   chatbox.appendChild(createChatLi(userMessage, "outgoing"));

//   setTimeout(() => {
//     const incomingChatLi = createChatLi("Thinking...", "incoming");
//     chatbox.appendChild(incomingChatLi);
//     generateResponse(incomingChatLi);
//     scrollToBottom(); // Scroll to bottom after adding new message
//   }, 600);
// };
const scrollToBottom = () => {
  chatbox.scrollTop = chatbox.scrollHeight;
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
    scrollToBottom();
  }, 600);
};
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
const engHinBtn = document.querySelector(".eng_hin_btn");
engHinBtn.addEventListener("click", async () => {
  // Assuming userMessage contains the last user message
  const translatedMessage = await convertToHindi(userMessage);
  chatInput.value = translatedMessage;
  handleChat();
});

// Optionally, you can trigger voice output when the page loads
document.addEventListener("DOMContentLoaded", () => {
  speak("Hi there! How can I help you?");
});
