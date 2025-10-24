// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import AuthModal from './components/AuthModal';
import SidePanel from './components/SidePanel';
import ChatPanel from './components/ChatPanel';
import Toast from './components/Toast';
import BackgroundOverlay from './components/BackgroundOverlay';
import { ChatProvider, useChat } from './context/ChatContext';
import './styles/App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { toastMessage } = useChat();

  return (
    <div className="App">
      <BackgroundOverlay />
      {toastMessage && <Toast show={true} message={toastMessage} type="success" />}

      <Header
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="main-container">
          <ChatPanel />
          <SidePanel />
        </div>

        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />

        <AuthModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
        />
      </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
}

export default App;
