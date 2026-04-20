// sandbox.jsx — the interactive section that replicates the REAL extension
// User holds Alt on their real keyboard, hovers elements inside a fake
// webpage, and sees exactly the overlay/tooltip VibeFrog would show.
// Clicking copies a real payload to their clipboard.

function Sandbox() {
  const stageRef = useRef(null);
  const overlayRef = useRef(null);
  const tooltipRef = useRef(null);
  const [altDown, setAltDown] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [copied, setCopied] = useState(null); // {payload, selector, at}
  const [format, setFormat] = useState('text'); // text | selector
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Keyboard listeners
  useEffect(() => {
    const kd = (e) => {
      if (e.key === 'Alt') {
        e.preventDefault();
        setAltDown(true);
      }
    };
    const ku = (e) => {
      if (e.key === 'Alt') {
        e.preventDefault();
        setAltDown(false);
      }
    };
    const blur = () => setAltDown(false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      window.removeEventListener('blur', blur);
    };
  }, []);

  // Pointer tracking inside stage
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onMove = (e) => {
      setLastMouse({ x: e.clientX, y: e.clientY });
      if (!altDown) return;
      // find deepest inspectable element under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || !stage.contains(el)) { setHovered(null); return; }
      const inspectable = el.closest('[data-sbx]');
      if (!inspectable || !stage.contains(inspectable)) {
        setHovered(null); return;
      }
      setHovered(inspectable);
    };

    const onClick = (e) => {
      if (!altDown) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || !stage.contains(el)) return;
      const inspectable = el.closest('[data-sbx]');
      if (!inspectable) return;

      e.preventDefault();
      e.stopPropagation();

      const payload = buildPayload(inspectable, format);
      navigator.clipboard.writeText(payload).catch(() => {});

      setCopied({
        payload,
        selector: bestSelector(inspectable),
        at: Date.now(),
      });
      setHovered(null);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick, true);
    };
  }, [altDown, format]);

  // Compute overlay rect (in page coords, relative to stage)
  const overlayRect = (() => {
    if (!altDown || !hovered || !stageRef.current) return null;
    const r = hovered.getBoundingClientRect();
    const sr = stageRef.current.getBoundingClientRect();
    return {
      left: r.left - sr.left, top: r.top - sr.top,
      width: r.width, height: r.height,
    };
  })();

  const tooltipText = hovered ? bestSelector(hovered) : '';
  const tooltipPos = (() => {
    if (!altDown || !hovered || !stageRef.current) return null;
    const sr = stageRef.current.getBoundingClientRect();
    return { left: lastMouse.x - sr.left + 18, top: lastMouse.y - sr.top + 20 };
  })();

  const showCopyToast = copied && Date.now() - copied.at < 1800;

  return (
    <section id="sandbox" style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid #000' }}>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 36, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20, color: '#8A8A80' }}>
              <span style={{ color: '#8A8A80' }}>02 · live sandbox</span>
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.2vw, 60px)', color: 'var(--paper)', maxWidth: 780 }}>
              Don't install yet. Hold <Kbd dark>Alt</Kbd> and lick this page.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: '#B8B3A8', fontSize: 16 }}>
            This is the real thing — same selector logic, same overlay,
            same clipboard payload — running in-page.
            Hold <Kbd dark>Alt</Kbd>, hover anything below, click to copy.
          </p>
        </div>

        {/* Instruction bar */}
        <div style={{
          display: 'flex', gap: 12, alignItems: 'center',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          marginBottom: 20,
          fontFamily: 'var(--mono)', fontSize: 13,
          color: '#D6D2C6',
          flexWrap: 'wrap',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: altDown ? 'oklch(72% 0.15 148)' : '#444',
              boxShadow: altDown ? '0 0 10px oklch(72% 0.15 148)' : 'none',
              transition: 'all 120ms',
            }}/>
            {altDown ? 'Alt is down — move to inspect' : 'Hold Alt to inspect'}
          </span>
          <span style={{ color: '#5B5C55' }}>|</span>
          <span>Copy format:</span>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: 2 }}>
            {['text','selector'].map(f => (
              <button key={f} onClick={() => setFormat(f)}
                style={{
                  background: format === f ? 'var(--paper)' : 'transparent',
                  color: format === f ? 'var(--ink)' : '#D6D2C6',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: 4,
                  fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
                  fontWeight: format === f ? 600 : 400,
                }}>
                {f === 'text' ? 'Full text' : 'Selector only'}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', color: '#8A8A80', fontSize: 12 }}>
            {copied
              ? <span style={{ color: 'oklch(80% 0.14 148)' }}>✓ Copied to clipboard · {copied.selector}</span>
              : 'Results appear on the right →'}
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          gap: 20,
        }} className="sandbox-grid">

          {/* LEFT — the mock webpage */}
          <div
            ref={stageRef}
            style={{
              position: 'relative',
              borderRadius: 14,
              overflow: 'hidden',
              cursor: altDown ? 'crosshair' : 'auto',
            }}
          >
            <BrowserFrame url="lab.vibefrog.dev/sandbox">
              <MockPage />
            </BrowserFrame>

            {/* Overlay */}
            {overlayRect && (
              <div style={{
                position: 'absolute',
                left: overlayRect.left,
                top: overlayRect.top,
                width: overlayRect.width,
                height: overlayRect.height,
                border: '2px solid rgba(37,99,235,0.95)',
                background: 'rgba(37,99,235,0.18)',
                borderRadius: 4,
                pointerEvents: 'none',
                zIndex: 5,
              }}/>
            )}

            {/* Flash on copy */}
            {copied && Date.now() - copied.at < 500 && overlayRect && (
              <div style={{
                position: 'absolute',
                left: overlayRect.left,
                top: overlayRect.top,
                width: overlayRect.width,
                height: overlayRect.height,
                border: '2px solid rgba(72,191,83,0.95)',
                background: 'rgba(72,191,83,0.28)',
                borderRadius: 4,
                pointerEvents: 'none',
                zIndex: 5,
                animation: 'vfflash 500ms ease-out forwards',
              }}/>
            )}

            {/* Tooltip */}
            {tooltipPos && tooltipText && (
              <div style={{
                position: 'absolute',
                left: tooltipPos.left,
                top: tooltipPos.top,
                maxWidth: 420,
                padding: '6px 10px',
                background: 'rgba(17,24,39,0.96)',
                color: '#f9fafb',
                border: '1px solid rgba(75,85,99,0.95)',
                borderRadius: 8,
                fontFamily: 'var(--mono)', fontSize: 12,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                pointerEvents: 'none',
                zIndex: 6,
              }}>
                {tooltipText}
              </div>
            )}

            {/* Copy toast */}
            {showCopyToast && (
              <div style={{
                position: 'absolute',
                left: '50%', bottom: 20,
                transform: 'translateX(-50%)',
                background: 'rgba(16,60,20,0.96)',
                color: '#f0fdf1',
                border: '1px solid rgba(72,191,83,0.8)',
                borderRadius: 8,
                padding: '8px 16px',
                fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600,
                zIndex: 10,
                animation: 'vftoast 300ms ease-out',
              }}>
                ✓ Copied
              </div>
            )}

            <style>{`
              @keyframes vfflash {
                0% { border-color: rgba(72,191,83,0.95); background: rgba(72,191,83,0.28); opacity: 1; }
                100% { border-color: rgba(72,191,83,0); background: rgba(72,191,83,0); opacity: 0; }
              }
              @keyframes vftoast {
                from { opacity: 0; transform: translate(-50%, 10px); }
                to { opacity: 1; transform: translate(-50%, 0); }
              }
              @media (max-width: 900px) {
                .sandbox-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </div>

          {/* RIGHT — the clipboard output */}
          <ClipboardInspector copied={copied}/>
        </div>

        {/* Hint if no Alt pressed recently */}
        <div style={{
          marginTop: 24, textAlign: 'center',
          fontFamily: 'var(--mono)', fontSize: 12,
          color: '#7A7A70', letterSpacing: '0.08em',
        }}>
          tip — on mac, Alt = ⌥ option.  if your browser steals Alt, try a different window focus.
        </div>
      </div>
    </section>
  );
}

/* ── The mock webpage inside the sandbox browser ────────────── */
function MockPage() {
  return (
    <div style={{
      padding: 36,
      fontFamily: 'var(--sans)',
      color: 'var(--ink)',
      background: '#fff',
      minHeight: 600,
    }}>
      {/* Page header */}
      <header data-sbx aria-label="site header" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.08)',
        marginBottom: 32,
      }}>
        <div data-sbx id="logo" style={{
          fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 16,
          letterSpacing: '-0.01em',
        }}>MOSSWEAR</div>
        <nav data-sbx aria-label="primary" style={{ display: 'flex', gap: 24, fontSize: 13, fontFamily: 'var(--mono)' }}>
          <a data-sbx href="#shop">Shop</a>
          <a data-sbx href="#lookbook">Lookbook</a>
          <a data-sbx href="#about">About</a>
          <a data-sbx href="#cart" data-testid="cart-link">Cart (2)</a>
        </nav>
      </header>

      {/* Hero product */}
      <section data-sbx aria-label="product detail" style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: 28,
      }}>
        <div data-sbx aria-label="product image" style={{
          height: 280, borderRadius: 8,
          background: 'repeating-linear-gradient(135deg, #eee8dc 0 10px, #e0d9c7 10px 20px)',
          display: 'flex', alignItems: 'flex-end', padding: 10,
          fontFamily: 'var(--mono)', fontSize: 11, color: '#6b6458',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          product · 01 of 04
        </div>

        <div>
          <div data-sbx style={{
            fontFamily: 'var(--mono)', fontSize: 11, color: '#8A8A80',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>Apparel · SS26</div>
          <h3 data-sbx style={{
            fontFamily: 'var(--sans)', fontSize: 36, fontWeight: 700,
            letterSpacing: '-0.03em', margin: '6px 0 4px', lineHeight: 1.0,
          }}>Lichen hoodie</h3>
          <div data-sbx style={{ fontFamily: 'var(--mono)', fontSize: 14, color: '#5B5C55' }}>
            €129,00
          </div>

          <p data-sbx style={{
            marginTop: 16, fontSize: 14, lineHeight: 1.5, color: '#2B2C28',
            maxWidth: 400,
          }}>
            Moss-dyed heavyweight cotton. Runs honest.
            Available in sizes XS through XXL.
          </p>

          {/* Size picker */}
          <div data-sbx aria-label="size picker" style={{
            display: 'flex', gap: 6, marginTop: 18,
          }}>
            {['XS','S','M','L','XL','XXL'].map(s => (
              <button key={s} data-sbx data-testid={`size-${s.toLowerCase()}`}
                style={{
                  width: 40, height: 36, border: '1px solid rgba(0,0,0,0.18)',
                  background: s === 'M' ? 'var(--ink)' : '#fff',
                  color: s === 'M' ? 'var(--paper)' : 'var(--ink)',
                  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
                  borderRadius: 4, cursor: 'pointer',
                }}>
                {s}
              </button>
            ))}
          </div>

          {/* Form */}
          <form data-sbx aria-label="purchase form" style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input data-sbx type="email" name="email" placeholder="you@example.com"
              style={{
                flex: 1, minWidth: 200, height: 44,
                border: '1px solid rgba(0,0,0,0.18)', borderRadius: 6,
                padding: '0 14px', fontFamily: 'var(--mono)', fontSize: 13,
              }}/>
            <button data-sbx type="submit" data-testid="buy-now" aria-label="Add to bag"
              style={{
                height: 44, padding: '0 22px',
                background: 'var(--ink)', color: 'var(--paper)', border: 'none',
                borderRadius: 6, fontFamily: 'var(--sans)', fontSize: 14,
                fontWeight: 600, cursor: 'pointer',
              }}>
              Add to bag
            </button>
          </form>

          {/* Meta list */}
          <ul data-sbx aria-label="product meta" style={{
            listStyle: 'none', padding: 0, margin: '20px 0 0',
            fontFamily: 'var(--mono)', fontSize: 12, color: '#5B5C55',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 20px',
            maxWidth: 420,
          }}>
            <li data-sbx>— ships in 2 days</li>
            <li data-sbx>— free returns, 30 days</li>
            <li data-sbx>— naturally dyed</li>
            <li data-sbx>— 380 g / m²</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ── Clipboard inspector — shows what was (or would be) copied ─── */
function ClipboardInspector({ copied }) {
  if (!copied) {
    return (
      <div style={{
        borderRadius: 14,
        border: '1px dashed rgba(255,255,255,0.14)',
        background: 'rgba(255,255,255,0.02)',
        padding: 28,
        minHeight: 420,
        display: 'flex', flexDirection: 'column',
      }}>
        <div className="eyebrow" style={{ color: '#8A8A80', marginBottom: 14 }}>
          clipboard — empty
        </div>
        <div style={{
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          fontFamily: 'var(--mono)', fontSize: 13, color: '#6A6A60',
          lineHeight: 1.6,
        }}>
          Hold <Kbd dark style={{ margin: '0 2px' }}>Alt</Kbd> on your keyboard,<br/>
          hover anything in the page, then click.<br/><br/>
          Your clipboard payload appears here.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      borderRadius: 14,
      background: '#0b0c09',
      border: '1px solid rgba(255,255,255,0.1)',
      minHeight: 420,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div className="eyebrow" style={{ color: 'oklch(75% 0.13 148)' }}>
          ✓ clipboard
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: '#5B5C55',
        }}>
          {copied.payload.length} chars
        </div>
      </div>
      <pre style={{
        flex: 1, margin: 0, padding: '18px 20px',
        fontFamily: 'var(--mono)', fontSize: 12.5,
        lineHeight: 1.6, color: '#D6D2C6',
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        overflow: 'auto',
      }}>
        {copied.payload}
      </pre>
    </div>
  );
}

/* ── Selector + payload builders — mirror of content.js logic ─── */
function bestSelector(el) {
  const testAttrs = ['data-testid','data-test-id','data-cy','data-qa'];
  for (const a of testAttrs) {
    const v = el.getAttribute(a);
    if (v) return `[${a}="${v}"]`;
  }
  if (el.id) return `#${el.id}`;
  const aria = el.getAttribute('aria-label');
  if (aria) return `${el.tagName.toLowerCase()}[aria-label="${aria}"]`;
  const role = el.getAttribute('role');
  if (role) return `${el.tagName.toLowerCase()}[role="${role}"]`;
  // class-based short
  const cls = Array.from(el.classList || []).filter(c => !/^[a-z0-9]{16,}$/i.test(c)).slice(0, 2);
  if (cls.length) return `${el.tagName.toLowerCase()}.${cls.join('.')}`;
  return el.tagName.toLowerCase();
}

function fallbackSelectors(el) {
  const out = [];
  if (el.id) out.push(`#${el.id}`);
  const a = el.getAttribute('aria-label');
  if (a) out.push(`${el.tagName.toLowerCase()}[aria-label="${a}"]`);
  const n = el.getAttribute('name');
  if (n) out.push(`${el.tagName.toLowerCase()}[name="${n}"]`);
  const p = el.getAttribute('placeholder');
  if (p) out.push(`${el.tagName.toLowerCase()}[placeholder="${p}"]`);
  return [...new Set(out)].slice(0, 4);
}

function buildPayload(el, format) {
  const sel = bestSelector(el);
  if (format === 'selector') return sel;

  const visibleText = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160);
  const fb = fallbackSelectors(el);
  const outer = el.outerHTML.replace(/\s+/g, ' ').slice(0, 500);

  const lines = ['// Target UI element:'];
  lines.push(`url: lab.vibefrog.dev/sandbox`);
  if (visibleText) lines.push(`text: "${visibleText}"`);
  lines.push(`best selector: ${sel}`);
  if (fb.length) lines.push(`fallback selectors: ${fb.join(', ')}`);
  lines.push(`html:\n${outer}`);
  return lines.join('\n');
}

window.Sandbox = Sandbox;
