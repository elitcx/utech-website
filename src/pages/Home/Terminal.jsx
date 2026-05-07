import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { SIGNUP_CONFIG } from '../../config/signup';
import { DIVISION_PROJECTS } from '../../data/projects';

const BOOT_LINES = [
  { type:'dim', text:'U-TECH OS v2.6.1 · April 2026' },
  { type:'dim', text:'Loading modules: [community] [divisions] [events] ......... OK' },
  { type:'spacer' },
  { type:'green', text:'Welcome to URSULINE Technology Terminal.' },
  { type:'out', text:'Type `help` for available commands.' },
  { type:'spacer' },
];

const COMMANDS = {
  help: () => [
    { type:'blue', text:'Available commands:' },
    { type:'spacer' },
    { type:'out', text:'  divisions        List all community divisions' },
    { type:'out', text:'  join <division>  Join a division (metaverse/robotics/printing)' },
    { type:'out', text:'  events           Show upcoming events' },
    { type:'out', text:'  members          Community member count' },
    { type:'out', text:'  projects         Active projects across divisions' },
    { type:'out', text:'  whoami           About URSU Technology' },
    { type:'out', text:'  clear            Clear terminal' },
    { type:'spacer' },
  ],
  divisions: () => [
    { type:'blue', text:'URSU Technology · Divisions' },
    { type:'spacer' },
    { type:'green', text:'  [01] Metaverse       — XR, spatial computing, game engines' },
    { type:'green', text:'  [02] Robotics         — Embedded systems, autonomous machines' },
    { type:'amber', text:'  [03] 3D Printing      — High-speed CoreXY, AMS, Bambu Studio' },
    { type:'spacer' },
    { type:'dim', text:'All divisions: OPEN TO JOIN' },
    { type:'spacer' },
  ],
  events: () => [
    { type:'blue', text:'Upcoming Events' },
    { type:'spacer' },
    { type:'green',  text:'  MAY 03   Spring Hackathon 2026          [Smart Classroom 2]' },
    { type:'out',    text:'  MAY 17   AI & Machine Learning Workshop  [Smart Classroom 2]' },
    { type:'amber',  text:'  JUN 06   Industry Night — Summer Edition [SMA Regina Pacis]' },
    { type:'out',    text:'  JUN 21   End-of-Year Showcase & Social   [SMA Regina Pacis]' },
    { type:'spacer' },
  ],
  members: () => [
    { type:'out', text:'Total members:' },
    { type:'green', text:'  62 active  ·  Metaverse: 31  ·  Robotics: 24  ·  3D Printing: 22' },
    { type:'spacer' },
  ],
  projects: () => {
    const PREFIX = { metaverse:'MV', robotics:'RB', printing:'3D' };
    const COLOR  = { metaverse:'blue', robotics:'green', printing:'amber' };
    const lines = [
      { type:'blue', text:'Active Projects' },
      { type:'spacer' },
    ];
    let count = 0;
    for (const [div, projects] of Object.entries(DIVISION_PROJECTS)) {
      for (const p of projects.filter(p => p.status === 'Active')) {
        const tag = `[${PREFIX[div]}]`;
        lines.push({ type: COLOR[div], text: `  ${tag} ${p.name.padEnd(26)}— active` });
        count++;
      }
    }
    lines.push({ type:'spacer' });
    lines.push({ type:'dim', text:`${count} active projects across 3 divisions` });
    lines.push({ type:'spacer' });
    return lines;
  },
  whoami: () => [
    { type:'blue', text:'URSU Technology' },
    { type:'spacer' },
    { type:'out', text:'  SMA Regina Pacis Surakarta — Student Tech Community' },
    { type:'out', text:'  Founded: 2023  ·  Open to all Regina Pacis students' },
    { type:'out', text:'  Focus: Build · Design · Explore · Connect · Compete · Ship' },
    { type:'spacer' },
    { type:'green', text:'  instagram.com/ursutech  ·  @ursutech' },
    { type:'spacer' },
  ],
};

function getJoinOutput(arg) {
  const map = { metaverse:'Metaverse', robotics:'Robotics', printing:'3D Printing' };
  const name = map[arg?.toLowerCase()];
  if (!name) return [
    { type:'err', text:`Division "${arg}" not found. Try: metaverse, robotics, printing` },
    { type:'spacer' },
  ];
  if (SIGNUP_CONFIG.isOpen) {
    return [
      { type:'green', text:`Registration for ${name} is open!` },
      { type:'dim',   text:'Redirecting to join page ........... OK' },
      { type:'spacer' },
      { type:'__redirect', to: '/join' },
    ];
  }
  const dateMsg = SIGNUP_CONFIG.showNextIntakeDate && SIGNUP_CONFIG.nextIntakeDate
    ? `Next intake opens: ${SIGNUP_CONFIG.nextIntakeDate}.`
    : 'Check our Instagram @ursutech for updates.';
  return [
    { type:'amber', text:`Registration for ${name} is currently closed.` },
    { type:'out',   text:`${dateMsg}` },
    { type:'dim',   text:'Follow us on Instagram @ursutech to get notified when sign-ups open.' },
    { type:'spacer' },
  ];
}

const HINTS = [
  { cmd:'divisions', desc:'— list all divisions' },
  { cmd:'join robotics', desc:'— request to join' },
  { cmd:'events', desc:'— upcoming events' },
  { cmd:'projects', desc:'— active projects' },
];

export default function Terminal() {
  const [lines, setLines] = useState(BOOT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const ref = useReveal();
  const ref2 = useReveal();
  const navigate = useNavigate();

  const scrollBody = () => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  };

  const runCmd = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const [cmd, ...args] = trimmed.toLowerCase().split(' ');
    const newLines = [
      ...lines,
      { type:'cmd', prompt:'ursu@tech:~$', text: trimmed },
    ];

    if (cmd === 'clear') {
      setLines([{ type:'dim', text:'Terminal cleared.' }, { type:'spacer' }]);
      setHistory(h => [trimmed, ...h]);
      setHistIdx(-1);
      setInput('');
      setTimeout(scrollBody, 0);
      return;
    }

    let output;
    if (cmd === 'join') {
      output = getJoinOutput(args[0]);
    } else if (COMMANDS[cmd]) {
      output = COMMANDS[cmd]();
    } else {
      output = [
        { type:'err', text:`Command not found: ${cmd}. Type \`help\` for available commands.` },
        { type:'spacer' },
      ];
    }
    const redirectLine = output.find(l => l.type === '__redirect');
    const visibleOutput = output.filter(l => l.type !== '__redirect');
    setLines([...newLines, ...visibleOutput]);
    if (redirectLine) setTimeout(() => navigate(redirectLine.to), 900);
    setHistory(h => [trimmed, ...h]);
    setHistIdx(-1);
    setInput('');
    setTimeout(scrollBody, 0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { runCmd(input); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx]);
    }
  };

  const injectCmd = (cmd) => {
    inputRef.current?.focus();
    setInput(cmd);
    setTimeout(() => runCmd(cmd), 80);
  };

  const renderLine = (l, i) => {
    if (l.type === 'spacer') return <div key={i} className="t-spacer"/>;
    if (l.type === 'cmd') return (
      <div key={i} className="t-line">
        <span className="t-prompt">{l.prompt}</span>
        <span className="t-cmd">{l.text}</span>
      </div>
    );
    return (
      <div key={i} className={`t-line t-out ${l.type}`}>
        {l.text}
      </div>
    );
  };

  return (
    <section className="terminal-section">
      <div className="terminal-inner">
        <div className="terminal-left reveal" ref={ref}>
          <div className="terminal-left-label">INTERACTIVE TERMINAL</div>
          <h2 className="terminal-left-title">Explore U-TECH<br/>via <em>command line</em></h2>
          <p className="terminal-left-body">
            Query the community, browse divisions, check upcoming events, and even request to join — all from the terminal.
          </p>
          <div className="terminal-commands">
            {HINTS.map(h => (
              <button type="button" key={h.cmd} className="terminal-cmd-hint" onClick={() => injectCmd(h.cmd)}>
                <span className="terminal-cmd-hint-prompt">$</span>
                <span className="terminal-cmd-hint-cmd">{h.cmd}</span>
                <span className="terminal-cmd-hint-desc">{h.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="terminal-window reveal" ref={ref2}>
          <div className="terminal-titlebar">
            <div className="terminal-btn" style={{ background:'#f05e5e' }}/>
            <div className="terminal-btn" style={{ background:'#f5c842' }}/>
            <div className="terminal-btn" style={{ background:'#22c97a' }}/>
            <span className="terminal-titlebar-text">ursu@tech: ~ — bash</span>
          </div>
          <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
            {lines.map(renderLine)}
          </div>
          <div className="t-input-row">
            <label htmlFor="terminal-cmd-input" className="sr-only">Terminal command input</label>
            <span className="t-input-prompt">ursu@tech:~$</span>
            <input
              id="terminal-cmd-input"
              ref={inputRef}
              className="t-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
