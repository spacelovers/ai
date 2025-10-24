import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fa');
  const [currentTheme, setCurrentTheme] = useState('colorful-purple');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isConversationMode, setIsConversationMode] = useState(false);
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Hide after 3 seconds
  };

  // Load settings from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('chatLanguage') || 'fa';
    const savedTheme = localStorage.getItem('chatTheme') || 'colorful-purple';
    const savedConversationMode = localStorage.getItem('conversationMode') === 'true';

    setCurrentLanguage(savedLanguage);
    setCurrentTheme(savedTheme);
    setIsConversationMode(savedConversationMode);
    setDocumentDirection(savedLanguage);
  }, []);

  const setDocumentDirection = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  };

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
    setDocumentDirection(lang);
    localStorage.setItem('chatLanguage', lang);
  };

  const switchTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('chatTheme', theme);
  };

  const toggleConversationMode = () => {
    const newMode = !isConversationMode;
    setIsConversationMode(newMode);
    localStorage.setItem('conversationMode', newMode);
  };

  const toggleSidePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [newMessage, ...prev]);
    addToHistory(text, sender);
  };

  const addToHistory = (message, sender) => {
    const historyItem = {
      id: Date.now(),
      message,
      sender,
      timestamp: new Date(),
      preview: message.length > 40 ? message.substring(0, 40) + '...' : message
    };
    setChatHistory(prev => [historyItem, ...prev.slice(0, 7)]);
  };

  const startNewChat = () => {
    if (messages.length > 0) {
      const message = currentLanguage === 'fa' ?
        'آیا می‌خواهید مکالمه جدیدی شروع کنید؟' :
        'Do you want to start a new chat?';

      if (window.confirm(message)) {
        setMessages([]);
        // Add welcome message
        const welcomeMsg = isConversationMode ?
          (currentLanguage === 'fa' ?
            'سلام! من اینجام تا کمکتون کنم. چیزی هست که براتون انجام بدم؟ 😊' :
            'Hey there! I\'m here to help you out. What can I do for you today? 😊') :
          (currentLanguage === 'fa' ?
            'سلام! من ایده هستم، دستیار هوش مصنوعی شما. چطور می‌تونم کمکتون کنم؟ 🚀' :
            'Hello! I\'m idea, your AI assistant. How can I help you? 🚀');

        addMessage(welcomeMsg, 'ai');
      }
    }
  };

  const generateAIResponse = (userMessage) => {
    setIsTyping(true);

    const responses = {
      fa: {
        formal: [
          'این سوال جالبی است! اجازه دهید در مورد آن فکر کنم... 🤔',
          'حتماً! می‌توانم در این زمینه به شما کمک کنم. 💡',
          'عالی است! بیایید با هم این موضوع را بررسی کنیم. ✨',
          'سوال خوبی است! چند ایده دارم که می‌توانم به اشتراک بگذارم. 🚀'
        ],
        conversational: [
          'اوه، این سوال جالبیه! بذار یه کم فکر کنم... 🤔',
          'حتماً می‌تونم کمکت کنم! چیزای جالبی دارم بگم. 💡',
          'عالیه! بیا با هم چکش کنیم. ✨',
          'سوال خوبیه! چند تا ایده دارم که می‌تونم بگم. 🚀'
        ]
      },
      en: {
        formal: [
          'That\'s an interesting question! Let me think about it... 🤔',
          'Certainly! I can help you with that. 💡',
          'Great! Let\'s explore this topic together. ✨',
          'Good question! I have some ideas to share. 🚀'
        ],
        conversational: [
          'Oh, that\'s interesting! Let me think for a sec... 🤔',
          'Sure thing! I\'ve got some cool ideas for you. 💡',
          'Awesome! Let\'s dive into this together. ✨',
          'Nice question! I have a few thoughts to share. 🚀'
        ]
      }
    };

    setTimeout(() => {
      setIsTyping(false);
      const mode = isConversationMode ? 'conversational' : 'formal';
      const responseList = responses[currentLanguage][mode];
      const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];
      addMessage(randomResponse, 'ai');
    }, 1000 + Math.random() * 2000);
  };

  const value = {
    currentLanguage,
    currentTheme,
    isPanelOpen,
    isRecording,
    isConversationMode,
    isTrainingMode,
    chatHistory,
    messages,
    isTyping,
    toastMessage,
    showToast,
    switchLanguage,
    switchTheme,
    toggleConversationMode,
    toggleSidePanel,
    addMessage,
    generateAIResponse,
    startNewChat,
    setIsRecording,
    setIsTrainingMode,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
