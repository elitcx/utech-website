import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { ALL_EVENTS, TYPE_TAG_STYLE, isUpcoming } from '../../data/events';

const events = ALL_EVENTS
  .filter(isUpcoming)
  .slice(0, 4)
  .map(e => ({
    month: e.month,
    day: e.day,
    year: e.year,
    name: e.title,
    location: e.location,
    time: e.time,
    tag: e.type,
    tagStyle: TYPE_TAG_STYLE[e.type] ?? 'blue',
  }));

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
                  {e.month} {e.year}
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
