// =====================================================================
// hub.jsx — Community homepage app (App component + views)
// Changes from v1:
//  • Logged-in: Account Tools moved to the TOP (right after hero).
//  • Hero search requires submit (Enter / Search button) → results view.
//  • Removed the "Join Free" button beside the search.
//  • Guides & Advice have "See All" → dedicated full-list pages.
// =====================================================================
const { useState, useEffect } = React;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// ---- Header
function AHeader({ loggedIn, member, onLogin, onLogout, onTool, active, goHub, goPage, goAccount }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const close = () => setMenu(false);
    if (menu) { window.addEventListener("click", close); return () => window.removeEventListener("click", close); }
  }, [menu]);
  return (
    <header className="a-header">
      <div className="a-header__inner">
        <div className="a-brand" onClick={goHub} style={{ cursor: "pointer" }}>
          <img src="assets/logos/givergy-logo-bymomogood.webp" alt="Givergy" />
          <span className="a-brand__tag">Community</span>
        </div>
        <nav className="a-nav">
          {loggedIn && <span className={"a-nav__item" + (active === "tools" ? " active" : "")} onClick={() => goHub("tools")}>My Tools</span>}
          <span className={"a-nav__item" + (active === "guides" ? " active" : "")} onClick={() => goPage("guides")}>Guides</span>
          <span className={"a-nav__item" + (active === "advice" ? " active" : "")} onClick={() => goPage("advice")}>Advice</span>
          <span className={"a-nav__item" + (active === "media" ? " active" : "")} onClick={() => goHub("media")}>Listen &amp; Watch</span>
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
                  <a onClick={() => { setMenu(false); goAccount(); }}><span className="giv-icon">manage_accounts</span> Account Details</a>
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

// ---- Hero (search now requires submit)
function AHero({ loggedIn, member, onLogin, onSearch }) {
  const [q, setQ] = useState("");
  const submit = (e) => { e.preventDefault(); const v = q.trim(); if (v) onSearch(v); };
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
        <form className="a-hero__search" onSubmit={submit}>
          <div className="search">
            <span className="giv-icon">search</span>
            <input placeholder="Search guides and advice…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button type="submit" className="btn btn--cyan btn--lg"><span className="giv-icon" style={{ fontSize: 20 }}>search</span> Search</button>
        </form>
        <div className="a-hero__chips">
          <span style={{ fontSize: 13, color: "var(--giv-fg-2)", fontWeight: 700 }}>Popular:</span>
          {["Silent auctions", "Stripe payouts", "Guest lists", "Donor stewardship"].map((t) => (
            <span key={t} className="a-hero__chip" onClick={() => { setQ(t); onSearch(t); }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Compact search band (logged-in: search is secondary to the account hero)
function SearchBand({ onSearch }) {
  const [q, setQ] = useState("");
  const submit = (e) => { e.preventDefault(); const v = q.trim(); if (v) onSearch(v); };
  return (
    <section className="search-band">
      <div className="wrap search-band__inner">
        <span className="search-band__label"><span className="giv-icon">search</span> Search the community</span>
        <form className="search-band__form" onSubmit={submit}>
          <div className="search">
            <span className="giv-icon">search</span>
            <input placeholder="Search guides and advice…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button type="submit" className="btn btn--cyan">Search</button>
        </form>
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
        <div className="acard__meta"><span>{a.author}</span></div>
      </div>
    </button>
  );
}

// ---- Account tools (logged in) — the TOP hero when logged in
function ToolsSection({ member, onTool, onViewTickets }) {
  const order = ["manage", "create", "book", "support"];
  const items = order.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean);
  return (
    <section id="tools" className="tools-hero">
      <div className="tools-hero__confetti">
        {[["#089DD9",6,18,0],["#BC2B87",82,24,18],["#6C3471",20,72,-12],["#07BF91",90,68,24],["#243776",58,10,8]].map((c,i)=>(
          <span key={i} className="confetti" style={{ background: c[0], left: c[1]+"%", top: c[2]+"%", transform: `rotate(${c[3]}deg)` }} />
        ))}
      </div>
      <div className="wrap" style={{ position: "relative" }}>
        <span className="tools-hero__eyebrow">Your Account</span>
        <h1 className="tools-hero__title">Welcome back, {member.name.split(" ")[0]}.</h1>
        <p className="tools-hero__sub">Jump back into your campaigns, book support for your next event, and manage everything in one place.</p>
        <div className="card-grid cols-4 tools-hero__grid">
          {items.map((t) => {
            const links =
              t.id === "support" ? [
                { label: "Request support", onClick: () => onTool("ticket") },
                { label: "View existing tickets", onClick: () => onViewTickets() },
              ]
              : t.action === "external" ? [{ label: "Go to Campaign Manager", onClick: () => window.open(t.href, "_blank") }]
              : t.action === "create" ? [{ label: "Create a campaign", onClick: () => onTool("create") }]
              : t.action === "book" ? [{ label: "View bookings", onClick: () => onTool("book") }]
              : [];
            return (
              <div key={t.id} className="tool">
                <span className={"tool__icon " + t.tone}><span className="giv-icon">{t.icon}</span></span>
                <h4>{t.title} {t.action === "external" && <span className="giv-icon" style={{ fontSize: 16, color: "var(--giv-grey-50)" }}>open_in_new</span>}</h4>
                <p>{t.desc}</p>
                <span className="tool__links">
                  {links.map((l, i) => (
                    <span key={i} className="tool__link" onClick={l.onClick}>
                      {l.label} <span className="giv-icon" style={{ fontSize: 16 }}>arrow_forward</span>
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---- Hub preview section (subset + See All)
function HubPreview({ id, eyebrow, title, sub, items, onOpen, onSeeAll }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <div className="sec-head">
          <div className="sec-head__l">
            <span className="sec-eyebrow">{eyebrow}</span>
            <h2 className="sec-title">{title}</h2>
            <p className="sec-sub">{sub}</p>
          </div>
        </div>
        <div className="card-grid cols-3">
          {items.slice(0, 3).map((a) => <ArticleCard key={a.id} a={a} onOpen={onOpen} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <button className="btn btn--outline btn--lg" onClick={onSeeAll}>See All {title.split(" ").pop()} <span className="giv-icon" style={{ fontSize: 20 }}>arrow_forward</span></button>
        </div>
      </div>
    </section>
  );
}

// ---- Media section
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

// ---- Dedicated full-list page (See All)
function DedicatedPage({ eyebrow, title, short, sub, items, onOpen, onBack, initialCat }) {
  const [local, setLocal] = useState("");
  const [cat, setCat] = useState(initialCat || "All");
  useEffect(() => { setCat(initialCat || "All"); }, [initialCat]);
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.cat)))];
  const q = local.toLowerCase();
  const filtered = items.filter((i) =>
    (cat === "All" || i.cat === cat) &&
    (!q || (i.title + " " + i.excerpt + " " + i.cat).toLowerCase().includes(q))
  );
  const crumbs = [
    { label: "Home", icon: "home", onClick: onBack },
    { label: short, onClick: cat === "All" ? undefined : () => setCat("All") },
  ];
  if (cat !== "All") crumbs.push({ label: cat });
  return (
    <main className="a-page">
      <div className="wrap">
        <div className="page-head">
          <Breadcrumb items={crumbs} />
          <div className="page-head__row">
            <div>
              <span className="sec-eyebrow">{eyebrow}</span>
              <h1 className="page-title">{title}</h1>
              <p className="page-sub">{sub}</p>
            </div>
            <div className="page-head__search">
              <div className="search">
                <span className="giv-icon">search</span>
                <input placeholder={"Search " + title.toLowerCase() + "…"} value={local} onChange={(e) => setLocal(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <div className="filter-row">
          {cats.map((c) => <span key={c} className={"chip" + (c === cat ? " active" : "")} onClick={() => setCat(c)}>{c}</span>)}
        </div>
        <div className="page-count">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</div>
        {filtered.length ? (
          <div className="card-grid cols-3">{filtered.map((a) => <ArticleCard key={a.id} a={a} onOpen={onOpen} />)}</div>
        ) : (
          <div className="empty"><div className="giv-icon">search_off</div><div>No results. Try a different search.</div></div>
        )}
      </div>
    </main>
  );
}

// ---- Search results (from hero submit)
function SearchResults({ query, onOpen, onBack, openGuide, openAdvice }) {
  const [q, setQ] = useState(query);
  useEffect(() => { setQ(query); }, [query]);
  const match = (i) => { const s = q.toLowerCase(); return !s || (i.title + " " + i.excerpt + " " + i.cat).toLowerCase().includes(s); };
  const g = GUIDES.filter(match), a = ADVICE.filter(match);
  const total = g.length + a.length;
  return (
    <main className="a-page">
      <div className="wrap">
        <div className="page-head">
          <Breadcrumb items={[{ label: "Home", icon: "home", onClick: onBack }, { label: "Search" }]} />
          <div className="page-head__row">
            <div>
              <span className="sec-eyebrow">Search</span>
              <h1 className="page-title">Results for “{query}”</h1>
            </div>
            <div className="page-head__search">
              <div className="search">
                <span className="giv-icon">search</span>
                <input placeholder="Refine your search…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <div className="page-count">{total} {total === 1 ? "result" : "results"}</div>
        {total === 0 && <div className="empty"><div className="giv-icon">search_off</div><div>No matches. Try different keywords.</div></div>}
        {g.length > 0 && (
          <div className="results-group">
            <h3>How-To Guides <span className="count">({g.length})</span> <span className="sec-link" style={{ marginLeft: "auto" }} onClick={openGuide}>View all <span className="giv-icon">arrow_forward</span></span></h3>
            <div className="card-grid cols-3">{g.map((x) => <ArticleCard key={x.id} a={x} onOpen={(z) => onOpen(z, "How-To Guides")} />)}</div>
          </div>
        )}
        {a.length > 0 && (
          <div className="results-group">
            <h3>Fundraising Advice <span className="count">({a.length})</span> <span className="sec-link" style={{ marginLeft: "auto" }} onClick={openAdvice}>View all <span className="giv-icon">arrow_forward</span></span></h3>
            <div className="card-grid cols-3">{a.map((x) => <ArticleCard key={x.id} a={x} onOpen={(z) => onOpen(z, "Fundraising Advice")} />)}</div>
          </div>
        )}
      </div>
    </main>
  );
}

// ---- Account details page (charity name + contracts / tickets / invoices)
function statusClass(s) {
  const k = s.toLowerCase();
  if (k === "active" || k === "paid" || k === "resolved") return "spill spill--green";
  if (k === "due" || k === "open" || k === "awaiting you") return "spill spill--amber";
  return "spill spill--grey";
}
function AccountPage({ member, account, onBack, onNewTicket }) {
  const crumbs = [
    { label: "Home", icon: "home", onClick: onBack },
    { label: "Account Details" },
  ];
  return (
    <main className="acct-page">
      <div className="wrap">
        <Breadcrumb items={crumbs} />
        <h1 className="acct-page__title">Account Details</h1>

        <div className="acct-namecard">
          <div>
            <span className="acct-namecard__label">Account name</span>
            <div className="acct-namecard__name">{member.org}</div>
          </div>
        </div>

        <section className="acct-sec">
          <div className="acct-sec__head"><h2>Contracts</h2></div>
          <div className="acct-table">
            {account.contracts.map((c) => (
              <div className="acct-row" key={c.id}>
                <div className="acct-row__main">
                  <strong>{c.name}</strong>
                  <span className="acct-row__meta">{c.ref} · {c.term}</span>
                </div>
                <span className="acct-row__val">{c.value}</span>
                <span className={statusClass(c.status)}>{c.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="acct-sec">
          <div className="acct-sec__head"><h2>Invoices</h2></div>
          <div className="acct-table">
            {account.invoices.map((inv) => (
              <div className="acct-row" key={inv.id}>
                <div className="acct-row__main">
                  <strong>{inv.number}</strong>
                  <span className="acct-row__meta">{inv.date}</span>
                </div>
                <span className="acct-row__val">{inv.amount}</span>
                <span className={statusClass(inv.status)}>{inv.status}</span>
                <a className="acct-row__link"><span className="giv-icon">download</span></a>
              </div>
            ))}
          </div>
        </section>

        <section className="acct-sec" id="acct-tickets">
          <div className="acct-sec__head">
            <h2>Support Tickets</h2>
            <button className="btn btn--outline btn--sm" type="button" onClick={onNewTicket}>New ticket</button>
          </div>
          <div className="acct-table">
            {account.tickets.map((t) => (
              <div className="acct-row" key={t.id}>
                <div className="acct-row__main">
                  <strong>{t.subject}</strong>
                  <span className="acct-row__meta">{t.event} · Updated {t.updated}</span>
                </div>
                <span className={statusClass(t.status)}>{t.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// ---- App
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [tool, setTool] = useState(null);
  const [view, setView] = useState("hub");       // hub | guides | advice | search | article | account
  const [article, setArticle] = useState(null);  // { a, kicker }
  const [search, setSearch] = useState("");
  const [pageCat, setPageCat] = useState("All");
  const [active, setActive] = useState("guides");
  const [toast, showToast] = useToast();

  // scroll spy (hub only)
  useEffect(() => {
    if (view !== "hub") { setActive(view); return; }
    const ids = loggedIn ? ["tools", "guides", "advice", "media"] : ["guides", "advice", "media"];
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 140) cur = id; }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [view, loggedIn]);

  const top = () => window.scrollTo({ top: 0 });
  const openArticle = (a, kicker) => { setArticle({ a, kicker }); setView("article"); top(); };
  const goPage = (v, cat = "All") => { setView(v); setPageCat(cat); top(); };
  const runSearch = (q) => { setSearch(q); setView("search"); top(); };
  const goAccount = (anchor) => {
    setView("account");
    if (anchor) setTimeout(() => scrollToId(anchor), 60);
    else top();
  };
  const goHub = (anchor) => {
    setView("hub"); setArticle(null);
    if (anchor) setTimeout(() => scrollToId(anchor), 60);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const doLogin = () => { setShowLogin(false); setLoggedIn(true); setView("hub"); top(); showToast("You're logged in. Member tools unlocked."); };
  const doLogout = () => { setLoggedIn(false); setView("hub"); showToast("You've been logged out."); };

  let content;
  if (view === "article") {
    const isGuide = article.kicker === "How-To Guides";
    const sview = isGuide ? "guides" : "advice";
    const aCrumbs = [
      { label: "Home", icon: "home", onClick: () => goHub() },
      { label: isGuide ? "Guides" : "Advice", onClick: () => goPage(sview) },
      { label: article.a.cat, onClick: () => goPage(sview, article.a.cat) },
      { label: article.a.title },
    ];
    content = <main className="a-readwrap"><div className="wrap"><Breadcrumb items={aCrumbs} /><ArticleReader article={article.a} /></div></main>;
  }
  else if (view === "guides") content = <DedicatedPage eyebrow="Get set up fast" title="How-To Guides" short="Guides" sub="Step-by-step walkthroughs for every part of your Givergy campaign." items={GUIDES} onOpen={(a) => openArticle(a, "How-To Guides")} onBack={() => goHub()} initialCat={pageCat} />;
  else if (view === "advice") content = <DedicatedPage eyebrow="Raise more" title="Fundraising Advice" short="Advice" sub="Strategy and inspiration from fundraisers who've done it before." items={ADVICE} onOpen={(a) => openArticle(a, "Fundraising Advice")} onBack={() => goHub()} initialCat={pageCat} />;
  else if (view === "search") content = <SearchResults query={search} onOpen={openArticle} onBack={() => goHub()} openGuide={() => goPage("guides")} openAdvice={() => goPage("advice")} />;
  else if (view === "account") content = <AccountPage member={MEMBER} account={ACCOUNT} onBack={() => goHub()} onNewTicket={() => setTool("ticket")} />;
  else content = (
    <main>
      {loggedIn ? (
        <React.Fragment>
          <ToolsSection member={MEMBER} onTool={setTool} onViewTickets={() => goAccount("acct-tickets")} />
          <SearchBand onSearch={runSearch} />
        </React.Fragment>
      ) : (
        <AHero loggedIn={loggedIn} member={MEMBER} onLogin={() => setShowLogin(true)} onSearch={runSearch} />
      )}
      <HubPreview id="guides" eyebrow="Get set up fast" title="How-To Guides" sub="Step-by-step walkthroughs for every part of your Givergy campaign." items={GUIDES} onOpen={(a) => openArticle(a, "How-To Guides")} onSeeAll={() => goPage("guides")} />
      <HubPreview id="advice" eyebrow="Raise more" title="Fundraising Advice" sub="Strategy and inspiration from fundraisers who've done it before." items={ADVICE} onOpen={(a) => openArticle(a, "Fundraising Advice")} onSeeAll={() => goPage("advice")} />
      <MediaSection />
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
  );

  return (
    <React.Fragment>
      <AHeader loggedIn={loggedIn} member={MEMBER} onLogin={() => setShowLogin(true)} onLogout={doLogout} onTool={setTool} active={active} goHub={goHub} goPage={goPage} goAccount={goAccount} />
      {content}
      <Footer />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLogin={doLogin} />
      <ToolModal tool={tool} member={MEMBER} onClose={() => setTool(null)} onToast={showToast} />
      <Toast msg={toast} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
