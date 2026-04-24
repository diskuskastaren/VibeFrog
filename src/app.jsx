// app.jsx — root component + mount

function TopBar() {
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
        <Button variant="primary" href="#install" style={{ padding: '8px 14px', fontSize: 13 }}>
          Add to Chrome
        </Button>
      </div>
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
