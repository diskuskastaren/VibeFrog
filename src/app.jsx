// app.jsx — root component + mount

function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <FrogMark size={56}/>
          <span style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}>VibeFrog</span>
        </div>
        <nav>
          <a href="#video">HOW IT WORKS</a>
          <a href="#sandbox">Sandbox</a>
          <a href="#payload">Payload</a>
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
      <InstallSection/>
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
