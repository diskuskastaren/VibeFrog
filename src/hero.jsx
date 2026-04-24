// hero.jsx — the fold-one hero
// Left: eyebrow, headline, sub, CTAs, keyboard shortcut hint
// Right: a live "snapshot" showing terminal + browser + a highlighted DOM element
// with a real overlay/tooltip, styled like the extension.

function ToolCycler() {
  const tools = [
    { name: 'Claude Code', icon: 'assets/claude-color.svg' },
    { name: 'Codex',       icon: 'assets/codex-color%20(1).svg' },
    { name: 'Gemini',      icon: 'assets/gemini-color.svg' },
    { name: 'Kimi Code',   icon: 'assets/kimi-color.svg' },
  ];
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % tools.length); setVisible(true); }, 260);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const tool = tools[idx];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0.72)',
      transition: 'opacity 260ms ease, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)',
    }}>
      {tool.icon && <img src={tool.icon} width={36} height={36} style={{ display: 'block', opacity: 0.85 }} />}
    </span>
  );
}

function Hero() {
  return (
    <section id="top" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          gap: 64,
          alignItems: 'center',
        }} className="hero-grid">

          {/* ── LEFT column ─────────────────────────── */}
          <div>
            <h1 className="display" style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                Stop describing UI.
              </span>
              <br/>
              <span style={{
                fontWeight: 400,
                color: 'var(--frog-deep)',
                fontStyle: 'italic',
              }}>
                Point at it.
              </span>
            </h1>

            <p style={{
              marginTop: 28,
              fontSize: 19,
              lineHeight: 1.55,
              maxWidth: 520,
              color: 'var(--ink-2)',
            }}>
              VibeFrog lets you hold <Kbd>Alt</Kbd>, hover any element, and click to copy an AI-ready snapshot with structure, styling, and page context. Right-click to capture a screenshot instead - giving coding agents the exact UI context they need in seconds.
            </p>

            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--ink-4)',
              }}>Optimized for</span>
              <ToolCycler />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <Button variant="primary" href="#install">
                Add to Chrome
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                        stroke="currentColor" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
              <Button variant="ghost" href="#sandbox">
                Try it in-page <span className="btn-arrow">↓</span>
              </Button>
            </div>

            <div style={{
              marginTop: 40,
              display: 'flex',
              gap: 28,
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--ink-3)',
              letterSpacing: '0.04em',
              flexWrap: 'wrap',
            }}>
              <span><Kbd>Alt</Kbd> <span style={{ opacity: 0.6 }}>hover</span></span>
              <span><Kbd>Alt</Kbd>+click <span style={{ opacity: 0.6 }}>copy context</span></span>
              <span><Kbd>Alt</Kbd>+right-click <span style={{ opacity: 0.6 }}>screenshot</span></span>
            </div>
          </div>

          {/* ── RIGHT column: static vignette ───────── */}
          <HeroVignette />
        </div>
      </div>

      {/* Stat strip */}
      <div className="wrap" style={{ marginTop: 100 }}>
        <div className="stats">
          <div className="stat">
            <div className="stat-v">Chrome extension</div>
            <div className="stat-k">Works in Chromium-based browsers</div>
          </div>
          <div className="stat">
            <div className="stat-v">Free to use</div>
            <div className="stat-k">No hidden costs</div>
          </div>
          <div className="stat">
            <div className="stat-v">Runs locally</div>
            <div className="stat-k">Local — nothing leaves the tab</div>
          </div>
          <div className="stat">
            <div className="stat-v">No login</div>
            <div className="stat-k">No account needed</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Hero vignette ──────────────────────────────────────
   A stylized composition: mini browser page with a "Buy" button
   highlighted by the real VibeFrog overlay style. Below it a
   terminal showing the pasted payload. Everything is static but
   rhythmic — subtle pulse on the overlay so it feels alive.
   ──────────────────────────────────────────────────── */
function HeroVignette() {
  return (
    <div style={{
      position: 'relative',
      minHeight: 440,
    }}>
      {/* Browser (back layer) */}
      <BrowserFrame
        url="shop.mosswear.co/p/lichen-hoodie"
        style={{
          position: 'relative',
          transform: 'rotate(-1.2deg)',
          zIndex: 1,
        }}
      >
        <div style={{
          padding: 24,
          display: 'grid',
          gridTemplateColumns: '96px 1fr',
          gap: 18,
          background: '#fff',
        }}>
          <HoodieImage style={{ height: 96, borderRadius: 8 }}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 10,
              color: 'var(--ink-4)', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Apparel</div>
            <div style={{
              fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600,
              letterSpacing: '-0.02em', color: 'var(--ink)',
            }}>Lichen hoodie</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)',
            }}>€129,00</div>

            {/* The highlighted target element — animated lifecycle */}
            <div style={{ position: 'relative', marginTop: 10, alignSelf: 'flex-start' }}>
              <button
                data-testid="buy-now"
                style={{
                  padding: '10px 20px',
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  border: 'none',
                  borderRadius: 6,
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Add to bag
              </button>

              {/* Extension overlay — cycles blue hover → green flash */}
              <div className="vf-overlay" style={{
                position: 'absolute',
                inset: -4,
                border: '2px solid rgba(37,99,235,0.95)',
                background: 'rgba(37,99,235,0.18)',
                borderRadius: 6,
                pointerEvents: 'none',
              }}/>

              {/* Click ripple */}
              <div className="vf-ripple" style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: 12, height: 12,
                marginLeft: -6, marginTop: -6,
                borderRadius: '50%',
                border: '2px solid rgba(72,191,83,0.95)',
                pointerEvents: 'none',
              }}/>

              {/* Animated cursor near button */}
              <div className="vf-cursor" style={{
                position: 'absolute',
                left: '70%', top: '45%',
                width: 22, height: 26,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.35))',
                zIndex: 4,
              }}>
                <svg width="22" height="26" viewBox="0 0 28 34" fill="none">
                  <path d="M3 2 L3 26 L9 21 L13 30 L17 28 L13 19 L21 19 Z"
                        fill="#fff" stroke="#121311" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Tooltip — cycles selector → "✓ Copied" (placed ABOVE button to avoid terminal) */}
              <div className="vf-tooltip" style={{
                position: 'absolute',
                left: 0,
                bottom: '100%',
                marginBottom: 8,
                whiteSpace: 'nowrap',
                background: 'rgba(17,24,39,0.96)',
                color: '#f9fafb',
                border: '1px solid rgba(75,85,99,0.95)',
                borderRadius: 8,
                padding: '6px 10px',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                pointerEvents: 'none',
                zIndex: 5,
              }}>
                <span className="vf-tip-sel">[data-testid="buy-now"]</span>
                <span className="vf-tip-ok">✓ Copied</span>
              </div>

            </div>
          </div>
        </div>
      </BrowserFrame>

{/* Terminal (front layer, overlap) */}
      <div style={{
        position: 'relative',
        transform: 'translate(12%, -4%) rotate(1.4deg)',
        zIndex: 2,
        maxWidth: 440,
        marginLeft: 'auto',
      }}>
        <TerminalFrame title="~/mosswear — claude-code">
          <div>
            <span className="t-prompt">›</span> <span className="t-user">make the add-to-bag button</span>
            {'\n'}<span className="t-user">  disabled when cart is empty</span>
            {'\n'}
            {'\n'}<span className="t-dim">Which button? Paste the element.</span>
            {'\n'}
            {'\n'}<span className="t-prompt">›</span> <span className="t-flash">[paste]</span>
            {'\n'}<span className="t-comment">// Target UI element:</span>
            {'\n'}<span className="t-key">url</span>: <span className="t-str">shop.mosswear.co/p/lichen-hoodie</span>
            {'\n'}<span className="t-key">text</span>: <span className="t-str">"Add to bag"</span>
            {'\n'}<span className="t-key">selector</span>: <span className="t-str">[data-testid="buy-now"]</span>
            {'\n'}<span className="t-key">html</span>: <span className="t-str">&lt;button data-testid=…&gt;</span>
            <span className="caret"/>
          </div>
        </TerminalFrame>
      </div>

{/* keyframes — 3.6s click cycle: hover(blue) → click → flash(green) → copied → reset */}
      <style>{`
        @keyframes vf-overlay {
          0%, 42% {
            border-color: rgba(37,99,235,0.95);
            background: rgba(37,99,235,0.18);
            transform: scale(1);
          }
          50% {
            border-color: rgba(72,191,83,0.95);
            background: rgba(72,191,83,0.34);
            transform: scale(0.98);
          }
          70% {
            border-color: rgba(72,191,83,0.95);
            background: rgba(72,191,83,0.22);
            transform: scale(1);
          }
          88%, 100% {
            border-color: rgba(72,191,83,0);
            background: rgba(72,191,83,0);
            transform: scale(1);
          }
        }
        .vf-overlay {
          animation: vf-overlay 3.6s ease-in-out infinite;
        }

        @keyframes vf-ripple {
          0%, 44% { opacity: 0; transform: scale(0.4); }
          50%     { opacity: 1; transform: scale(1); }
          68%     { opacity: 0; transform: scale(2.8); }
          100%    { opacity: 0; transform: scale(2.8); }
        }
        .vf-ripple {
          animation: vf-ripple 3.6s ease-out infinite;
          transform-origin: center;
        }

        @keyframes vf-cursor {
          0%, 40%  { transform: translate(0, 0); }
          48%      { transform: translate(0, 2px) scale(0.92); }
          56%      { transform: translate(0, 0) scale(1); }
          100%     { transform: translate(0, 0); }
        }
        .vf-cursor { animation: vf-cursor 3.6s ease-in-out infinite; }

        .vf-tip-sel, .vf-tip-ok {
          display: inline-block;
          transition: opacity 200ms;
        }
        @keyframes vf-tip-sel {
          0%, 44%  { opacity: 1; }
          50%, 82% { opacity: 0; }
          88%, 100%{ opacity: 1; }
        }
        @keyframes vf-tip-ok {
          0%, 44%  { opacity: 0; transform: translateY(-2px); }
          50%, 82% { opacity: 1; transform: translateY(0); }
          88%, 100%{ opacity: 0; transform: translateY(-2px); }
        }
        .vf-tip-sel { animation: vf-tip-sel 3.6s ease-in-out infinite; }
        .vf-tip-ok  {
          position: absolute; left: 10px; top: 6px;
          color: #d4f5c9;
          animation: vf-tip-ok 3.6s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  );
}

window.Hero = Hero;
