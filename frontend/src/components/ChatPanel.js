import React, { useState, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import Message from './Message';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

const ChatPanel = () => {
  const {
    messages,
    isTyping,
    isConversationMode,
    toggleConversationMode,
    currentLanguage
  } = useChat();
  const messagesEndRef = useRef(null);

  return (
    <main className="chat-panel" role="main">
      <div className="conversation-mode">
        <span>{currentLanguage === 'fa' ? 'حالت محاوره‌ای' : 'Conversation Mode'}</span>
        <div
          className={`mode-toggle ${isConversationMode ? 'active' : ''}`}
          onClick={toggleConversationMode}
          id="conversationModeToggle"
        ></div>
      </div>

      <div className="chat-messages" id="chatMessages" role="log" aria-live="polite">
        {isTyping && <TypingIndicator />}
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <ChatInput />
    </main>
  );
};

export default ChatPanel;
