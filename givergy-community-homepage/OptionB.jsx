// =====================================================================
// OptionB.jsx — Sidebar Workspace
// App-like resource centre · left sidebar nav · view switching.
// Logged-in: a dedicated "Your Account" sidebar group + a "For You" view.
// Content uses row-style list items (deliberately different from Option A).
// =====================================================================
const { useState, useEffect } = React;

// ---- Sidebar
function BSidebar({ view, setView, loggedIn, member, onTool, onLogout }) {
  const Item = ({ id, icon, label, ext, action }) => (
    <button className={"b-nav__item" + (view === id ? " active" : "")} onClick={() => action ? action() : setView(id)}>
      <span className="giv-icon">{icon}</span>
      <span className="b-nav__label">{label}</span>
      {ext && <span className="giv-icon b-nav__ext">open_in_new</span>}
    </button>
  );
  return (
    <aside className="b-sidebar">
      <div className="b-sidebar__brand">
        <img src="assets/logos/givergy-logo-bymomogood.webp" alt="Givergy" />
        <span className="b-sidebar__tag">Community</span>
      </div>
      <div className="b-sidebar__scroll">
        <div className="b-nav__group">
          <Item id="home" icon="home" label="Home" />
          <Item id="guides" icon="menu_book" label="How-To Guides" />
          <Item id="advice" icon="tips_and_updates" label="Fundraising Advice" />
        </div>
        <div className="b-nav__sep">Listen &amp; Watch</div>
        <div className="b-nav__group">
          <Item id="podcast" icon="podcasts" label="Podcast" ext action={() => window.open("https://example.com/givergy-podcast", "_blank")} />
          <Item id="webinars" icon="videocam" label="Webinars" ext action={() => window.open("https://example.com/givergy-webinars", "_blank")} />
          <Item id="updates" icon="rocket_launch" label="Product Updates" ext action={() => window.open("https://example.com/givergy-changelog", "_blank")} />
        </div>
        {loggedIn && (
          <React.Fragment>
            <div className="b-nav__sep">Your Account <span className="member-badge">Member</span></div>
            <div className="b-nav__group">
              <Item id="foryou" icon="auto_awesome" label="For You" />
              <Item id="support" icon="support_agent" label="Support Ticket" action={() => onTool("ticket")} />
              <Item id="book" icon="inventory_2" label="Book Staff & Equipment" action={() => onTool("book")} />
              <Item id="account" icon="manage_accounts" label="Account Details" action={() => onTool("account")} />
              <Item id="create" icon="add_circle" label="Create a Campaign" action={() => onTool("create")} />
              <Item id="manage" icon="dashboard" label="Manage Campaigns" ext action={() => window.open("https://cms.givergy.com", "_blank")} />
            </div>
          </React.Fragment>
        )}
      </div>
      {loggedIn && (
        <div className="b-sidebar__user">
          <span className="acct__avatar" style={{ background: avatarColor(member.name) }}>{member.initials}</span>
          <div className="b-sidebar__userinfo">
            <div className="b-sidebar__username">{member.name}</div>
            <div className="b-sidebar__userorg">{member.org}</div>
          </div>
          <button className="b-sidebar__logout" title="Log out" onClick={onLogout}><span className="giv-icon">logout</span></button>
        </div>
      )}
    </aside>
  );
}

// ---- Topbar
function BTopbar({ title, sub, query, setQuery, loggedIn, onLogin }) {
  return (
    <div className="b-topbar">
      <div className="b-topbar__titles">
        <h1 className="b-topbar__title">{title}</h1>
        {sub && <p className="b-topbar__sub">{sub}</p>}
      </div>
      <div className="b-topbar__tools">
        <div className="search b-topbar__search">
          <span className="giv-icon">search</span>
          <input placeholder="Search the community…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {!loggedIn && <button className="btn btn--cyan" onClick={onLogin}>Log In / Sign Up</button>}
      </div>
    </div>
  );
}

// ---- Row-style article item
function ArticleRow({ a, onOpen }) {
  return (
    <button className="b-row" onClick={() => onOpen(a)}>
      <span className={"b-row__thumb " + a.fill}><span className="giv-icon">{a.icon}</span></span>
      <span className="b-row__body">
        <span className="b-row__top"><span className="tag">{a.cat}</span><span className="b-row__read">{a.read} read</span></span>
        <span className="b-row__title">{a.title}</span>
        <span className="b-row__excerpt">{a.excerpt}</span>
      </span>
      <span className="giv-icon b-row__go">chevron_right</span>
    </button>
  );
}

// ---- Browser view (guides / advice) with filter
function Browser({ items, query, onOpen, kind }) {
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.cat)))];
  const q = (query || "").toLowerCase();
  const filtered = items.filter((i) =>
    (cat === "All" || i.cat === cat) &&
    (!q || (i.title + " " + i.excerpt + " " + i.cat).toLowerCase().includes(q))
  );
  return (
    <div className="b-view">
      <div className="filter-row">
        {cats.map((c) => <span key={c} className={"chip" + (c === cat ? " active" : "")} onClick={() => setCat(c)}>{c}</span>)}
      </div>
      {filtered.length ? (
        <div className="b-rows">{filtered.map((a) => <ArticleRow key={a.id} a={a} onOpen={onOpen} />)}</div>
      ) : (
        <div className="empty"><div className="giv-icon">search_off</div><div>No results for “{query}”.</div></div>
      )}
    </div>
  );
}

// ---- Home view
function BHome({ loggedIn, member, onLogin, onOpen, setView, onTool }) {
  return (
    <div className="b-view">
      <div className={"b-hero" + (loggedIn ? " b-hero--member" : "")}>
        <div className="b-hero__confetti">
          {[["#ffffff",10,20,0,0.18],["#6FC7EC",84,28,18,0.5],["#F4A9D6",30,72,-12,0.4],["#ffffff",90,70,24,0.14],["#6FC7EC",60,12,8,0.4]].map((c,i)=>(
            <span key={i} className="confetti" style={{ background: c[0], left: c[1]+"%", top: c[2]+"%", transform:`rotate(${c[3]}deg)`, opacity: c[4] }} />
          ))}
        </div>
        <div className="b-hero__content">
          <span className="b-hero__eyebrow">{loggedIn ? `Welcome back, ${member.name.split(" ")[0]}` : "Givergy Community"}</span>
          <h2 className="b-hero__title">{loggedIn ? "Pick up where you left off." : "Everything you need to raise more."}</h2>
          <p className="b-hero__sub">Practical how-to guides, expert fundraising advice, and the tools to run unforgettable events.</p>
          <div className="b-hero__actions">
            <button className="btn btn--cyan" onClick={() => setView("guides")}>Browse Guides</button>
            {!loggedIn
              ? <button className="btn btn--outline" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.5)" }} onClick={onLogin}>Join Free</button>
              : <button className="btn btn--outline" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.5)" }} onClick={() => setView("foryou")}>Your Resources</button>}
          </div>
        </div>
      </div>

      {loggedIn && (
        <section className="b-block">
          <div className="b-block__head"><h3><span className="giv-icon" style={{ color: "var(--giv-magenta)" }}>auto_awesome</span> For You</h3><span className="sec-link" onClick={() => setView("foryou")}>View all <span className="giv-icon">arrow_forward</span></span></div>
          <div className="card-grid cols-3">
            {FORYOU.map((f) => (
              <button key={f.id} className="b-foryou" onClick={() => { if (f.kind === "guide" && f.ref) { const g = GUIDES.find(x=>x.id===f.ref); if (g) onOpen(g, "How-To Guides"); } else window.open("https://cms.givergy.com","_blank"); }}>
                <span className={"foryou__icon " + f.fill}><span className="giv-icon">{f.icon}</span></span>
                <span className="b-foryou__cat">{f.cat}</span>
                <span className="b-foryou__name">{f.title}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="b-block">
        <div className="b-block__head"><h3>Featured Guides</h3><span className="sec-link" onClick={() => setView("guides")}>All guides <span className="giv-icon">arrow_forward</span></span></div>
        <div className="b-rows">{GUIDES.slice(0, 3).map((a) => <ArticleRow key={a.id} a={a} onOpen={(x) => onOpen(x, "How-To Guides")} />)}</div>
      </section>

      <section className="b-block">
        <div className="b-block__head"><h3>Fundraising Advice</h3><span className="sec-link" onClick={() => setView("advice")}>All advice <span className="giv-icon">arrow_forward</span></span></div>
        <div className="b-rows">{ADVICE.slice(0, 3).map((a) => <ArticleRow key={a.id} a={a} onOpen={(x) => onOpen(x, "Fundraising Advice")} />)}</div>
      </section>

      <section className="b-block">
        <div className="b-block__head"><h3>Listen, Watch &amp; Learn</h3></div>
        <div className="card-grid cols-3">
          {LINKOUTS.map((l) => (
            <a key={l.id} className="linkcard" href={l.href} target="_blank" rel="noopener">
              <span className={"linkcard__icon " + l.fill}><span className="giv-icon">{l.icon}</span></span>
              <h3>{l.title}</h3>
              <p>{l.desc}</p>
              <span className="linkcard__go">{l.cta} <span className="giv-icon">open_in_new</span></span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---- For You view (logged in)
function BForYou({ member, onOpen, onTool, setView }) {
  return (
    <div className="b-view">
      <section className="b-block">
        <div className="b-block__head"><h3>Recommended for you</h3></div>
        <div className="b-rows">
          {FORYOU.map((f) => (
            <button key={f.id} className="b-row" onClick={() => { if (f.kind === "guide" && f.ref) { const g = GUIDES.find(x=>x.id===f.ref); if (g) onOpen(g, "How-To Guides"); } else window.open("https://cms.givergy.com","_blank"); }}>
              <span className={"b-row__thumb " + f.fill}><span className="giv-icon">{f.icon}</span></span>
              <span className="b-row__body">
                <span className="b-row__top"><span className="tag tag--magenta">{f.cat}</span></span>
                <span className="b-row__title">{f.title}</span>
              </span>
              <span className="giv-icon b-row__go">chevron_right</span>
            </button>
          ))}
        </div>
      </section>
      <section className="b-block">
        <div className="b-block__head"><h3>Account Tools</h3></div>
        <div className="card-grid cols-3">
          {TOOLS.map((t) => (
            <button key={t.id} className="tool" onClick={() => t.action === "external" ? window.open(t.href, "_blank") : onTool(t.action)}>
              <span className={"tool__icon " + t.tone}><span className="giv-icon">{t.icon}</span></span>
              <h4>{t.title} {t.action === "external" && <span className="giv-icon" style={{ fontSize: 16, color: "var(--giv-grey-50)" }}>open_in_new</span>}</h4>
              <p>{t.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---- App
const B_TITLES = {
  home: ["Home", "Help and inspiration for fundraisers — free for everyone."],
  guides: ["How-To Guides", "Step-by-step walkthroughs for every part of your campaign."],
  advice: ["Fundraising Advice", "Strategy and inspiration from experienced fundraisers."],
  foryou: ["For You", "Personalised resources and your account tools."],
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [view, setView] = useState("home");
  const [tool, setTool] = useState(null);
  const [article, setArticle] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, showToast] = useToast();
  const scrollRef = React.useRef(null);

  const openArticle = (a, kicker) => { setArticle({ a, kicker }); if (scrollRef.current) scrollRef.current.scrollTop = 0; };
  const back = () => { setArticle(null); };
  const goView = (v) => { setArticle(null); setView(v); setQuery(""); if (scrollRef.current) scrollRef.current.scrollTop = 0; };
  const doLogin = () => { setShowLogin(false); setLoggedIn(true); setView("foryou"); setArticle(null); showToast("You're logged in. Member tools unlocked."); };
  const doLogout = () => { setLoggedIn(false); setView("home"); setArticle(null); showToast("You've been logged out."); };

  useEffect(() => { if (query && (view === "home" || view === "foryou")) setView("guides"); }, [query]);

  let title = B_TITLES[view] ? B_TITLES[view][0] : "Community";
  let sub = B_TITLES[view] ? B_TITLES[view][1] : "";
  if (article) { title = article.kicker; sub = ""; }

  let body;
  if (article) body = <div className="b-readwrap"><ArticleReader article={article.a} kicker={article.kicker} onBack={back} /></div>;
  else if (view === "guides") body = <Browser items={GUIDES} query={query} onOpen={(a) => openArticle(a, "How-To Guides")} kind="guides" />;
  else if (view === "advice") body = <Browser items={ADVICE} query={query} onOpen={(a) => openArticle(a, "Fundraising Advice")} kind="advice" />;
  else if (view === "foryou" && loggedIn) body = <BForYou member={MEMBER} onOpen={openArticle} onTool={setTool} setView={goView} />;
  else body = <BHome loggedIn={loggedIn} member={MEMBER} onLogin={() => setShowLogin(true)} onOpen={openArticle} setView={goView} onTool={setTool} />;

  return (
    <div className="b-app">
      <BSidebar view={view} setView={goView} loggedIn={loggedIn} member={MEMBER} onTool={setTool} onLogout={doLogout} />
      <div className="b-main" ref={scrollRef}>
        <BTopbar title={title} sub={sub} query={query} setQuery={setQuery} loggedIn={loggedIn} onLogin={() => setShowLogin(true)} />
        <div className="b-content">{body}</div>
        <Footer />
      </div>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLogin={doLogin} />
      <ToolModal tool={tool} member={MEMBER} onClose={() => setTool(null)} onToast={showToast} />
      <Toast msg={toast} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
