import React from 'react';
import { useChat } from '../context/ChatContext';

const SidePanel = () => {
  const { isPanelOpen, toggleSidePanel, startNewChat, chatHistory } = useChat();

  return (
    <aside className={`side-panel ${isPanelOpen ? '' : 'collapsed'}`} id="sidePanel" role="complementary">
      <div className="panel-header">
        <h2>
          <i className="fas fa-bars" aria-hidden="true"></i>
          <span className="panel-title">منو</span>
        </h2>
        <button className="toggle-panel-btn" onClick={toggleSidePanel} aria-label={isPanelOpen ? 'بستن پنل' : 'باز کردن پنل'}>
          <i className={`fas ${isPanelOpen ? 'fa-chevron-right' : 'fa-chevron-left'}`} aria-hidden="true"></i>
        </button>
      </div>

      <button className="new-chat-btn" onClick={startNewChat} aria-label="شروع مکالمه جدید">
        <i className="fas fa-plus" aria-hidden="true"></i>
        <span className="new-chat-text">مکالمه جدید</span>
      </button>

      <div className="panel-content-wrapper">
        <div className="panel-content">
          <div className="search-box">
            <input type="text" className="search-input" id="searchInput" placeholder="جستجو در تاریخچه..." aria-label="جستجو در تاریخچه مکالمات" />
          </div>

          <div className="history-section">
            <div className="section-title">
              <i className="fas fa-history" aria-hidden="true"></i>
              <span className="history-title">تاریخچه مکالمات</span>
            </div>
            <div className="history-list" id="historyList">
              {chatHistory.map(item => (
                <div key={item.id} className="history-item">
                  <div className="history-item-title">
                    <i className="fas fa-comment-dots"></i>
                    <span>{item.sender === 'user' ? 'شما' : 'ایده'}</span>
                  </div>
                  <div className="history-item-preview">{item.preview}</div>
                  <div className="history-item-time">
                    <i className="far fa-clock"></i>
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="online-contacts">
            <div className="section-title">
              <i className="fas fa-users" aria-hidden="true"></i>
              <span className="contacts-title">مخاطبین آنلاین</span>
              <span className="notification-badge">4</span>
            </div>
            <div className="contacts-list" id="contactsList"></div>
          </div>

          <div className="timeline-section">
            <div className="section-title">
              <i className="fas fa-heart-pulse" aria-hidden="true"></i>
              <span className="timeline-title">پیشنهادات هوشمند</span>
            </div>
            <div className="timeline-cards" id="timelineCards"></div>
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <div className="footer-menu-item" role="button" tabIndex="0">
          <i className="fas fa-cog" aria-hidden="true"></i>
          <span className="menu-text">تنظیمات</span>
        </div>
        <div className="footer-menu-item" role="button" tabIndex="0">
          <i className="fas fa-question-circle" aria-hidden="true"></i>
          <span className="menu-text">راهنما</span>
        </div>
        <div className="footer-menu-item plus" role="button" tabIndex="0">
          <i className="fas fa-user" aria-hidden="true"></i>
          <span className="menu-text">پروفایل کاربر</span>
        </div>
      </div>

      <div className="profile-section" role="button" tabIndex="0" aria-label="پروفایل کاربر">
        <div className="profile-avatar" title="کلیک کنید تا تصویر را تغییر دهید">
          <i className="fas fa-user" aria-hidden="true"></i>
        </div>
        <div className="profile-info">
          <div className="profile-name">کاربر ایده</div>
          <div className="profile-email">user@aria.ai</div>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
