import { useReveal } from '../../hooks/useReveal';

export default function HomeAbout() {
  const ref = useReveal();
  return (
    <section id="about" className="about-bg">
      <div className="section-inner">
        <div className="reveal" ref={ref}>
          <div className="about-grid">
            <div>
              <div className="section-label">WHO WE ARE</div>
              <h2 className="about-title">A community for <em>every</em> kind of builder</h2>
              <p className="about-body">
                URSU Technology is the tech community at our university — open to anyone curious about how technology is built, used, and changed. Whether you write code, design interfaces, analyze data, or just want to explore, you belong here.
              </p>
              <p className="about-body" style={{marginTop: '-8px'}}>
                We run workshops, hackathons, talks, and collaborative projects that connect students to real skills and each other.
              </p>
              <div className="about-tags">
                <span className="tag">Open to All</span>
                <span className="tag">Student-Led</span>
                <span className="tag green">SMA REGINA PACIS SURAKARTA</span>
                <span className="tag">Project-Based</span>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-visual-inner">
                <div className="about-visual-logo">
                  <img src="/uploads/logo.png" alt="URSU Technology"/>
                </div>
                <div className="about-visual-name">URSU · TECHNOLOGY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
