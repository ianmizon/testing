// =====================================================================
// OptionA.jsx — Single-Scroll Hub
// Marketing-style scrolling page · sticky pill nav · warm hero.
// Logged-in: a personalised "For You" band + an Account Tools section.
// =====================================================================
const { useState, useEffect } = React;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// ---- Header
function AHeader({ loggedIn, member, onLogin, onLogout, onTool, active, goHub }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const close = () => setMenu(false);
    if (menu) { window.addEventListener("click", close); return () => window.removeEventListener("click", close); }
  }, [menu]);
  const NAV = [
    { id: "guides", label: "Guides" },
    { id: "advice", label: "Advice" },
    { id: "media", label: "Listen & Watch" },
  ];
  return (
    <header className="a-header">
      <div className="a-header__inner">
        <div className="a-brand" onClick={goHub} style={{ cursor: "pointer" }}>
          <img src="assets/logos/givergy-logo-bymomogood.webp" alt="Givergy" />
          <span className="a-brand__tag">Community</span>
        </div>
        <nav className="a-nav">
          {NAV.map((n) => (
            <span key={n.id} className={"a-nav__item" + (active === n.id ? " active" : "")} onClick={() => scrollToId(n.id)}>{n.label}</span>
          ))}
          {loggedIn && <span className={"a-nav__item" + (active === "tools" ? " active" : "")} onClick={() => scrollToId("tools")}>My Tools</span>}
        </nav>
        <div className="a-header__right">
          {!loggedIn ? (
            <button className="btn btn--cyan btn--sm" onClick={onLogin}>Log In / Sign Up</button>
          ) : (
            <div className="acct" onClick={(e) => { e.stopPropagation(); setMenu((m) => !m); }}>
              <span className="acct__avatar" style={{ background: avatarColor(member.name) }}>{member.initials}</span>
              <span className="acct__name">{member.name.split(" ")[0]}</span>
              <span className="giv-icon" style={{ fontSize: 20, color: "var(--giv-grey-75)" }}>expand_more</span>
              {menu && (
                <div className="acct__menu" onClick={(e) => e.stopPropagation()}>
                  <div className="acct__head">
                    <div style={{ fontWeight: 800, color: "var(--giv-grey-100)" }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: "var(--giv-fg-2)" }}>{member.org}</div>
                  </div>
                  <a onClick={() => { setMenu(false); onTool("account"); }}><span className="giv-icon">manage_accounts</span> Account Details</a>
                  <a onClick={() => { setMenu(false); window.open("https://cms.givergy.com", "_blank"); }}><span className="giv-icon">dashboard</span> Manage Campaigns <span className="giv-icon ext">open_in_new</span></a>
                  <a onClick={() => { setMenu(false); onLogout(); }}><span className="giv-icon">logout</span> Log Out</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ---- Hero
function AHero({ loggedIn, member, onLogin, query, setQuery }) {
  return (
    <section className="a-hero">
      <div className="a-hero__confetti">
        {[["#089DD9",8,12,0],["#BC2B87",78,18,18],["#6C3471",24,70,-12],["#07BF91",88,64,24],["#243776",62,8,8],["#089DD9",42,82,-18],["#BC2B87",14,40,30],["#6C3471",92,34,-8]].map((c,i)=>(
          <span key={i} className="confetti" style={{ background: c[0], left: c[1]+"%", top: c[2]+"%", transform: `rotate(${c[3]}deg)` }} />
        ))}
      </div>
      <div className="wrap a-hero__inner">
        <span className="a-hero__eyebrow">{loggedIn ? `Welcome back, ${member.name.split(" ")[0]}` : "Givergy Community"}</span>
        <h1 className="a-hero__title">{loggedIn ? "Everything you need to raise more." : "Raise more. Together."}</h1>
        <p className="a-hero__sub">Your hub for fundraising know-how — practical how-to guides, expert advice, and the tools to run unforgettable events. Free for everyone in the Givergy community.</p>
        <div className="a-hero__search">
          <div className="search">
            <span className="giv-icon">search</span>
            <input placeholder="Search guides and advice…" value={query} onChange={(e) => { setQuery(e.target.value); if (e.target.value) scrollToId("guides"); }} />
          </div>
          {!loggedIn && <button className="btn btn--navy btn--lg" onClick={onLogin}>Join Free</button>}
        </div>
        <div className="a-hero__chips">
          <span style={{ fontSize: 13, color: "var(--giv-fg-2)", fontWeight: 700 }}>Popular:</span>
          {["Silent auctions", "Stripe payouts", "Guest lists", "Donor stewardship"].map((t) => (
            <span key={t} className="a-hero__chip" onClick={() => { setQuery(t.split(" ")[0]); scrollToId("guides"); }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- For You band (logged in)
function ForYouBand({ onOpenGuide, onTool }) {
  return (
    <section className="foryou">
      <div className="wrap">
        <div className="foryou__head">
          <h2 className="foryou__title"><span className="giv-icon" style={{ color: "var(--giv-magenta)", fontSize: 26 }}>auto_awesome</span> For You</h2>
          <span className="member-badge">Member resources</span>
        </div>
        <div className="foryou__grid">
          {FORYOU.map((f) => (
            <button key={f.id} className="foryou__card" onClick={() => { if (f.kind === "guide" && f.ref) onOpenGuide(f.ref); else if (f.kind === "campaign") window.open("https://cms.givergy.com", "_blank"); }}>
              <span className={"foryou__icon " + f.fill}><span className="giv-icon">{f.icon}</span></span>
              <div className="foryou__txt">
                <span className="foryou__cat">{f.cat}</span>
                <span className="foryou__name">{f.title}</span>
              </div>
              <span className="giv-icon foryou__go">arrow_forward</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Article card
function ArticleCard({ a, onOpen }) {
  return (
    <button className="acard" onClick={() => onOpen(a)}>
      <div className={"acard__thumb " + a.fill}>
        <span className="giv-icon">{a.icon}</span>
        <span className="thumb-label">{a.cat}</span>
      </div>
      <div className="acard__body">
        <h3 className="acard__title">{a.title}</h3>
        <p className="acard__excerpt">{a.excerpt}</p>
        <div className="acard__meta"><span>{a.author}</span><span className="dot"></span><span>{a.read} read</span></div>
      </div>
    </button>
  );
}

// ---- Content section (guides / advice) with search + filter
function ContentSection({ id, eyebrow, title, sub, items, query, onOpen }) {
  const [local, setLocal] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.cat)))];
  const q = (query || local).toLowerCase();
  const filtered = items.filter((i) =>
    (cat === "All" || i.cat === cat) &&
    (!q || (i.title + " " + i.excerpt + " " + i.cat).toLowerCase().includes(q))
  );
  return (
    <section id={id} className="section">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__l">
            <span className="sec-eyebrow">{eyebrow}</span>
            <h2 className="sec-title">{title}</h2>
            <p className="sec-sub">{sub}</p>
          </div>
          <div className="section__search">
            <div className="search">
              <span className="giv-icon">search</span>
              <input placeholder={"Search " + title.toLowerCase() + "…"} value={local} onChange={(e) => setLocal(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="filter-row">
          {cats.map((c) => <span key={c} className={"chip" + (c === cat ? " active" : "")} onClick={() => setCat(c)}>{c}</span>)}
        </div>
        {filtered.length ? (
          <div className="card-grid cols-3">
            {filtered.map((a) => <ArticleCard key={a.id} a={a} onOpen={onOpen} />)}
          </div>
        ) : (
          <div className="empty"><div className="giv-icon">search_off</div><div>No results. Try a different search.</div></div>
        )}
      </div>
    </section>
  );
}

// ---- Listen, Watch & Learn (link-outs)
function MediaSection() {
  return (
    <section id="media" className="section section--tint">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__l">
            <span className="sec-eyebrow">More from Givergy</span>
            <h2 className="sec-title">Listen, Watch &amp; Learn</h2>
            <p className="sec-sub">Go deeper with our podcast, live webinars, and the latest from across the platform.</p>
          </div>
        </div>
        <div className="card-grid cols-3">
          {LINKOUTS.map((l) => (
            <a key={l.id} className="linkcard" href={l.href} target="_blank" rel="noopener">
              <span className={"linkcard__icon " + l.fill}><span className="giv-icon">{l.icon}</span></span>
              <h3>{l.title}</h3>
              <p>{l.desc}</p>
              <span className="linkcard__go">{l.cta} <span className="giv-icon">open_in_new</span></span>
              <span className="linkcard__meta">{l.meta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Account tools (logged in)
function ToolsSection({ onTool }) {
  return (
    <section id="tools" className="section">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__l">
            <span className="sec-eyebrow" style={{ color: "var(--giv-magenta)" }}>Your Account</span>
            <h2 className="sec-title">Tools &amp; Resources</h2>
            <p className="sec-sub">Manage your account, get help, and run your campaigns — all in one place.</p>
          </div>
        </div>
        <div className="card-grid cols-3">
          {TOOLS.map((t) => (
            <button key={t.id} className="tool" onClick={() => t.action === "external" ? window.open(t.href, "_blank") : onTool(t.action)}>
              <span className={"tool__icon " + t.tone}><span className="giv-icon">{t.icon}</span></span>
              <h4>{t.title} {t.action === "external" && <span className="giv-icon" style={{ fontSize: 16, color: "var(--giv-grey-50)" }}>open_in_new</span>}</h4>
              <p>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- App
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [tool, setTool] = useState(null);
  const [article, setArticle] = useState(null); // { a, kicker }
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("guides");
  const [toast, showToast] = useToast();

  // scroll spy
  useEffect(() => {
    if (article) return;
    const ids = ["guides", "advice", "media", "tools"];
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 140) cur = id; }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [article, loggedIn]);

  const openArticle = (a, kicker) => { setArticle({ a, kicker }); window.scrollTo({ top: 0 }); };
  const openGuideById = (id) => { const g = GUIDES.find((x) => x.id === id); if (g) openArticle(g, "How-To Guides"); };
  const doLogin = () => { setShowLogin(false); setLoggedIn(true); showToast("You're logged in. Member tools unlocked."); };
  const doLogout = () => { setLoggedIn(false); showToast("You've been logged out."); };
  const goHub = () => { setArticle(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <React.Fragment>
      <AHeader loggedIn={loggedIn} member={MEMBER} onLogin={() => setShowLogin(true)} onLogout={doLogout} onTool={setTool} active={active} goHub={goHub} />
      {article ? (
        <main className="a-readwrap"><div className="wrap"><ArticleReader article={article.a} kicker={article.kicker} onBack={goHub} /></div></main>
      ) : (
        <main>
          <AHero loggedIn={loggedIn} member={MEMBER} onLogin={() => setShowLogin(true)} query={query} setQuery={setQuery} />
          {loggedIn && <ForYouBand onOpenGuide={openGuideById} onTool={setTool} />}
          <ContentSection id="guides" eyebrow="Get set up fast" title="How-To Guides" sub="Step-by-step walkthroughs for every part of your Givergy campaign." items={GUIDES} query={query} onOpen={(a) => openArticle(a, "How-To Guides")} />
          <ContentSection id="advice" eyebrow="Raise more" title="Fundraising Advice" sub="Strategy and inspiration from fundraisers who've done it before." items={ADVICE} query={query} onOpen={(a) => openArticle(a, "Fundraising Advice")} />
          <MediaSection />
          {loggedIn && <ToolsSection onTool={setTool} />}
          {!loggedIn && (
            <section className="cta-band">
              <div className="wrap cta-band__inner">
                <div>
                  <h2>Get personalised resources and tools.</h2>
                  <p>Log in to submit support tickets, book event staff, manage your account and jump into your campaigns.</p>
                </div>
                <button className="btn btn--cyan btn--lg" onClick={() => setShowLogin(true)}>Log In / Sign Up</button>
              </div>
            </section>
          )}
        </main>
      )}
      <Footer />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLogin={doLogin} />
      <ToolModal tool={tool} member={MEMBER} onClose={() => setTool(null)} onToast={showToast} />
      <Toast msg={toast} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
