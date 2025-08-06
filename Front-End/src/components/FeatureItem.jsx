import React from 'react';

function FeatureItem({ iconSrc, title, text }) {
  return (
    <div className="feature-item">
      <img src={iconSrc} alt="Feature Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default FeatureItem;