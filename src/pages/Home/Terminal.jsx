import { useState, useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';

const BOOT_LINES = [
  { type:'dim', text:'URSU-TECH OS v2.6.1 · April 2026' },
  { type:'dim', text:'Loading modules: [community] [divisions] [events] ......... OK' },
  { type:'spacer' },
  { type:'green', text:'Welcome to URSU Technology Terminal.' },
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
    { type:'amber', text:'  [03] 3D Printing      — Rapid prototyping, CAD, FDM/SLA' },
    { type:'spacer' },
    { type:'dim', text:'All divisions: OPEN TO JOIN' },
    { type:'spacer' },
  ],
  events: () => [
    { type:'blue', text:'Upcoming Events' },
    { type:'spacer' },
    { type:'green',  text:'  MAY 03   Spring Hackathon 2026          [ED 209]' },
    { type:'out',    text:'  MAY 17   AI & Machine Learning Workshop  [CK 230]' },
    { type:'amber',  text:'  JUN 06   Industry Night — Summer Edition [Riddell Centre]' },
    { type:'out',    text:'  JUN 21   End-of-Year Showcase & Social   [RI Centre]' },
    { type:'spacer' },
  ],
  members: () => [
    { type:'out', text:'Total members:' },
    { type:'green', text:'  112 active  ·  Metaverse: 38  ·  Robotics: 45  ·  3D Printing: 29' },
    { type:'spacer' },
  ],
  projects: () => [
    { type:'blue', text:'Active Projects' },
    { type:'spacer' },
    { type:'green', text:'  [MV] Campus AR Navigator         — in progress' },
    { type:'green', text:'  [MV] VR Physics Sandbox          — in progress' },
    { type:'green', text:'  [RB] 3-DOF Arm Controller        — in progress' },
    { type:'green', text:'  [RB] CV Object Sorter            — in progress' },
    { type:'amber', text:'  [3D] Modular Enclosure System    — in progress' },
    { type:'amber', text:'  [3D] Parametric Keyboard Case    — in progress' },
    { type:'spacer' },
    { type:'dim', text:'6 active projects across 3 divisions' },
    { type:'spacer' },
  ],
  whoami: () => [
    { type:'blue', text:'URSU Technology' },
    { type:'spacer' },
    { type:'out', text:'  University of Regina Student Union — Tech Community' },
    { type:'out', text:'  Founded: 2024  ·  Open to all UR students' },
    { type:'out', text:'  Focus: Build · Design · Explore · Connect · Compete · Ship' },
    { type:'spacer' },
    { type:'green', text:'  discord.gg/ursutech  ·  instagram: @ursutech' },
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
  return [
    { type:'green', text:`Joining ${name} division...` },
    { type:'dim',   text:'Sending request ................... OK' },
    { type:'green', text:`Welcome to ${name}! Check your Discord DMs for next steps.` },
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
    setLines([...newLines, ...output]);
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
          <h2 className="terminal-left-title">Explore URSU Tech<br/>via <em>command line</em></h2>
          <p className="terminal-left-body">
            Query the community, browse divisions, check upcoming events, and even request to join — all from the terminal.
          </p>
          <div className="terminal-commands">
            {HINTS.map(h => (
              <div key={h.cmd} className="terminal-cmd-hint" onClick={() => injectCmd(h.cmd)}>
                <span className="terminal-cmd-hint-prompt">$</span>
                <span className="terminal-cmd-hint-cmd">{h.cmd}</span>
                <span className="terminal-cmd-hint-desc">{h.desc}</span>
              </div>
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
            <span className="t-input-prompt">ursu@tech:~$</span>
            <input
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
