document.getElementById('sendButton')
  .addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText !== '') {
      // User message (left side)
      const messageElement = document.createElement('div');
      messageElement.className = 'bg-blue-500 text-white p-2 rounded-lg self-start w-fit ml-2';
      messageElement.textContent = messageText;
      document.getElementById('messages').appendChild(messageElement);
      messageInput.value = '';
      
      // Chatbot response
      setTimeout(() => {
        const responseText = getBotResponse(messageText);
        const responseElement = document.createElement('div');
        responseElement.className = 'bg-gray-700 text-white p-2 rounded-lg self-end w-fit mr-2';
        responseElement.textContent = responseText;
        document.getElementById('messages').appendChild(responseElement);
      }, 500); // 500ms delay
    }
  });

// Function to handle chatbot responses
function getBotResponse(userMessage) {
  const responses = {
    "hello": ["Hey there! 😊", "Hello! How can I help you? 👋", "Hi! Hope you're having a great day! 🌟"],
    "how are you": ["I'm good! How about you? 😊", "Doing great! What about you? 😃", "Feeling awesome! Thanks for asking! 🎉"],
    "what's your name": ["I'm your friendly chatbot! 🤖", "Just call me ChatBuddy! 😃", "I'm here to chat with you! 🙌"],
    "tell me a joke": [
      "Why don't skeletons fight each other? Because they don't have the guts! 😂",
      "Why did the math book look sad? Because it had too many problems! 📖😂",
      "I'm reading a book about anti-gravity. It's impossible to put down! 😆"
    ],
    "bye": ["Goodbye! Have a great day! 👋", "See you soon! Take care! 😊", "Bye! It was nice chatting with you! 🎉"],
    "hi": ["How I Can Help You?"]
  };
  
  // Convert user message to lowercase for case-insensitive matching
  const lowerCaseMessage = userMessage.toLowerCase();
  
  // Find matching response
  for (let key in responses) {
    if (lowerCaseMessage.includes(key)) {
      const possibleResponses = responses[key];
      return possibleResponses[Math.floor(Math.random() * possibleResponses.length)]; // Random response selection
    }
  }
  
  // Default response if no match is found
  return "I'm not sure about that, but I'm happy to chat! 😊";
}


// Function to handle image upload
document.getElementById('profileImageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('profileImage').src = imageUrl;
            localStorage.setItem('userProfileImage', imageUrl); // Save to local storage
        };
        reader.readAsDataURL(file);
    }
});

// Load saved image on page load
window.onload = function() {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
        document.getElementById('profileImage').src = savedImage;
    }
};