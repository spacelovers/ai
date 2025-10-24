import React from 'react';

const Toast = ({ show, message, type = 'success' }) => {
  if (!show) return null;

  return (
    <div className={`toast ${type} ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
