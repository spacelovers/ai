import React from 'react';
import { useChat } from '../context/ChatContext';

const Message = ({ message }) => {
  const { currentLanguage } = useChat();

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show copy success feedback
      const event = new CustomEvent('showToast', {
        detail: { message: currentLanguage === 'fa' ? 'پیام کپی شد' : 'Message copied', type: 'success' }
      });
      window.dispatchEvent(event);
    });
  };

  const editMessage = (currentText) => {
    const newText = prompt(
      currentLanguage === 'fa' ? 'ویرایش پیام:' : 'Edit message:',
      currentText
    );
    if (newText && newText !== currentText) {
      // Handle message edit
      const event = new CustomEvent('showToast', {
        detail: { message: currentLanguage === 'fa' ? 'پیام ویرایش شد' : 'Message edited', type: 'success' }
      });
      window.dispatchEvent(event);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString(currentLanguage === 'fa' ? 'fa-IR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`message ${message.sender}`} role="article">
      <div className="message-avatar" aria-hidden="true">
        {message.sender === 'user' ? (
          <i className="fas fa-user"></i>
        ) : (
          <i className="fas fa-brain"></i>
        )}
        <div className="time-badge">{formatTime(message.timestamp)}</div>
      </div>
      <div className="message-content">
        <div className="message-bubble">
          <p>{message.text}</p>
        </div>
        <div className="message-actions">
          <button
            className="action-icon"
            onClick={() => copyMessage(message.text)}
            aria-label={currentLanguage === 'fa' ? 'کپی پیام' : 'Copy message'}
          >
            <i className="far fa-copy" aria-hidden="true"></i>
            <span>{currentLanguage === 'fa' ? 'کپی' : 'Copy'}</span>
          </button>
          {message.sender === 'user' && (
            <button
              className="action-icon"
              onClick={() => editMessage(message.text)}
              aria-label={currentLanguage === 'fa' ? 'ویرایش پیام' : 'Edit message'}
            >
              <i className="far fa-edit" aria-hidden="true"></i>
              <span>{currentLanguage === 'fa' ? 'ویرایش' : 'Edit'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
