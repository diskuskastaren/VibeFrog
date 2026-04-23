const FAQ_ITEMS = [
  {
    q: 'What is VibeFrog?',
    a: 'VibeFrog is a browser extension that helps you capture UI context and screenshots directly from a webpage, so you can make faster, more precise changes with AI tools.',
  },
  {
    q: 'Who is VibeFrog for?',
    a: 'VibeFrog is built for vibe-coders, designers, developers, and anyone who wants a faster way to work on UI with prompts, context, and screenshots.',
  },
  {
    q: 'How does VibeFrog work?',
    a: 'Hold a modifier key, hover over any element, and click to copy AI-ready context. Right-click to capture a screenshot of that element in the same flow.',
  },
  {
    q: 'What gets copied when I click an element?',
    a: 'VibeFrog captures structured context about the selected element so you can paste it directly into AI tools and write more accurate UI prompts.',
  },
  {
    q: 'Can VibeFrog take screenshots too?',
    a: 'Yes. You can right-click an element to capture a screenshot without breaking your workflow.',
  },
  {
    q: 'What is an AI-ready snapshot?',
    a: "It is a clean capture of the element's relevant context, formatted to be easy to paste into AI tools and use immediately.",
  },
  {
    q: 'How is this different from manually describing the UI to an AI?',
    a: 'Manual descriptions are slower and often vague. VibeFrog helps you capture the exact target directly from the page, which makes prompts faster and more precise.',
  },
  {
    q: 'What is the difference between UI Component and CSS Only?',
    a: 'UI Component (the default) copies the element\'s selector, HTML structure, and visible text — ideal when you want AI to understand what the element is and help you modify it. CSS Only copies the element\'s computed styles, organized by category — ideal when you want to steal a look and apply it elsewhere.',
  },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--sans)',
          fontSize: 17,
          fontWeight: 600,
          color: 'var(--paper)',
          textAlign: 'left',
          gap: 16,
          padding: '22px 0',
        }}
      >
        {q}
        <span style={{
          fontSize: 22,
          lineHeight: 1,
          color: '#8A8A80',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 200ms ease',
          flexShrink: 0,
        }}>+</span>
      </button>
      {open && (
        <div style={{
          paddingBottom: 22,
          fontFamily: 'var(--sans)',
          fontSize: 15,
          color: '#B8B3A8',
          lineHeight: 1.65,
          maxWidth: 640,
        }}>
          {a}
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <section id="faq" style={{ padding: '120px 0', background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid #000' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
          gap: 64,
          alignItems: 'start',
        }} className="faq-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>04 · faq</div>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 3.8vw, 54px)', color: 'var(--paper)' }}>
              Common questions
            </h2>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                open={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

window.FAQ = FAQ;
