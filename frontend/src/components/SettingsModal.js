import React from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="settings-modal active" id="settingsModal" role="dialog" aria-labelledby="settingsTitle" aria-hidden="false" onClick={onClose}>
      <div className="settings-content" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2 id="settingsTitle">
            <i className="fas fa-cog" aria-hidden="true"></i>
            <span>تنظیمات پیشرفته</span>
          </h2>
          <button className="close-settings" onClick={onClose} aria-label="بستن تنظیمات">
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="settings-section">
          <h3>
            <i className="fas fa-palette" aria-hidden="true"></i>
            رنگ بکگراند
          </h3>
          <div className="color-picker-group">
            <div className="color-option" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} data-bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" aria-label="گرادینت بنفش-آبی"></div>
            <div className="color-option" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} data-bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" aria-label="گرادینت صورتی-قرمز"></div>
            <div className="color-option" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }} data-bg="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" aria-label="گرادینت آبی-فیروزه‌ای"></div>
            <div className="color-option" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }} data-bg="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" aria-label="گرادینت سبز-فیروزه‌ای"></div>
            <div className="color-option active" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }} data-bg="linear-gradient(135deg, #fa709a 0%, #fee140 100%)" aria-label="گرادینت صورتی-زرد"></div>
            <div className="color-option" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }} data-bg="linear-gradient(135deg, #30cfd0 0%, #330867 100%)" aria-label="گرادینت فیروزه‌ای-بنفش"></div>
          </div>
        </div>

        <div className="settings-section">
          <h3>
            <i className="fas fa-image" aria-hidden="true"></i>
            تصویر بکگراند دلخواه
          </h3>
          <input type="text" className="custom-bg-input" id="customBgUrl" placeholder="لینک تصویر را وارد کنید (URL)" aria-label="آدرس تصویر بکگراند" />
          <button className="upload-btn" id="applyBgUrl">
            <i className="fas fa-check" aria-hidden="true"></i>
            اعمال تصویر از URL
          </button>
          <button className="upload-btn" id="uploadBgBtn" style={{ marginTop: '0.5rem', background: 'var(--secondary-color)' }}>
            <i className="fas fa-upload" aria-hidden="true"></i>
            آپلود تصویر از کامپیوتر
          </button>
          <input type="file" id="bgImageUpload" accept="image/*" aria-label="آپلود تصویر بکگراند" />
        </div>

        <div className="settings-section">
          <button className="upload-btn" id="resetBg" style={{ background: 'var(--danger-color)' }}>
            <i className="fas fa-undo" aria-hidden="true"></i>
            بازگردانی به حالت پیش‌فرض
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
