// install.jsx — install CTA, popup UI mock, footer

function InstallSection() {
  return (
    <section id="install">
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 60,
          alignItems: 'center',
        }} className="install-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>05 · install</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.2vw, 60px)' }}>
              Two clicks,<br/>
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--frog-deep)' }}>
                one modifier key.
              </span>
            </h2>
            <p style={{ marginTop: 24, fontSize: 17, color: 'var(--ink-2)', maxWidth: 480 }}>
              VibeFrog is a Manifest V3 Chrome extension, works on any site.
              Flip the modifier to Ctrl or Shift if Alt conflicts with your OS.
              Pick full-text payload or selector-only. That's the whole config.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <Button variant="primary" href="#">
                Add to Chrome
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v8m0 0L4 7m3 3l3-3M3 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>

            <ul style={{
              listStyle: 'none', padding: 0, margin: '40px 0 0',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px',
              fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-2)',
            }}>
              <li>— Alt+click copies DOM</li>
              <li>— Alt+right-click screenshots</li>
              <li>— All local, zero tracking</li>
              <li>— Works on iframes</li>
            </ul>
          </div>

          {/* Popup mock */}
          <PopupMock/>
        </div>
      </div>
    </section>
  );
}

function PopupMock() {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {/* Floating paper card that looks like the browser toolbar popup */}
      <div style={{
        width: 340,
        background: '#FAF8F5',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 12,
        boxShadow: '0 30px 60px -30px rgba(0,0,0,0.4), 0 10px 20px -15px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}>
        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FrogMark size={36}/>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>VibeFrog</span>
          </div>
          <Toggle on/>
        </div>

        <div style={{ height: 1, background: '#E8E3DC' }}/>

        <Row label="Modifier key" value="Alt"/>
        <Row label="Copy format"  value="Full text"/>
        <Row label="Screenshot on right-click" value={<Toggle on/>} valueIsNode/>

        <div style={{
          padding: '12px 20px 16px',
          borderTop: '1px solid #E8E3DC',
          fontSize: 11, lineHeight: 1.9, color: '#777',
        }}>
          <div>Hold <Kbd>Alt</Kbd> to inspect</div>
          <div><Kbd>Alt</Kbd> + Click to copy</div>
          <div><Kbd>Alt</Kbd> + Right-click to screenshot</div>
        </div>
      </div>

      {/* Decorative pointer tail */}
      <div style={{
        position: 'absolute',
        top: -16, right: '30%',
        width: 20, height: 20,
        background: '#FAF8F5',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRight: 'none', borderBottom: 'none',
        transform: 'rotate(45deg)',
      }}/>

      {/* Label */}
      <div style={{
        position: 'absolute',
        bottom: -40, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--mono)', fontSize: 11,
        color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        ↑ the whole settings surface
      </div>
    </div>
  );
}

function Row({ label, value, valueIsNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', height: 44,
    }}>
      <span style={{ fontSize: 12, color: '#777', fontWeight: 500 }}>{label}</span>
      {valueIsNode
        ? value
        : <span style={{ fontSize: 12, fontWeight: 500, color: '#2a2a2a' }}>{value} ▾</span>}
    </div>
  );
}

function Toggle({ on }) {
  return (
    <div style={{
      width: 36, height: 20, borderRadius: 999,
      background: on ? 'oklch(54% 0.13 148)' : '#C8C3BC',
      border: `1px solid ${on ? 'oklch(45% 0.13 148)' : '#B8B3AC'}`,
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        width: 14, height: 14, borderRadius: '50%',
        background: '#fff',
        top: 2, left: on ? 18 : 2,
        transition: 'left 140ms',
      }}/>
    </div>
  );
}

/* ── Payload format spec card ──────────────────────────────── */
function PayloadSpec() {
  const full = `// Target UI element:
url: shop.mosswear.co/p/lichen-hoodie
text: "Add to bag"
best selector: [data-testid="buy-now"]
fallback selectors: #buy-btn, button[aria-label="Add to bag"]
html:
<button data-testid="buy-now" class="btn-primary" aria-label="Add to bag">Add to bag</button>`;

  const selectorOnly = `[data-testid="buy-now"]`;

  return (
    <section id="payload" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)' }}>
      <div className="wrap">
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>03 · what gets copied</div>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4.2vw, 60px)', maxWidth: 840 }}>
            Paste-ready payloads, shaped for language models.
          </h2>
          <p style={{ marginTop: 20, maxWidth: 640, fontSize: 17, color: 'var(--ink-2)' }}>
            Selectors are ranked: test IDs first, then stable <span style={{ fontFamily: 'var(--mono)' }}>id</span>, then ARIA,
            then role, then a short structural fallback. Generated class names
            (<span style={{ fontFamily: 'var(--mono)' }}>css-1a2b3c…</span>) are filtered out.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 16,
        }} className="payload-grid">
          <CodeCard title="Full text" subtitle="default — everything the model needs" code={full}/>
          <CodeCard title="Selector only" subtitle="for cypress / playwright snippets" code={selectorOnly} compact/>
        </div>

        {/* Selector ranking visualization */}
        <div style={{ marginTop: 40 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14,
          }}>
            selector priority
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              ['data-testid', 'Highest — authored for tests'],
              ['stable id',   'Non-numeric, no colons'],
              ['aria-label',  'Screen-reader-first'],
              ['role + text', 'Semantic fallback'],
              ['short css',   'Last resort, depth ≤ 4'],
            ].map(([k, desc], i) => (
              <div key={k} style={{
                flex: '1 1 180px',
                background: 'var(--paper)',
                border: '1px solid var(--hair)',
                borderRadius: 10,
                padding: '14px 16px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 10, right: 12,
                  fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-4)',
                }}>0{i+1}</div>
                <div style={{ fontFamily: 'var(--mono)', fontWeight: 500, fontSize: 14, color: 'var(--ink)' }}>
                  {k}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .payload-grid { grid-template-columns: 1fr !important; }
          .install-grid { grid-template-columns: 1fr !important; gap: 80px !important; }
        }
      `}</style>
    </section>
  );
}

function CodeCard({ title, subtitle, code, compact }) {
  return (
    <div style={{
      background: '#161712',
      border: '1px solid #000',
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      minHeight: compact ? 140 : 0,
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            color: 'oklch(75% 0.13 148)', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {title}
          </div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, color: '#7A7A70', marginTop: 2,
          }}>
            {subtitle}
          </div>
        </div>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: '#7A7A70',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '2px 7px', borderRadius: 4,
        }}>
          clipboard
        </span>
      </div>
      <pre style={{
        margin: 0, padding: '18px 20px',
        fontFamily: 'var(--mono)', fontSize: 13,
        lineHeight: 1.6, color: '#D6D2C6',
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        flex: 1,
      }}>
        {code}
      </pre>
    </div>
  );
}

/* ── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: '#B8B3A8', padding: '60px 0 40px' }}>
      <div className="wrap">
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <FrogMark size={36}/>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 600, color: 'var(--paper)' }}>
                VibeFrog
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 12, color: '#7A7A70',
              maxWidth: 340,
            }}>
              Built for people who want to capture UI context, not explain it twice.
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '8px 40px',
            fontFamily: 'var(--mono)', fontSize: 12,
          }}>
            <a href="#top" style={{ textDecoration: 'none', color: 'inherit' }}>top</a>
            <a href="#how-it-works" style={{ textDecoration: 'none', color: 'inherit' }}>how-it-works</a>
            <a href="#sandbox" style={{ textDecoration: 'none', color: 'inherit' }}>sandbox</a>
            <a href="#payload" style={{ textDecoration: 'none', color: 'inherit' }}>payload</a>
            <a href="#install" style={{ textDecoration: 'none', color: 'inherit' }}>install</a>
          </div>
        </div>

        <div style={{
          marginTop: 60, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          fontFamily: 'var(--mono)', fontSize: 11, color: '#5B5C55',
          letterSpacing: '0.06em',
        }}>
          <div>© 2026 VibeFrog</div>
          <a href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { InstallSection, PayloadSpec, Footer });
