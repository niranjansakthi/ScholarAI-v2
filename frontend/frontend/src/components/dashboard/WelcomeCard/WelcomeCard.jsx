import "./WelcomeCard.css";

function WelcomeCard() {
  return (
    <section className="welcome-card">
      <div className="welcome-card__content">
        <p className="welcome-card__eyebrow">Your knowledge workspace</p>
        <h2>Turn documents into helpful answers, flashcards, and quizzes.</h2>
        <p>
          Upload files, connect sources, and continue your learning flow from one polished workspace.
        </p>
      </div>
      <button className="welcome-card__button">Get started</button>
    </section>
  );
}

export default WelcomeCard;
