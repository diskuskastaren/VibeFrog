// app.jsx — root component + mount

function TopBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const close = () => setMenuOpen(false);
  const openInstall = () => {
    document.getElementById('install')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.location.hash !== '#install') {
      window.location.hash = 'install';
    }
  };
  return (
    <div className="topbar">
      <div className="wrap topbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <FrogMark size={56}/>
          <span style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}>VibeFrog</span>
          </a>
          <span style={{
            marginLeft: 10,
            padding: '2px 8px',
            background: 'var(--paper-3)',
            border: '1px solid var(--hair)',
            borderRadius: 4,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ink-3)',
          }}>free</span>
        </div>
        <nav>
          <a href="#how-it-works">HOW IT WORKS</a>
          <a href="#sandbox">Try it</a>
          <a href="#payload">Payload</a>
          <a href="#faq">FAQ</a>
          <a href="#install">Install</a>
        </nav>
        <Button variant="primary" onClick={openInstall} style={{ padding: '8px 14px', fontSize: 13 }} className="topbar-cta">
          Add to Chrome
        </Button>
        {/* Hamburger — mobile only */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all 200ms', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }}/>
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all 200ms', opacity: menuOpen ? 0 : 1 }}/>
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all 200ms', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }}/>
        </button>
      </div>
      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#how-it-works" onClick={close}>How it works</a>
          <a href="#sandbox" onClick={close}>Try it</a>
          <a href="#payload" onClick={close}>Payload</a>
          <a href="#faq" onClick={close}>FAQ</a>
          <a href="#install" onClick={close} style={{ color: 'var(--frog-deep)', fontWeight: 600 }}>Install →</a>
        </div>
      )}
    </div>
  );
}

function App() {
  // intersection observer for fade-in
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <TopBar/>
      <Hero/>
      <div className="rule"/>
      <VideoDemo/>
      <div className="rule"/>
      <Sandbox/>
      <PayloadSpec/>
      <div className="rule"/>
      <FAQ/>
      <InstallSection/>
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
