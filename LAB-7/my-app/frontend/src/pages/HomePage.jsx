import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import PetList from '../components/PetList.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function HomePage() {
  const { pets, loading, error, refreshPets } = useApp();
  const featuredPets = pets.filter((pet) => pet.adoptionStatus === 'Available').slice(0, 3);

  return <div className="home-page">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> A LITTLE LOVE GOES A LONG WAY</div>
        <h1>Find your new<br /><em>best friend.</em></h1>
        <p>Every pet has a story. Let’s help them find their way to the person who makes the rest of it wonderful.</p>
        <div className="hero-actions"><Link className="button button-primary" to="/pets">Meet the pets <i className="bi bi-arrow-up-right" /></Link><Link className="button button-light" to="/pets/new">Help a pet find home <i className="bi bi-arrow-up-right" /></Link></div>
        <div className="hero-trust"><span className="trust-icon"><i className="bi bi-heart-fill" /></span><span><strong>Good things start with a hello</strong><small>Find a friend who’s been waiting for you.</small></span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <img className="hero-pet-photo" src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1100&q=90" alt="Golden retriever looking for a family" />
        <div className="hero-note"><span className="note-icon"><i className="bi bi-house-heart-fill" /></span><div><b>A home full of love</b><small>It starts with you.</small></div><i className="bi bi-heart-fill" /></div>
        <span className="hero-caption">Your person is out there <i className="bi bi-sparkle" /></span>
        <div className="visual-tag"><span>ADOPT<br />A LITTLE<br />HAPPINESS</span></div>
      </div>
      <div className="hero-scroll"><span>01</span><i /><span>START HERE</span></div>
    </section>

    <section className="how-section">
      <div className="section-heading"><div><div className="eyebrow">YOUR NEW CHAPTER STARTS HERE</div><h2>Big love.<br /><em>Little steps.</em></h2></div><p>Finding your forever friend should feel special, not complicated. We’re here for every step.</p></div>
      <div className="steps-grid">
        <article className="step-card"><span className="step-number">01</span><span className="step-icon peach"><i className="bi bi-search-heart" /></span><h3>Meet your match</h3><p>Get to know the pets looking for a person just like you.</p></article>
        <article className="step-card"><span className="step-number">02</span><span className="step-icon lavender"><i className="bi bi-chat-heart" /></span><h3>Tell us about you</h3><p>Send an adoption request and share what home means to you.</p></article>
        <article className="step-card"><span className="step-number">03</span><span className="step-icon mint"><i className="bi bi-house-heart" /></span><h3>Make it official</h3><p>Connect with the pet’s people and start your life together.</p></article>
      </div>
    </section>

    <section className="featured-section">
      <div className="section-heading compact-heading"><div><div className="eyebrow">WAITING FOR THEIR PERSON</div><h2>Meet the lovebugs</h2></div><Link className="text-link" to="/pets">See all pets <i className="bi bi-arrow-up-right" /></Link></div>
      {loading ? <Loading /> : error ? <ErrorMessage message={error} onRetry={refreshPets} /> : featuredPets.length ? <PetList pets={featuredPets} /> : <div className="empty-featured"><span><i className="bi bi-heart" /></span><h3>New friends are on their way</h3><p>Check back soon, or help a pet find their forever home.</p><Link className="text-link" to="/pets/new">Add a pet <i className="bi bi-arrow-right" /></Link></div>}
    </section>
    <section className="home-cta"><div className="cta-flower"><i className="bi bi-heart-fill" /></div><div><div className="eyebrow">A HOME IS A FEELING</div><h2>Know a pet looking for love?<br /><em>Help them find their person.</em></h2></div><Link className="button button-primary" to="/pets/new">Add a pet <i className="bi bi-arrow-up-right" /></Link></section>
  </div>;
}
