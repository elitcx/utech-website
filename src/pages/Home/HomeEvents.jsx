import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';

const events = [
  { month: 'MAY', day: '03', name: 'Spring Hackathon 2026', location: 'ED Building, Room 209', time: '9:00 AM – 9:00 PM', tag: 'Hackathon', tagStyle: 'blue' },
  { month: 'MAY', day: '17', name: 'AI & Machine Learning Workshop', location: 'CK 230', time: '2:00 PM – 4:30 PM', tag: 'Workshop', tagStyle: 'green' },
  { month: 'JUN', day: '06', name: 'Industry Night — Summer Edition', location: 'Riddell Centre', time: '5:30 PM – 8:00 PM', tag: 'Networking', tagStyle: 'amber' },
  { month: 'JUN', day: '21', name: 'End-of-Year Showcase & Social', location: 'Research & Innovation Centre', time: '3:00 PM – 6:00 PM', tag: 'Social', tagStyle: 'green' },
];

export default function HomeEvents() {
  const ref = useReveal();

  return (
    <section id="events" className="events-bg">
      <div className="section-inner">
        <div className="reveal" ref={ref}>
          <div className="events-header">
            <div>
              <div className="section-label">UPCOMING</div>
              <h2 className="events-title">Events & <em>Activities</em></h2>
            </div>
            <Link to="/events" className="events-link">VIEW ALL EVENTS →</Link>
          </div>
          <div className="events-list">
            {events.map((e, i) => (
              <div className="event-row" key={i}>
                <div className="event-date">
                  <strong>{e.day}</strong>
                  {e.month} 2026
                </div>
                <div className="event-info">
                  <div className="event-name">{e.name}</div>
                  <div className="event-meta">
                    <span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {e.location}
                    </span>
                    <span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {e.time}
                    </span>
                  </div>
                </div>
                <span className={`event-tag ${e.tagStyle}`}>{e.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
