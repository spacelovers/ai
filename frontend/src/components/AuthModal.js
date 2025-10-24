import React from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="auth-modal active" id="authModal" onClick={onClose}>
      <div className="auth-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <h2>ورود به سیستم</h2>
          <p>لطفا اطلاعات کاربری خود را وارد کنید</p>
        </div>
        <form className="auth-form" id="authForm">
          <div className="form-group">
            <label htmlFor="username">نام کاربری</label>
            <input type="text" id="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">رمز عبور</label>
            <input type="password" id="password" required />
          </div>
          <div className="auth-buttons">
            <button type="button" className="auth-btn secondary" onClick={onClose}>انصراف</button>
            <button type="submit" className="auth-btn primary">ورود</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
