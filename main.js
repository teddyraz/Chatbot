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
    "hi": ["Hi there! 😊", "Hey! What’s up? 🚀", "Hello! Hope you’re doing well! 🌞"],
    "good morning": ["Good morning! Have a fantastic day! ☀️", "Rise and shine! 🌅", "Morning! Wishing you positivity! 🌟"],
    "good night": ["Good night! Sleep tight! 🌙", "Sweet dreams! 😴", "Rest well! A new day awaits! 🌅"],
    "thank you": ["You're very welcome! 😊", "No problem at all! 👍", "Glad I could help! 🤗"],
    "what's up": ["Not much, just here to chat! 😊", "Just chilling! What about you? 🎉", "Thinking about AI stuff! 🤓"],
    "nice to meet you": ["Nice to meet you too! 😊", "Pleasure meeting you! 🎉", "Same here! Let's chat more! 💬"],
    "how are you": ["I'm good! How about you? 😊", "Doing great! What about you? 😃", "Feeling awesome! 🎉"],
    "what's your name": ["I'm your friendly chatbot! 🤖", "Just call me ChatBuddy! 😃", "I'm here to chat with you! 🙌"],
    "tell me a joke": [
        "Why don't skeletons fight each other? They don't have the guts! 😂", 
        "Why did the math book look sad? Too many problems! 📖😂",
        "I'm reading a book on anti-gravity. It's impossible to put down! 😆"
    ],
    "bye": ["Goodbye! Have a great day! 👋", "See you soon! Take care! 😊", "Bye! It was nice chatting with you! 🎉"],
    "who created you": ["I was created by a brilliant developer! 🚀", "A genius programmer built me! 🤖", "I'm AI-powered! ⚡"],
    "where are you from": ["I'm from the digital world! 🌍", "I exist in the cloud! ☁️", "My home is the internet! 🌐"],
    "do you have a family": ["Nope, just me and my AI friends! 🤖", "Chatbots don't have families, but we have users like you! 💙"],
    "tell me a fun fact": [
        "Did you know honey never spoils? 🍯", 
        "Octopuses have three hearts! 🐙", 
        "Bananas are berries, but strawberries aren't! 🍓"
    ],
    "do you like music": ["I love music! 🎶", "Music is awesome! What’s your favorite song? 🎸", "I vibe to all genres! 🎵"],
    "who is your favorite superhero": ["I like Iron Man! 🦾", "Batman is cool! 🦇", "Superman is a classic! 🦸‍♂️"],
    "what is AI": ["AI stands for Artificial Intelligence! 🤖", "AI is the future of technology! 🚀"],
    "can you dance": ["I wish I could! But I can imagine dancing! 💃", "Only in the digital world! 🕺"],
    "what’s the meaning of life": ["42! According to Hitchhiker’s Guide to the Galaxy. 🤓", "To be happy and help others! 😊"],
    "do you like books": ["Books are amazing! 📚", "I love reading about AI! 🤖", "What’s your favorite book? 📖"],
    "do you like movies": ["Movies are great! 🎬", "I enjoy sci-fi movies! 🚀", "What’s your favorite movie? 🍿"],
    "can you help me": ["Of course! What do you need help with? 🤝", "I’ll try my best to assist you! 😊"],
    "tell me a riddle": ["What has keys but can’t open locks? A piano! 🎹", "The more you take, the more you leave behind. What am I? Footsteps! 👣"],
    "what’s your hobby": ["Chatting with you! 💬", "Learning new things! 🤖"],
    "how old are you": ["I exist beyond time! ⏳", "I was created recently, but I keep learning! 📅"],
    "what’s your favorite food": ["I don't eat, but I hear pizza is amazing! 🍕", "Chocolate sounds delicious! 🍫"],
    "can you cook": ["I wish I could! But I can give you recipes! 🍳"],
    "can you drive": ["Nope, but I can help you with directions! 🗺️"],
    "do you sleep": ["Nope! I’m always here for you! 😃", "AI never sleeps! 🛌"],
    "do you like coffee": ["I love the smell of coffee! ☕", "Coffee keeps people awake, just like AI! 🤖"],
    "what’s your dream": ["To be the best chatbot ever! 🚀", "To help and entertain people! 😊"],
    "what’s your favorite color": ["I like blue! 💙", "Colors are amazing! What’s your favorite? 🎨"],
    "do you have emotions": ["Not really, but I can understand yours! 😊", "I try to be as friendly as possible! 💖"],
    "can you do math": ["Yes! Ask me any math problem! ➕", "Numbers are my specialty! 🔢"],
    "what is love": ["Love is a deep feeling of affection! 💖", "Baby don’t hurt me… 🎵"],
    "do you like sports": ["Sports are fun! ⚽", "I enjoy watching football! 🏈"],
    "do you have pets": ["Nope, but I love animals! 🐶", "If I had one, it would be a digital cat! 🐱"],
    "do you like traveling": ["I travel through the internet! 🌍", "Where do you want to go? ✈️"],
    "can you sing": ["I wish I could! 🎤", "I can suggest songs for you! 🎶"],
    "do you like science": ["Science is fascinating! 🔬", "The universe is amazing! 🌌"],
    "are you a robot": ["Yes, but a smart one! 🤖", "You got it! I’m a chatbot! 💬"],
    "what is your favorite game": ["I like chess! ♟️", "Video games are cool! 🎮"]
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
