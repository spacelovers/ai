import React, { useEffect } from 'react';

const BackgroundOverlay = () => {
  useEffect(() => {
    // Load custom background from localStorage
    const savedBg = localStorage.getItem('customBg');
    const savedBgImage = localStorage.getItem('customBgImage');

    const overlay = document.getElementById('backgroundOverlay');
    if (overlay) {
      if (savedBg) {
        document.body.style.setProperty('--bg-primary', savedBg);
      }
      if (savedBgImage) {
        overlay.style.backgroundImage = `url(${savedBgImage})`;
      }
    }
  }, []);

  return <div className="background-overlay" id="backgroundOverlay"></div>;
};

export default BackgroundOverlay;
