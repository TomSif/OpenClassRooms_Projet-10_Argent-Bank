function FeatureItem({ iconSrc, title, text }) {
  return (
    <div className="feature-item">
      <img
        src={iconSrc}
        alt="Feature Icon"
        className="feature-icon"
        loading="lazy"
        width="100"
        height="100"
      />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default FeatureItem;
