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
function Button({ variant = 'primary', children, onClick, href, style, className = '', ...rest }) {
  const cls = ('btn ' + (variant === 'primary' ? 'btn-primary' : 'btn-ghost') + ' ' + className).trim();
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

/* ── HoodieImage: lichen hoodie SVG illustration ─────────────── */
function HoodieImage({ style = {}, ...rest }) {
  return (
    <div {...rest} style={{
      background: 'linear-gradient(160deg, #e8ede4 0%, #d8e0d2 100%)',
      borderRadius: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      ...style,
    }}>
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: '72%', height: '72%', display: 'block' }}>

        {/* Left sleeve */}
        <path d="M 48 88 L 30 98 L 4 178 L 28 185 L 52 105" fill="#7d9e73"/>
        {/* Left cuff */}
        <path d="M 4 170 L 4 185 L 28 185 L 28 170 Z" fill="#6a8a60"/>

        {/* Right sleeve */}
        <path d="M 152 88 L 170 98 L 196 178 L 172 185 L 148 105" fill="#7d9e73"/>
        {/* Right cuff */}
        <path d="M 196 170 L 196 185 L 172 185 L 172 170 Z" fill="#6a8a60"/>

        {/* Body */}
        <path d="M 48 88 L 44 222 L 156 222 L 152 88 Z" fill="#7d9e73"/>

        {/* Hem rib */}
        <rect x="44" y="210" width="112" height="12" rx="1" fill="#6a8a60"/>

        {/* Hood outer shape */}
        <path d="M 48 88 C 45 65, 56 28, 100 20 C 144 28, 155 65, 152 88 Z" fill="#7d9e73"/>

        {/* Hood shadow line */}
        <path d="M 48 88 C 45 65, 56 28, 100 20 C 144 28, 155 65, 152 88"
          fill="none" stroke="#6a8a60" strokeWidth="1"/>

        {/* Hood interior */}
        <path d="M 72 88 C 70 70, 80 44, 100 38 C 120 44, 130 70, 128 88 Z" fill="#4d6645"/>

        {/* Kangaroo pocket */}
        <path d="M 66 158 L 62 198 L 138 198 L 134 158 Z"
          fill="none" stroke="#6a8a60" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="100" y1="158" x2="100" y2="198" stroke="#6a8a60" strokeWidth="1"/>

        {/* Drawstrings */}
        <line x1="88" y1="88" x2="83" y2="118" stroke="#6a8a60" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="112" y1="88" x2="117" y2="118" stroke="#6a8a60" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="83" cy="121" r="3" fill="#6a8a60"/>
        <circle cx="117" cy="121" r="3" fill="#6a8a60"/>
      </svg>
    </div>
  );
}

Object.assign(window, {
  FrogMark, Kbd, Button, BrowserFrame, TerminalFrame, Tongue, FrogIllustration, Dot, HoodieImage,
  useState, useEffect, useRef,
});
