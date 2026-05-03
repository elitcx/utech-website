import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';

export default function CTA() {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <section id="join">
      <div className="cta-inner">
        <div className="reveal" ref={ref}>
          <div className="section-label">GET INVOLVED</div>
          <h2 className="cta-title">Ready to <em>build</em> something?</h2>
        </div>
        <div className="cta-right reveal" ref={ref2}>
          <p className="cta-body">
            Membership is free and open to all University of Regina students. Sign up, show up, and start building. No experience required — only curiosity.
          </p>
          <div className="cta-actions">
            <Link to="/join" className="btn-primary">Become a Member</Link>
            <a href="https://linktr.ee/ursutech" className="btn-ghost" target="_blank" rel="noopener noreferrer">Our Linktree</a>
          </div>
        </div>
      </div>
    </section>
  );
}
