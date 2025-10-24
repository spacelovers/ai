import React, { useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const Header = ({ onOpenSettings }) => {
  const { currentLanguage, currentTheme, switchLanguage, switchTheme, showToast } = useChat();

  useEffect(() => {
    // This will run when the component mounts and whenever currentTheme or currentLanguage changes
    const themeLabel = themes.find(t => t.theme === currentTheme)?.label || currentTheme;
    const langLabel = currentLanguage === 'fa' ? 'فارسی' : 'English';
    showToast(`Theme set to ${themeLabel} and language to ${langLabel}`);
  }, []); // Show on initial mount

  const themes = [
    { theme: 'dark', icon: 'fa-moon', label: 'تم تیره' },
    { theme: 'light', icon: 'fa-sun', label: 'تم روشن' },
    { theme: 'colorful-blue', icon: 'fa-droplet', label: 'تم آبی' },
    { theme: 'colorful-green', icon: 'fa-leaf', label: 'تم سبز' },
    { theme: 'colorful-purple', icon: 'fa-star', label: 'تم بنفش' }
  ];

  return (
    <header className="header" role="banner">
      <div className="logo-section">
        <div className="logo" aria-hidden="true">
          <i className="fas fa-brain"></i>
        </div>
        <div className="logo-text">
          <h1 className="aria-title">
            {currentLanguage === 'fa' ? 'ایده AI' : 'idea AI'}
          </h1>
          <p className="aria-subtitle">
            {currentLanguage === 'fa' ? 'دستیار هوش مصنوعی پیشرفته' : 'Advanced AI Assistant'}
          </p>
        </div>
      </div>

      <div className="header-controls">
        <div className="ai-selector-wrapper">
          <select className="ai-dropdown" id="aiModelSelector" aria-label={currentLanguage === 'fa' ? 'انتخاب مدل هوش مصنوعی' : 'Select AI Model'}>
            <option value="idea">{currentLanguage === 'fa' ? 'ایده (مدل اختصاصی)' : 'idea (Custom Model)'}</option>
            <option value="gpt4">GPT-4 Turbo</option>
            <option value="claude">Claude 3 Opus</option>
            <option value="gemini">Google Gemini Pro</option>
            <option value="llama">Meta LLaMA 3</option>
          </select>
        </div>

        <button className="settings-icon-btn" onClick={onOpenSettings} aria-label={currentLanguage === 'fa' ? 'تنظیمات' : 'Settings'}>
          <i className="fas fa-cog" aria-hidden="true"></i>
        </button>

        <div className="theme-switcher" role="group" aria-label={currentLanguage === 'fa' ? 'انتخاب تم' : 'Select Theme'}>
          {themes.map(({ theme, icon, label }) => (
            <button
              key={theme}
              className={`theme-btn ${currentTheme === theme ? 'active' : ''}`}
              data-theme={theme}
              onClick={() => {
                switchTheme(theme);
                showToast(`Theme changed to ${label}`);
              }}
              aria-label={label}
            >
              <i className={`fas ${icon}`} aria-hidden="true"></i>
            </button>
          ))}
        </div>

        <div className="lang-switcher" role="group" aria-label={currentLanguage === 'fa' ? 'انتخاب زبان' : 'Select Language'}>
          <button
            className={`lang-btn ${currentLanguage === 'fa' ? 'active' : ''}`}
            onClick={() => {
              switchLanguage('fa');
              showToast('زبان به فارسی تغییر کرد');
            }}
            aria-label="فارسی"
          >
            فا
          </button>
          <button
            className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
            onClick={() => {
              switchLanguage('en');
              showToast('Language changed to English');
            }}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
