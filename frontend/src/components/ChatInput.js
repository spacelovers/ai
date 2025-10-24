import React, { useState, useRef } from 'react';
import { useChat } from '../context/ChatContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [actionsVisible, setActionsVisible] = useState(true);
  const { currentLanguage, addMessage, generateAIResponse, setIsRecording, isRecording } = useChat();
  const fileInputRef = useRef();
  const excelInputRef = useRef();

  const handleSend = () => {
    if (message.trim()) {
      addMessage(message, 'user');
      setMessage('');
      generateAIResponse(message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileNames = files.map(f => f.name).join(', ');
      addMessage(`📎 ${currentLanguage === 'fa' ? 'فایل‌های پیوست شده:' : 'Attached files:'} ${fileNames}`, 'user');

      const event = new CustomEvent('showToast', {
        detail: {
          message: currentLanguage === 'fa' ? 'فایل‌ها با موفقیت آپلود شدند' : 'Files uploaded successfully',
          type: 'success'
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleExcelUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
        addMessage(`📊 ${currentLanguage === 'fa' ? 'فایل اکسل برای آموزش:' : 'Excel file for training:'} ${file.name}`, 'user');

        const event = new CustomEvent('showToast', {
          detail: {
            message: currentLanguage === 'fa' ? 'فایل اکسل برای آموزش مدل آپلود شد' : 'Excel file uploaded for model training',
            type: 'success'
          }
        });
        window.dispatchEvent(event);
      } else {
        const event = new CustomEvent('showToast', {
          detail: {
            message: currentLanguage === 'fa' ? 'لطفا فقط فایل‌های اکسل آپلود کنید' : 'Please upload only Excel files',
            type: 'error'
          }
        });
        window.dispatchEvent(event);
      }
    }
  };

  const trainModel = () => {
    const event = new CustomEvent('showToast', {
      detail: {
        message: currentLanguage === 'fa' ? 'حالت آموزش مدل فعال شد' : 'Model training mode activated',
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  };

  const addRandomEmoji = () => {
    const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🚀', '💡', '✨', '🔥', '💯'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMessage(prev => prev + emoji);
  };

  const toggleRecording = () => {
    const newRecordingState = !isRecording;
    setIsRecording(newRecordingState);

    const event = new CustomEvent('showToast', {
      detail: {
        message: newRecordingState ?
          (currentLanguage === 'fa' ? 'ضبط صدا شروع شد' : 'Recording started') :
          (currentLanguage === 'fa' ? 'ضبط صدا متوقف شد' : 'Recording stopped'),
        type: 'success'
      }
    });
    window.dispatchEvent(event);

    if (!newRecordingState) {
      addMessage('🎤 ' + (currentLanguage === 'fa' ? 'پیام صوتی ضبط شد' : 'Voice message recorded'), 'user');
    }
  };

  return (
    <div className="chat-input-container">
      <div className={`action-buttons-row ${actionsVisible ? '' : 'collapsed'}`}>
        <button className="action-button" onClick={() => fileInputRef.current?.click()}>
          <i className="fas fa-paperclip" aria-hidden="true"></i>
          <span>{currentLanguage === 'fa' ? 'پیوست فایل' : 'Attach File'}</span>
        </button>
        <button className="action-button" onClick={() => excelInputRef.current?.click()}>
          <i className="fas fa-file-excel" aria-hidden="true"></i>
          <span>{currentLanguage === 'fa' ? 'آموزش با Excel' : 'Train with Excel'}</span>
        </button>
        <button className="action-button" onClick={trainModel}>
          <i className="fas fa-robot" aria-hidden="true"></i>
          <span>{currentLanguage === 'fa' ? 'آموزش مدل' : 'Train Model'}</span>
        </button>
        <button className="action-button" onClick={addRandomEmoji}>
          <i className="far fa-smile" aria-hidden="true"></i>
          <span>{currentLanguage === 'fa' ? 'ایموجی' : 'Emoji'}</span>
        </button>
        <button
          className="action-button"
          onClick={toggleRecording}
          style={isRecording ? { background: 'var(--danger-color)' } : {}}
        >
          <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`} aria-hidden="true"></i>
          <span>
            {isRecording ?
              (currentLanguage === 'fa' ? 'توقف ضبط' : 'Stop Recording') :
              (currentLanguage === 'fa' ? 'پیام صوتی' : 'Voice Message')
            }
          </span>
        </button>
      </div>

      <div className="chat-input-wrapper">
        <textarea
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={currentLanguage === 'fa' ? 'پیام خود را بنویسید...' : 'Type your message...'}
          rows="1"
        />

        <button className="send-btn" onClick={handleSend}>
          <i className="fas fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={excelInputRef}
        accept=".xlsx,.xls,.csv"
        onChange={handleExcelUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ChatInput;
