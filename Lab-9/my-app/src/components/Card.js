// A reusable card accepts any title, description, and content from its parent.
function Card({ title, description, children, accent = "teal" }) {
  return (
    <article className={`lab-card accent-${accent}`}>
      <div className="card-accent" />
      {title && <h3>{title}</h3>}
      {description && <p className="card-description">{description}</p>}
      {children}
    </article>
  );
}

export default Card;
