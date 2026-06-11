// =====================================================================
// shared.jsx — reusable components for both Community options
// =====================================================================
const { useState, useEffect, useRef } = React;

// ---- brand colour helper for avatars / accents
const BRAND_FILLS = { fill_cyan: "#089DD9", fill_navy: "#243776", fill_magenta: "#BC2B87", fill_purple: "#6C3471", fill_teal: "#07BF91" };
function avatarColor(name) {
  const list = ["#243776", "#089DD9", "#BC2B87", "#6C3471", "#07BF91"];
  let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return list[Math.abs(h) % list.length];
}

// ---- SSO brand marks (approximate, per design system caveat)
function SSOIcon({ kind }) {
  if (kind === "google") return (
    <svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C39.9 36 44 30.6 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
  );
  if (kind === "microsoft") return (
    <svg viewBox="0 0 48 48"><rect x="6" y="6" width="16" height="16" fill="#F25022"/><rect x="26" y="6" width="16" height="16" fill="#7FBA00"/><rect x="6" y="26" width="16" height="16" fill="#00A4EF"/><rect x="26" y="26" width="16" height="16" fill="#FFB900"/></svg>
  );
  if (kind === "facebook") return (
    <svg viewBox="0 0 48 48"><path fill="#1877F2" d="M44 24c0-11-9-20-20-20S4 13 4 24c0 10 7.3 18.2 16.9 19.8V29.8h-5.1V24h5.1v-4.4c0-5 3-7.8 7.6-7.8 2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.5-3.3 3.1V24h5.6l-.9 5.8h-4.7v14C36.7 42.2 44 34 44 24z"/></svg>
  );
  return <span className="giv-icon" style={{ fontSize: 18, color: "var(--giv-navy)" }}>mail</span>;
}

// ---- Login modal (SSO + email) — mocked
function LoginModal({ open, onClose, onLogin }) {
  const [tab, setTab] = useState("login");
  if (!open) return null;
  const submit = (e) => { e.preventDefault(); onLogin(); };
  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lmodal" role="dialog" aria-modal="true">
        <button className="lmodal__close" onClick={onClose} aria-label="Close"><span className="giv-icon">close</span></button>
        <img className="lmodal__logo" src="assets/logos/givergy-logo-bymomogood.webp" alt="Givergy" />
        <h2>{tab === "login" ? "Welcome back" : "Join the Community"}</h2>
        <p className="lmodal__sub">
          {tab === "login"
            ? "Log in to unlock your account resources, support and campaign tools."
            : "Create your free Givergy account to access member resources and tools."}
        </p>
        <div className="lmodal__sso">
          <button className="sso" onClick={onLogin}><SSOIcon kind="google" /> Google</button>
          <button className="sso" onClick={onLogin}><SSOIcon kind="microsoft" /> Microsoft</button>
          <button className="sso" onClick={onLogin}><SSOIcon kind="facebook" /> Facebook</button>
          <button className="sso" onClick={onLogin}><SSOIcon kind="email" /> Email link</button>
        </div>
        <div className="lmodal__or">or use your email</div>
        <form onSubmit={submit}>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@organisation.org" defaultValue="alex@hopetrust.org" required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" defaultValue="demo1234" required />
          </div>
          <button type="submit" className="btn btn--cyan btn--block btn--lg">{tab === "login" ? "Log In" : "Create Account"}</button>
        </form>
        <p className="lmodal__foot">
          {tab === "login" ? (
            <>New to Givergy? <a onClick={() => setTab("signup")}>Sign up</a></>
          ) : (
            <>Already have an account? <a onClick={() => setTab("login")}>Log in</a></>
          )}
        </p>
      </div>
    </div>
  );
}

// ---- Breadcrumb
function Breadcrumb({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep giv-icon">chevron_right</span>}
          {c.onClick
            ? <a onClick={c.onClick} aria-label={c.label} title={c.label}>{c.icon ? <span className="giv-icon crumbs__ico">{c.icon}</span> : c.label}</a>
            : <span className="current" aria-current="page">{c.icon ? <span className="giv-icon crumbs__ico">{c.icon}</span> : c.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ---- Article reader (full view, swap with back link)
function ArticleReader({ article, onBack, kicker, crumbs }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [article && article.id]);
  if (!article) return null;
  return (
    <article className="reader">
      {crumbs
        ? <Breadcrumb items={crumbs} />
        : (onBack ? <span className="reader__back" onClick={onBack}><span className="giv-icon">arrow_back</span> Back to {kicker || "articles"}</span> : null)}
      <div className={"reader__hero " + article.fill}>
        <span className="thumb-label">{article.cat}</span>
      </div>
      <div className="reader__tag"><span className="tag">{article.cat}</span></div>
      <h1>{article.title}</h1>
      <div className="reader__meta">
        <span className="reader__avatar" style={{ background: avatarColor(article.author) }}>
          {article.author.split(" ").map(w => w[0]).slice(0, 2).join("")}
        </span>
        <span style={{ fontWeight: 700, color: "var(--giv-grey-100)" }}>{article.author}</span>
        <span className="dot"></span><span>{article.read} read</span>
        <span className="dot"></span><span>Updated Jun 2026</span>
      </div>
      <div className="reader__body">
        {article.body.map((b, i) => {
          if (b.type === "h") return <h2 key={i}>{b.text}</h2>;
          if (b.type === "list") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
          if (b.type === "callout") return (
            <div className="reader__callout" key={i}><span className="giv-icon">lightbulb</span><div>{b.text}</div></div>
          );
          return <p key={i}>{b.text}</p>;
        })}
      </div>
    </article>
  );
}

// ---- Tool action modals (support ticket / book / account / create) — mocked
function ToolModal({ tool, member, onClose, onToast }) {
  if (!tool) return null;
  const submit = (e, msg) => { e.preventDefault(); onClose(); onToast(msg); };
  let title, sub, content;
  if (tool === "ticket") {
    title = "Submit a Support Ticket"; sub = "Tell us what's happening and we'll get back to you by email.";
    content = (
      <form onSubmit={(e) => submit(e, "Support ticket submitted — we'll be in touch shortly.")}>
        <div className="field"><label>Subject</label><input placeholder="Briefly describe your issue" required /></div>
        <div className="field"><label>Category</label>
          <select defaultValue="auctions"><option value="auctions">Auctions</option><option value="payments">Payments &amp; payouts</option><option value="guests">Guests &amp; check-in</option><option value="website">Fundraising website</option><option value="other">Something else</option></select>
        </div>
        <div className="field"><label>Details</label><textarea placeholder="Include campaign name, what you expected, and what happened." required></textarea></div>
        <button className="btn btn--cyan btn--block btn--lg" type="submit">Submit Ticket</button>
      </form>
    );
  } else if (tool === "book") {
    title = "Book Staff or Equipment"; sub = "Reserve on-site support for your next event. We'll confirm availability.";
    content = (
      <form onSubmit={(e) => submit(e, "Booking request sent — our events team will confirm availability.")}>
        <div className="field"><label>What do you need?</label>
          <select defaultValue="devices"><option value="devices">Bid devices &amp; tablets</option><option value="staff">On-site event staff</option><option value="screens">Display screens</option><option value="full">Full managed service</option></select>
        </div>
        <div className="field"><label>Event date</label><input type="date" required /></div>
        <div className="field"><label>Expected guests</label><input type="number" placeholder="e.g. 200" min="1" /></div>
        <button className="btn btn--cyan btn--block btn--lg" type="submit">Request Booking</button>
      </form>
    );
  } else if (tool === "account") {
    title = "Account Details"; sub = "Manage your profile and organisation.";
    content = (
      <form onSubmit={(e) => submit(e, "Account details saved.")}>
        <div className="field"><label>Full name</label><input defaultValue={member.name} /></div>
        <div className="field"><label>Organisation</label><input defaultValue={member.org} /></div>
        <div className="field"><label>Role</label><input defaultValue={member.role} /></div>
        <div className="field"><label>Email</label><input type="email" defaultValue={member.email} /></div>
        <button className="btn btn--cyan btn--block btn--lg" type="submit">Save Changes</button>
      </form>
    );
  } else if (tool === "create") {
    title = "Create a Campaign"; sub = "Set up the essentials — you can fine-tune everything in the CMS.";
    content = (
      <form onSubmit={(e) => submit(e, "Campaign created — opening it in the CMS.")}>
        <div className="field"><label>Campaign name</label><input placeholder="e.g. Autumn Gala 2026" required /></div>
        <div className="field"><label>Campaign type</label>
          <select defaultValue="gala"><option value="gala">Gala / Event</option><option value="auction">Online auction</option><option value="appeal">Donation appeal</option><option value="draw">Prize draw</option></select>
        </div>
        <div className="field"><label>Event date</label><input type="date" /></div>
        <button className="btn btn--cyan btn--block btn--lg" type="submit">Create Campaign</button>
      </form>
    );
  }
  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lmodal" role="dialog" aria-modal="true">
        <button className="lmodal__close" onClick={onClose} aria-label="Close"><span className="giv-icon">close</span></button>
        <h2 style={{ marginTop: 4 }}>{title}</h2>
        <p className="lmodal__sub">{sub}</p>
        {content}
      </div>
    </div>
  );
}

// ---- Toast
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast-host"><div className="ctoast"><span className="giv-icon">check_circle</span>{msg}</div></div>
  );
}
function useToast() {
  const [msg, setMsg] = useState("");
  const timer = useRef(null);
  const show = (m) => { setMsg(m); clearTimeout(timer.current); timer.current = setTimeout(() => setMsg(""), 3200); };
  return [msg, show];
}

// ---- Footer
function Footer() {
  return (
    <footer className="foot">
      <div className="foot__inner">
        <div className="foot__top">
          <div>
            <img className="foot__logo" src="assets/logos/givergy-logo-bymomogood-white.svg" alt="Givergy" />
            <p className="foot__blurb">The Givergy Community — help, inspiration and tools for fundraisers raising more for the causes that matter.</p>
            <div className="foot__social">
              <a title="LinkedIn"><span className="giv-icon">public</span></a>
              <a title="Instagram"><span className="giv-icon">photo_camera</span></a>
              <a title="Podcast"><span className="giv-icon">podcasts</span></a>
            </div>
          </div>
          <div className="foot__col">
            <h5>Learn</h5>
            <a>How-To Guides</a><a>Fundraising Advice</a><a>Podcast</a><a>Webinars</a><a>Product Updates</a>
          </div>
          <div className="foot__col">
            <h5>Givergy</h5>
            <a>About</a><a>Contact</a><a>Help Centre</a><a>Status</a>
          </div>
        </div>
        <div className="foot__bottom">
          <span>© 2026 Givergy. A momoGood company. All rights reserved.</span>
          <span style={{ display: "flex", gap: 20 }}><a>Privacy</a><a>Terms</a><a>Cookies</a></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LoginModal, ArticleReader, ToolModal, Toast, useToast, Footer, avatarColor, Breadcrumb });
