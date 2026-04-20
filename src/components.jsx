// components.jsx — shared UI primitives for VibeFrog landing
// Exports to window: FrogMark, Kbd, Button, BrowserFrame, TerminalFrame, Tongue, FrogIllustration

const { useState, useEffect, useRef } = React;

/* ── FrogMark: real logo PNG.  Aspect-preserving, so `size` is the HEIGHT. */
function FrogMark({ size = 40 }) {
  return (
    <img
      src="assets/vibefrog-logo.png"
      alt="VibeFrog"
      style={{
        height: size,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
}

/* ── Keycap ────────────────────────────────────────────────────── */
function Kbd({ children, dark = false, style }) {
  return (
    <span className={'kbd' + (dark ? ' kbd-dark' : '')} style={style}>
      {children}
    </span>
  );
}

/* ── Button ────────────────────────────────────────────────────── */
function Button({ variant = 'primary', children, onClick, href, style, ...rest }) {
  const cls = 'btn ' + (variant === 'primary' ? 'btn-primary' : 'btn-ghost');
  if (href) {
    return <a className={cls} href={href} style={style} {...rest}>{children}</a>;
  }
  return <button className={cls} onClick={onClick} style={style} {...rest}>{children}</button>;
}

/* ── Browser frame chrome ──────────────────────────────────────── */
function BrowserFrame({ url = "https://shop.example.com/products/seed-packets", children, style, chromeExtra }) {
  return (
    <div className="browser" style={style}>
      <div className="browser-chrome">
        <div className="browser-dots"><i/><i/><i/></div>
        <div className="browser-url">{url}</div>
        {chromeExtra}
      </div>
      {children}
    </div>
  );
}

/* ── Terminal frame chrome ─────────────────────────────────────── */
function TerminalFrame({ title = "claude-code — zsh — 120x36", children, style }) {
  return (
    <div className="terminal" style={style}>
      <div className="terminal-chrome">
        <div className="dots"><i/><i/><i/></div>
        <div className="title">{title}</div>
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}

/* ── Tongue: angled accent line, used as a diagonal ribbon ─────── */
function Tongue({ width = 120, angle = -14, color = 'oklch(64% 0.18 20)', style }) {
  return (
    <span style={{
      display: 'inline-block',
      width, height: 6,
      background: color,
      borderRadius: 3,
      transform: `rotate(${angle}deg)`,
      transformOrigin: 'left center',
      ...style,
    }}/>
  );
}

/* ── Big frog illustration — intentionally simple (circles + rects).
   Used as an oversized decorative mark in the hero.                */
function FrogIllustration({ size = 260 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none"
         style={{ display: 'block' }}>
      {/* body */}
      <ellipse cx="130" cy="170" rx="110" ry="74" fill="oklch(54% 0.13 148)"/>
      {/* belly */}
      <ellipse cx="130" cy="198" rx="72" ry="32" fill="oklch(88% 0.06 148)"/>
      {/* eye bumps */}
      <circle cx="70" cy="90" r="40" fill="oklch(54% 0.13 148)"/>
      <circle cx="190" cy="90" r="40" fill="oklch(54% 0.13 148)"/>
      {/* eye whites */}
      <circle cx="70" cy="82" r="22" fill="#F4EFE6"/>
      <circle cx="190" cy="82" r="22" fill="#F4EFE6"/>
      {/* pupils */}
      <circle cx="74" cy="82" r="10" fill="#121311"/>
      <circle cx="194" cy="82" r="10" fill="#121311"/>
      <circle cx="78" cy="78" r="3" fill="#F4EFE6"/>
      <circle cx="198" cy="78" r="3" fill="#F4EFE6"/>
      {/* cursor on eye — tiny detail nodding to "pick an element" */}
      <path d="M 210 108 L 224 122 L 218 122 L 222 132 L 218 134 L 214 124 L 210 128 Z"
            fill="#121311" stroke="#F4EFE6" strokeWidth="1.5"/>
      {/* tongue */}
      <rect x="118" y="170" width="14" height="44" rx="6" fill="oklch(64% 0.18 20)"/>
    </svg>
  );
}

/* Small inline dot divider for text */
function Dot() {
  return <span style={{
    display: 'inline-block', width: 4, height: 4,
    background: 'var(--ink-4)', borderRadius: 2,
    margin: '0 10px', verticalAlign: 'middle'
  }}/>;
}

Object.assign(window, {
  FrogMark, Kbd, Button, BrowserFrame, TerminalFrame, Tongue, FrogIllustration, Dot,
  useState, useEffect, useRef,
});
