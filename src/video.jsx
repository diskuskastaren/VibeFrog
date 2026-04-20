// video.jsx — the animated demonstration
// Tells the VibeFrog story in ~20 seconds:
//   0-2s   Establish: terminal asks "which button?"
//   2-4s   Establish: browser page with a button
//   4-7s   User holds Alt, hovers button → blue overlay + tooltip
//   7-9s   Alt+click → green flash + "✓ Copied"
//   9-12s  Terminal receives the paste; payload types in
//   12-14s Resolve on terminal; ask follow-up about visual bug
//   14-17s Cursor drifts to product image, Alt+right-click
//   17-20s Element cropped → PNG screenshot lands on clipboard

function VideoDemo() {
  return (
    <section id="how-it-works">
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 40, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>01 · how it works</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.2vw, 60px)', maxWidth: 640 }}>
              The loop, in twenty seconds.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: 'var(--ink-2)', fontSize: 16 }}>
            Ask an agent to change something — it wants DOM for selectors,
            or a pixel-perfect crop for visual bugs. Capture. Paste. Fix.
          </p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--edge)',
          boxShadow: '0 40px 80px -40px rgba(0,0,0,0.4)',
        }}>
          <Stage
            width={1600}
            height={900}
            duration={20}
            background="#F4EFE6"
            persistKey="vibefrog-video"
            autoplay={true}
            loop={true}
          >
            <VideoScene />
          </Stage>
        </div>
      </div>
    </section>
  );
}

/* Hardcoded target rects inside our scene (in scene coords).
   Lets us animate cursor + overlay without measuring DOM. */
const BTN = { x: 700, y: 460, w: 220, h: 54 };
const IMG = { x: 168, y: 224, w: 320, h: 420 };   // product-shot area

function VideoScene() {
  const t = useTime();

  // Cursor path: rest → hover button → copy → drift to image → right-click screenshot
  const cursor = cursorAt(t);
  const showOverlay = (t >= 4.2 && t < 9.0) || (t >= 14.8 && t < 17.8);
  const flashing = (t >= 7.2 && t < 8.0) || (t >= 17.0 && t < 17.8);
  const copied = t >= 7.3 && t < 9.0;
  // Screenshot state
  const overlayTarget = t < 12 ? BTN : IMG;
  const altRightClicking = t >= 16.4 && t < 17.2;
  const screenshotTaken = t >= 17.2;

  // Camera zoom — Screen Studio style follow
  // Before 4s: wide. 4-9s: zoom on button. 9-12s: zoom on terminal. 12-14s: pull out.
  const zoom = getZoom(t);

  return (
    <>
      {/* Label (for comment context) */}
      <div data-screen-label={`video ${t.toFixed(1)}s`} style={{ display: 'none' }}/>

      {/* Zoom/pan container */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transform: `scale(${zoom.s}) translate(${zoom.tx}px, ${zoom.ty}px)`,
        transformOrigin: 'center center',
        transition: 'transform 0s',
      }}>
        {/* Browser window — the "stage" */}
        <div style={{
          position: 'absolute',
          left: 120, top: 120, width: 1120, height: 640,
          background: '#fff',
          border: '1px solid #1c1d1a',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 30px 60px -30px rgba(0,0,0,0.35)',
        }}>
          {/* browser chrome */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 20px', background: '#efebe2',
            borderBottom: '1px solid #1c1d1a',
            height: 56,
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <i style={dotStyle('#ff6159')}/>
              <i style={dotStyle('#ffbf2f')}/>
              <i style={dotStyle('#2aca44')}/>
            </div>
            <div style={{
              flex: 1, height: 32, background: '#F4EFE6',
              border: '1px solid rgba(18,19,17,0.1)', borderRadius: 8,
              padding: '0 14px',
              display: 'flex', alignItems: 'center',
              fontFamily: 'var(--mono)', fontSize: 14, color: '#5B5C55',
            }}>
              shop.mosswear.co/p/lichen-hoodie
            </div>
          </div>

          {/* page content */}
          <div style={{ padding: 48, display: 'flex', gap: 48 }}>
            <div style={{
              width: 320, height: 420, borderRadius: 10,
              background: 'repeating-linear-gradient(135deg, #eee8dc 0 14px, #e0d9c7 14px 28px)',
              display: 'flex', alignItems: 'flex-end',
              padding: 14,
              fontFamily: 'var(--mono)', fontSize: 13, color: '#6b6458',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              product shot
            </div>
            <div style={{ flex: 1, paddingTop: 16 }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 14,
                color: '#8A8A80', letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Apparel · SS26</div>
              <div style={{
                fontFamily: 'var(--sans)', fontSize: 56, fontWeight: 700,
                letterSpacing: '-0.035em', lineHeight: 1.0, marginTop: 12, color: '#121311',
              }}>Lichen hoodie</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 20, color: '#5B5C55',
                marginTop: 20,
              }}>€129,00</div>
              <div style={{
                fontFamily: 'var(--sans)', fontSize: 17, color: '#5B5C55',
                marginTop: 28, lineHeight: 1.5, maxWidth: 420,
              }}>Moss-dyed heavyweight cotton. Runs honest. Available XS–XXL.</div>

              {/* THE BUTTON — position must match BTN in scene coords minus browser offset */}
              <button
                data-testid="buy-now"
                style={{
                  position: 'absolute',
                  left: BTN.x - 120, top: BTN.y - 120, // subtract browser offset
                  width: BTN.w, height: BTN.h,
                  background: '#121311', color: '#F4EFE6',
                  border: 'none', borderRadius: 8,
                  fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>

        {/* VibeFrog overlay (drawn on top of browser, in scene coords) */}
        {showOverlay && (
          <div style={{
            position: 'absolute',
            left: overlayTarget.x - 4, top: overlayTarget.y - 4,
            width: overlayTarget.w + 8, height: overlayTarget.h + 8,
            border: `2px solid ${flashing ? 'rgba(72,191,83,0.95)' : 'rgba(37,99,235,0.95)'}`,
            background: flashing ? 'rgba(72,191,83,0.28)' : 'rgba(37,99,235,0.18)',
            borderRadius: 6,
            pointerEvents: 'none',
            transition: 'background 180ms, border-color 180ms',
          }}/>
        )}

        {/* Tooltip (follows cursor) */}
        {showOverlay && (
          <div style={{
            position: 'absolute',
            left: cursor.x + 18, top: cursor.y + 20,
            background: copied ? 'rgba(16,60,20,0.96)' : 'rgba(17,24,39,0.96)',
            border: `1px solid ${copied ? 'rgba(72,191,83,0.8)' : 'rgba(75,85,99,0.95)'}`,
            color: copied ? '#f0fdf1' : '#f9fafb',
            borderRadius: 8,
            padding: '8px 14px',
            fontFamily: copied ? 'var(--sans)' : 'var(--mono)',
            fontSize: 15, fontWeight: copied ? 600 : 400,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            {copied
              ? '✓ Copied'
              : (t >= 14.8 && t < 17.0)
                ? 'div[aria-label="product image"]'
                : (t >= 17.0 && t < 17.8)
                  ? '✓ Screenshot copied'
                  : '[data-testid="buy-now"]'}
          </div>
        )}

        {/* Cursor */}
        <Cursor x={cursor.x} y={cursor.y}
                alt={(t >= 3.5 && t < 9.0) || (t >= 14.2 && t < 17.8)}
                leftClick={t >= 6.8 && t < 7.8}
                rightClick={altRightClicking}/>
      </div>

      {/* Terminal overlay — slides up from bottom starting at 9s */}
      <TerminalOverlay t={t}/>

      {/* Screenshot clipboard indicator (17-20s) */}
      <ScreenshotClip t={t}/>

      {/* Scene labels top-left */}
      <SceneLabel t={t}/>
    </>
  );
}

function dotStyle(bg) {
  return {
    width: 14, height: 14, borderRadius: '50%',
    background: bg, display: 'inline-block',
    border: '1px solid rgba(0,0,0,0.2)',
  };
}

function cursorAt(t) {
  // keyframe path across scene coords (1600x900)
  const kt  = [0,   2,   3.8, 5.5, 7.2, 9,   12,  14,  15.6, 17.0, 19,  20];
  const kxs = [100, 300, 640, 820, 820, 820, 820, 700, 320,  320,  320, 320];
  const kys = [400, 420, 500, 488, 488, 760, 760, 560, 420,  420,  500, 500];
  const getX = interpolate(kt, kxs, Easing.easeInOutCubic);
  const getY = interpolate(kt, kys, Easing.easeInOutCubic);
  return { x: getX(t), y: getY(t) };
}

function getZoom(t) {
  // Scene is 1600x900. We scale/translate around its center (800,450).
  const kt = [0, 2, 4.2, 6, 8.4, 9, 12, 13.8, 15.6, 17.0, 18.5, 20];
  const ks = [1, 1, 1.25, 1.4, 1.4, 1.15, 0.95, 1.0, 1.3, 1.45, 1.2, 1.0];
  // center we're zooming on, in scene coords
  const cx = [800, 800, 810, 810, 810, 800, 800, 800, 328, 328, 520, 800];
  const cy = [450, 450, 480, 480, 480, 540, 600, 450, 434, 434, 500, 450];

  const s  = interpolate(kt, ks, Easing.easeInOutCubic)(t);
  const cX = interpolate(kt, cx, Easing.easeInOutCubic)(t);
  const cY = interpolate(kt, cy, Easing.easeInOutCubic)(t);
  // translate so (cX,cY) goes to center after scale
  const tx = (800 - cX);
  const ty = (450 - cY);
  return { s, tx, ty };
}

function Cursor({ x, y, alt, rightClick, leftClick }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: 28, height: 34,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))',
    }}>
      <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
        <path d="M3 2 L3 26 L9 21 L13 30 L17 28 L13 19 L21 19 Z"
              fill="#fff" stroke="#121311" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
      {alt && (
        <div style={{
          position: 'absolute',
          right: 24, top: 28,
          fontFamily: 'var(--mono)',
          fontSize: 11,
          color: '#121311',
          background: '#F4EFE6',
          border: '1px solid rgba(18,19,17,0.22)',
          borderBottomWidth: 2,
          padding: '2px 6px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
          fontWeight: 500,
        }}>
          {rightClick ? 'Alt + right-click' : leftClick ? 'Alt + left-click' : 'Alt'}
        </div>
      )}
    </div>
  );
}

function TerminalOverlay({ t }) {
  // Slide up 9 → 10s. Stay through 14s.
  // Slide up at 9s, slide back down at 14s so screenshot scene is unobstructed.
  const enter = clamp((t - 9) / 1, 0, 1);
  const exit  = clamp((t - 14) / 0.8, 0, 1);
  const easeIn  = Easing.easeOutCubic(enter);
  const easeOut = Easing.easeInCubic(exit);
  const translateY = (1 - easeIn) * 900 + easeOut * 900;
  if (t < 8.7 || t > 15) return null;

  // Typewriter from 10.0 → 12.0s
  const typeProgress = clamp((t - 10) / 2, 0, 1);
  const payload = `// Target UI element:
url: shop.mosswear.co/p/lichen-hoodie
text: "Add to bag"
best selector: [data-testid="buy-now"]
fallback selectors: button.btn-primary, button[aria-label="Buy"]
html:
<button data-testid="buy-now" class="btn-primary">Add to bag</button>`;
  const chars = Math.floor(payload.length * typeProgress);
  const visible = payload.slice(0, chars);

  const showFollowup = t >= 12.5;

  return (
    <div style={{
      position: 'absolute',
      left: 90, right: 90, bottom: 60,
      transform: `translateY(${translateY}px)`,
      borderRadius: 14,
      background: '#161712',
      border: '1px solid #000',
      boxShadow: '0 40px 80px -30px rgba(0,0,0,0.55)',
      overflow: 'hidden',
      maxHeight: 460,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 18px', background: '#0f100d',
        borderBottom: '1px solid #000',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <i style={dotStyle('#ff6159')}/>
          <i style={dotStyle('#ffbf2f')}/>
          <i style={dotStyle('#2aca44')}/>
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 13, color: '#8a8a7e', letterSpacing: '0.04em',
        }}>
          ~/mosswear — claude-code
        </div>
      </div>
      <div style={{
        padding: '22px 26px',
        fontFamily: 'var(--mono)', fontSize: 18,
        color: '#e8e5db', lineHeight: 1.55,
        whiteSpace: 'pre-wrap',
      }}>
        <span style={{ color: 'oklch(78% 0.12 148)' }}>›</span>{' '}
        <span>make the add-to-bag button disabled when cart is empty</span>
        {'\n'}
        {'\n'}
        <span style={{ color: '#8a8a7e' }}>Which button? Paste the element.</span>
        {'\n'}
        {'\n'}
        <span style={{ color: 'oklch(78% 0.12 148)' }}>›</span>{' '}
        <span style={{ color: '#e8e5db' }}>{visible}</span>
        {typeProgress < 1 && <span className="caret"/>}
        {showFollowup && (<>
          {'\n'}
          {'\n'}
          <span style={{ color: '#8a8a7e' }}>Got it. Also, the product image is cropped weird — show me?</span>
          {'\n'}
          <span style={{ color: 'oklch(78% 0.12 148)' }}>›</span> <span className="caret"/>
        </>)}
      </div>
    </div>
  );
}

function SceneLabel({ t }) {
  const label = getSceneLabel(t);
  if (!label) return null;
  return (
    <div style={{
      position: 'absolute',
      left: 32, top: 32,
      zIndex: 10,
      fontFamily: 'var(--mono)',
      fontSize: 14, letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#121311',
      background: '#F4EFE6',
      border: '1px solid rgba(18,19,17,0.25)',
      padding: '8px 14px',
      borderRadius: 6,
      opacity: 0.94,
    }}>
      <span style={{
        display: 'inline-block',
        width: 8, height: 8, borderRadius: '50%',
        background: 'oklch(54% 0.13 148)',
        marginRight: 10,
      }}/>
      {label}
    </div>
  );
}

function getSceneLabel(t) {
  if (t < 2)    return '01 — the ask';
  if (t < 4.2)  return '02 — the page';
  if (t < 7.2)  return '03 — hold alt, hover';
  if (t < 9)    return '04 — click to copy dom';
  if (t < 12)   return '05 — paste';
  if (t < 14)   return '06 — "and the image?"';
  if (t < 17)   return '07 — alt + right-click';
  return '08 — screenshot copied';
}

/* ── ScreenshotClip — small floating panel showing the cropped PNG
   as it lands on the clipboard in the last scene (17-20s). ──────── */
function ScreenshotClip({ t }) {
  if (t < 14.5) return null;
  // Slide-in from right 14.5 → 15.3
  const slide = Easing.easeOutCubic(clamp((t - 14.5) / 0.8, 0, 1));
  const tx = (1 - slide) * 460;
  // Crop-flash + fill at 17.0 → 17.8
  const fill = clamp((t - 17.0) / 0.8, 0, 1);
  const showPng = t >= 17.0;

  return (
    <div style={{
      position: 'absolute',
      right: 40, bottom: 40,
      width: 320,
      transform: `translateX(${tx}px)`,
      background: '#0b0c09',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 40px 80px -30px rgba(0,0,0,0.55)',
      zIndex: 8,
    }}>
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--mono)', fontSize: 12,
      }}>
        <span style={{ color: showPng ? 'oklch(75% 0.13 148)' : '#8a8a7e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {showPng ? '✓ clipboard — png' : 'clipboard — waiting'}
        </span>
        <span style={{ color: '#5B5C55' }}>320×280</span>
      </div>
      <div style={{
        position: 'relative',
        height: 200,
        background: 'repeating-linear-gradient(135deg, #eee8dc 0 14px, #e0d9c7 14px 28px)',
        overflow: 'hidden',
      }}>
        {/* Crop mask overlay that recedes as fill increases */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#0b0c09',
          opacity: 1 - fill,
          transition: 'opacity 0s',
        }}/>
        {/* Crosshair marks during the crop */}
        {t < 17.4 && (
          <>
            <div style={{ position: 'absolute', left: 8, top: 8, right: 8, height: 1, background: 'oklch(72% 0.15 148)', opacity: 0.6 }}/>
            <div style={{ position: 'absolute', left: 8, bottom: 8, right: 8, height: 1, background: 'oklch(72% 0.15 148)', opacity: 0.6 }}/>
            <div style={{ position: 'absolute', top: 8, left: 8, bottom: 8, width: 1, background: 'oklch(72% 0.15 148)', opacity: 0.6 }}/>
            <div style={{ position: 'absolute', top: 8, right: 8, bottom: 8, width: 1, background: 'oklch(72% 0.15 148)', opacity: 0.6 }}/>
          </>
        )}
        <div style={{
          position: 'absolute', left: 10, bottom: 10,
          fontFamily: 'var(--mono)', fontSize: 10,
          color: '#6b6458', letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          product shot · png
        </div>
      </div>
      <div style={{
        padding: '10px 14px',
        fontFamily: 'var(--mono)', fontSize: 11,
        color: '#D6D2C6', lineHeight: 1.5,
      }}>
        {showPng
          ? <>cropped · element-only · ready to paste into chat</>
          : <>right-click captured · cropping…</>}
      </div>
    </div>
  );
}

window.VideoDemo = VideoDemo;
