import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Marquee from '../components/Marquee';
import Footer from '../components/Footer';
import { SIGNUP_CONFIG } from '../config/signup';
import '../styles/join.css';

const FAQS = [
{ q: 'Is membership free?', a: 'Yes — URSU Technology membership is completely free for all SMA Regina Pacis Surakarta students. There are no fees, no requirements, and no commitments beyond showing up and contributing.' },
{ q: 'Do I need technical experience to join?', a: 'Not at all. Many of our members joined with zero prior experience. We run beginner workshops and pair newer members with experienced mentors on projects. Curiosity is the only requirement.' },
{ q: 'Can I join multiple divisions?', a: 'Yes. You are welcome to participate in all three divisions simultaneously. Many members do cross-division project work — for example, the 3D Printing division regularly supports Robotics builds.' },
{ q: 'How active do I need to be?', a: 'There is no attendance requirement. You can drop in when your schedule allows. Most members come to at least one event per month, but you will get the most out of community if you engage with weekly build nights.' },
{ q: 'Are events open to non-members?', a: 'Most workshops and networking events are open to all Regina Pacis students — not just registered members. Some events like hackathons may require prior registration. Check each event listing for details.' },
{ q: 'How do I access the 3D printers?', a: 'Printer access is granted to members after attending one introductory print night session with a division lead. We require a brief orientation to ensure safe operation and good print hygiene.' },
{ q: 'Is URSU Technology affiliated with Ursulin?', a: "Yes — we operate under the SMA Regina Pacis Surakarta's Student Union as a recognized student group, which provides us with funding, meeting spaces, and event support." }];

const PERKS = [
{ icon: '🧰', title: 'Real Projects', desc: 'Work on live, shipped projects — not just toy examples.' },
{ icon: '🏆', title: 'Competitions', desc: 'Hackathons, CTFs, and design challenges with real prizes.' },
{ icon: '🤝', title: 'Industry Network', desc: 'Connect with professionals at our networking events.' },
{ icon: '🎓', title: 'Workshops', desc: '13+ workshops per year on in-demand technical skills.' },
{ icon: '🖨️', title: 'Print Lab Access', desc: 'Supervised access to FDM and SLA printers.' },
{ icon: '💬', title: 'Discord Community', desc: 'Active server with 62 members and live help.' },
{ icon: '🚀', title: 'Mentorship', desc: 'Pair with experienced members on challenging projects.' },
{ icon: '📄', title: 'Portfolio Projects', desc: 'Build real things you can put on your resume.' }];

const STEPS = [
{ num: '01', title: 'Fill out the form', body: 'When sign-ups open, complete the Google Form — it takes under 2 minutes. Tell us your program and which division interests you most.', color: '#5570f1', bg: 'rgba(85,112,241,0.08)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5570f1" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
{ num: '02', title: 'Join our Discord', body: "After submitting, you'll receive a Discord invite — our main hub for announcements, project chats, and direct access to division leads.", color: '#22c97a', bg: 'rgba(34,201,122,0.07)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c97a" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
{ num: '03', title: 'Show up', body: "Come to your first build night or event. Introduce yourself, find a project to work on, and start building. That's it.", color: '#f5a232', bg: 'rgba(245,162,50,0.07)', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5a232" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg> }];


function SignupPanel() {
  if (SIGNUP_CONFIG.isOpen) {
    return (
      <div className="signup-panel">
        <div className="signup-status-badge open">
          <span className="signup-status-dot open"></span>
          Sign-ups are open
        </div>
        <div className="signup-title">Ready to join?</div>
        <p className="signup-body">Fill out our Google Form — it takes under 2 minutes. Tell us your program and which division interests you most.</p>
        <div>
          <a href={SIGNUP_CONFIG.googleFormUrl} target="_blank" rel="noopener noreferrer" className="signup-cta-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            Open Sign-Up Form
          </a>
        </div>
        <p className="signup-footnote">FREE MEMBERSHIP · NO COMMITMENT · ALL UR STUDENTS WELCOME</p>
      </div>
    );
  }

  return (
    <div className="signup-panel">
      <div className="signup-status-badge closed">
        <span className="signup-status-dot closed"></span>
        Sign-ups currently closed
      </div>
      <div className="signup-title">Applications aren't open yet</div>
      <p className="signup-body">We run periodic intake cycles throughout the year. Join our Discord to get notified the moment sign-ups open — and start connecting with the community now.</p>
      {SIGNUP_CONFIG.showNextIntakeDate && SIGNUP_CONFIG.nextIntakeDate && (
        <div style={{ marginBottom: 28 }}>
          <div className="signup-next-date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Next intake: <strong>{SIGNUP_CONFIG.nextIntakeDate}</strong>
          </div>
        </div>
      )}
      <div>
        <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="signup-cta-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          Join Discord to Stay Updated
        </a>
      </div>
      <p className="signup-footnote">FREE MEMBERSHIP · INTAKE OPENS PERIODICALLY · ALL REGINA PACIS STUDENTS WELCOME</p>
    </div>
  );
}


export default function Join() {
  const [openFaq, setOpenFaq] = useState(null);

  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();

  const heroSub = SIGNUP_CONFIG.isOpen
    ? 'Free membership. No experience needed. Three technical divisions, 62 members, and 13+ events per year. Sign-ups are open now — scroll down to apply.'
    : 'Free membership. No experience needed. Three technical divisions, 62 members, and 13+ events per year. Sign-ups open periodically — scroll down to stay in the loop.';

  return (
    <>
      <Nav />

      {/* Hero */}
      <div className="join-hero">
        <div className="join-hero-dotgrid" /><div className="join-hero-glow" />
        <div className="join-hero-inner">
          <div style={{ opacity: 0, animation: 'fadeUp 0.8s 0.2s ease forwards' }}>
            <div className="section-label">JOIN US</div>
            <h1 className="join-hero-title">Become a <em>builder</em>.<br />Join the community.</h1>
            <p className="join-hero-sub">{heroSub}</p>
          </div>
          <div style={{ opacity: 0, animation: 'fadeUp 0.8s 0.4s ease forwards' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['62', 'Active members across 3 divisions'], ['Free', 'No cost, no commitments'], ['13+', 'Events, workshops & hackathons per year'], ['3', 'Technical divisions to choose from']].map(([n, l]) =>
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6 }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.02em', width: 52, flexShrink: 0 }}>{n}</div>
                  <div style={{ fontSize: 14, color: 'var(--white-dim)' }}>{l}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Marquee items={['Free to Join', 'No Experience Needed', 'All Students Welcome', 'Build Real Things', 'Ship Projects', 'Make Connections', 'SMA Regina Pacis Surakarta']} />

      {/* Steps */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div className="reveal" ref={r1}>
            <div className="section-label">HOW IT WORKS</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>Three steps to get started</h2>
            <div className="steps-grid">
              {STEPS.map((s) =>
                <div className="step-card" key={s.num}>
                  <div className="step-num">{s.num}</div>
                  <div className="step-icon" style={{ background: s.bg }}>{s.icon}</div>
                  <div className="step-title">{s.title}</div>
                  <p className="step-body">{s.body}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div className="reveal" ref={r2}>
            <div className="section-label">MEMBER PERKS</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>What you get</h2>
            <div className="perks-grid">
              {PERKS.map((p) =>
                <div className="perk-card" key={p.title}>
                  <div className="perk-icon">{p.icon}</div>
                  <div className="perk-title">{p.title}</div>
                  <p className="perk-desc">{p.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Signup panel */}
      <section id="form" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div className="reveal" ref={r3}>
            <div className="section-label">SIGN UP</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 28 }}>Membership sign-up</h2>
            <SignupPanel />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div className="reveal" ref={r4}>
            <div className="faq-section-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
              <div>
                <div className="section-label">FAQ</div>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>Common questions</h2>
                <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--white-dim)', lineHeight: 1.8 }}>Can't find an answer? Reach out on Discord or email us at tech@ursu.ca</p>
              </div>
              <div className="faq-list">
                {FAQS.map((f, i) =>
                  <div className="faq-item" key={i}>
                    <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className="faq-q-text">{f.q}</span>
                      <svg className={`faq-chevron${openFaq === i ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <div className={`faq-a${openFaq === i ? ' open' : ''}`}>
                      <p className="faq-a-inner">{f.a}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
