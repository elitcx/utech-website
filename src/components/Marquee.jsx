const DEFAULT_ITEMS = [
  'Software Development', 'Artificial Intelligence', 'Cybersecurity',
  'UI/UX Design', 'Data Science', 'Open Source', 'Hackathons',
  'Workshops', 'Networking', 'Community',
];

export default function Marquee({ items = DEFAULT_ITEMS, color }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <div className={`marquee-dot${color === 'green' ? ' green' : color === 'amber' ? ' amber' : ''}`} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
