// =====================================================================
// data.jsx — placeholder content for the Givergy Community hub
// All content is mock/demo material for the prototype.
// =====================================================================

// reusable article body blocks
const _body = (lead, sections) => [{ type: "p", text: lead }, ...sections];

const GUIDES = [
  {
    id: "g1", title: "Setting Up Your First Silent Auction", cat: "Auctions",
    read: "6 min", fill: "fill-cyan", icon: "gavel",
    author: "Givergy Team",
    excerpt: "A step-by-step walkthrough for configuring lots, bidding rules and a closing time that builds momentum.",
    body: _body(
      "A silent auction is one of the most reliable ways to turn a captive audience into committed bidders. This guide walks through the core setup inside your campaign so you can launch with confidence.",
      [
        { type: "h", text: "1. Add your lots" },
        { type: "p", text: "Start in Auction Items and create a lot for each prize. Give every lot a clear photo, an honest description and a starting bid that leaves room for competition without scaring people off." },
        { type: "h", text: "2. Set your bidding rules" },
        { type: "p", text: "Decide on bid increments and whether you want to enable proxy (maximum) bidding. Smaller increments keep more people in the race; proxy bidding rewards your most committed supporters." },
        { type: "callout", text: "Tip: stagger your closing times by category. A single hard close creates a frantic last minute — a staggered close keeps bidders engaged for longer." },
        { type: "h", text: "3. Preview before you publish" },
        { type: "p", text: "Use System Preview to see exactly what bidders will see on the fundraising website. Check on mobile too — the majority of bids come from phones in the room." },
        { type: "list", items: ["Confirm every lot has a photo and starting bid", "Test the bid confirmation flow end to end", "Schedule your open and close times", "Brief your event team on how to help guests bid"] },
      ]
    ),
  },
  {
    id: "g2", title: "Importing and Managing Your Guest List", cat: "Guests",
    read: "5 min", fill: "fill-navy", icon: "groups",
    author: "Givergy Team",
    excerpt: "Bulk-import attendees, assign tables, and keep your guest data clean ahead of check-in.",
    body: _body(
      "Your guest list is the backbone of a smooth event. Getting it right ahead of time means check-in is fast and table plans stay organised.",
      [
        { type: "h", text: "Bulk import" },
        { type: "p", text: "Download the CSV template from Guest List, fill in names, emails and any table groupings, then upload. Givergy validates the file and flags duplicates before anything is committed." },
        { type: "h", text: "Table plans" },
        { type: "p", text: "Drag guests onto tables in Table Plans. You can clone a table layout, rename tables to match your venue, and lock assignments once they're final." },
        { type: "callout", text: "Keep a single source of truth. Make edits in Givergy rather than your spreadsheet so check-in always reflects the latest data." },
      ]
    ),
  },
  {
    id: "g3", title: "Connecting Stripe for Payouts", cat: "Payments",
    read: "4 min", fill: "fill-purple", icon: "account_balance",
    author: "Givergy Team",
    excerpt: "Link your bank account through Stripe Connect so funds reach your cause quickly and securely.",
    body: _body(
      "Givergy uses Stripe Connect to move money raised straight to your organisation's bank account. Setup takes a few minutes.",
      [
        { type: "h", text: "Start the connection" },
        { type: "p", text: "From Payment Collection, choose Set Up Now. You'll be handed to Stripe to verify your organisation and add your bank details." },
        { type: "list", items: ["Have your charity registration details ready", "Add the bank account that should receive payouts", "Nominate a finance contact for receipts"] },
        { type: "callout", text: "Funds are held securely by Stripe and paid out on a rolling schedule once your campaign goes live." },
      ]
    ),
  },
  {
    id: "g4", title: "Building Your Fundraising Website", cat: "Website",
    read: "7 min", fill: "fill-magenta", icon: "language",
    author: "Givergy Team",
    excerpt: "Customise your public page with branding, a compelling story, and the right calls to action.",
    body: _body(
      "Your fundraising website is where supporters discover your cause, browse lots and make donations. A few thoughtful choices make a big difference to conversion.",
      [
        { type: "h", text: "Lead with your story" },
        { type: "p", text: "Open with one clear sentence about the impact a donation makes. Supporters give to outcomes, not logistics." },
        { type: "h", text: "Brand it" },
        { type: "p", text: "Add your logo, a hero image and your colours. Consistency with your event invitations builds trust." },
      ]
    ),
  },
  {
    id: "g5", title: "Running a Live Prize Draw on the Night", cat: "Prize Draws",
    read: "5 min", fill: "fill-teal", icon: "confirmation_number",
    author: "Givergy Team",
    excerpt: "Sell tickets, pick winners fairly, and put the announcement up on your event displays.",
    body: _body(
      "A prize draw adds a burst of energy to any event. Here's how to run one that feels fair and exciting.",
      [
        { type: "h", text: "Sell tickets in advance and in the room" },
        { type: "p", text: "Enable online ticket sales early to build a pot, then keep selling at the event with QR codes on every table." },
        { type: "callout", text: "Use Event Displays to show the prize and a live ticket count on the big screen — it drives last-minute sales." },
      ]
    ),
  },
  {
    id: "g6", title: "Using Event Displays and Screens", cat: "At Event",
    read: "4 min", fill: "fill-cyan", icon: "cast",
    author: "Givergy Team",
    excerpt: "Drive bidding and donations from the big screen with leaderboards and live totals.",
    body: _body(
      "Event Displays turn any screen in the room into a fundraising engine. Show a live total, a leaderboard, or your next lot closing.",
      [
        { type: "h", text: "Pick the right display" },
        { type: "p", text: "Leaderboards create friendly competition; a running total creates momentum toward a goal. You can rotate between them throughout the night." },
      ]
    ),
  },
  {
    id: "g7", title: "Configuring Ticketing and Promo Codes", cat: "Ticketing",
    read: "5 min", fill: "fill-navy", icon: "local_activity",
    author: "Givergy Team",
    excerpt: "Sell tiered tickets, add tables, and offer early-bird or sponsor promo codes.",
    body: _body(
      "Ticketing is often the first thing guests touch. Set it up so buying a seat feels effortless and on-brand.",
      [
        { type: "h", text: "Create your ticket types" },
        { type: "p", text: "Add tiers for individual seats, tables and sponsor packages. Set capacity per tier so you never oversell." },
        { type: "callout", text: "Use promo codes for early-bird pricing and sponsor allocations — you'll see exactly which code drove each sale in Reports." },
      ]
    ),
  },
  {
    id: "g8", title: "Collecting Donations During Your Event", cat: "Donations",
    read: "4 min", fill: "fill-teal", icon: "favorite",
    author: "Givergy Team",
    excerpt: "Set suggested amounts, enable a live appeal moment, and let guests give in seconds.",
    body: _body(
      "A well-run donation moment can be the single biggest line on the night. The setup is simple.",
      [
        { type: "h", text: "Set suggested amounts" },
        { type: "p", text: "Offer a few suggested gift levels tied to outcomes. Most guests pick from what's in front of them." },
      ]
    ),
  },
  {
    id: "g9", title: "Sending Notifications and Receipts", cat: "Notifications",
    read: "3 min", fill: "fill-purple", icon: "mail",
    author: "Givergy Team",
    excerpt: "Keep bidders, winners and donors informed automatically with branded emails.",
    body: _body(
      "Automatic notifications save your team hours and make supporters feel looked after.",
      [
        { type: "h", text: "Outbid and winning alerts" },
        { type: "p", text: "Bidders get nudged the moment they're outbid, and winners receive a clear next step to pay and collect." },
      ]
    ),
  },
];

const ADVICE = [
  {
    id: "a1", title: "How to Set a Fundraising Target You'll Actually Hit", cat: "Strategy",
    read: "8 min", fill: "fill-navy", icon: "target",
    author: "Priya Anand",
    excerpt: "Ambitious but achievable — a practical framework for setting goals your team and donors can rally behind.",
    body: _body(
      "Set the target too low and you leave money on the table; too high and you risk deflating the room. Here's how to find the number that motivates.",
      [
        { type: "h", text: "Start from last year, not from hope" },
        { type: "p", text: "Anchor your goal in real data: last year's result, your guest count, and average gift size. Then stretch by a realistic margin." },
        { type: "callout", text: "Announce a 'stretch goal' once you hit your first target. A second milestone gives the room a reason to keep giving." },
        { type: "h", text: "Make it visible" },
        { type: "p", text: "A live total on screen turns an abstract number into a shared mission. People give more when they can see the finish line." },
      ]
    ),
  },
  {
    id: "a2", title: "Writing Donation Appeals That Convert", cat: "Storytelling",
    read: "6 min", fill: "fill-magenta", icon: "edit_note",
    author: "Marcus Lee",
    excerpt: "The structure behind appeals that move people from interest to action — without guilt-tripping.",
    body: _body(
      "Great appeals are specific, human and hopeful. They make one person's story stand for the whole cause.",
      [
        { type: "h", text: "One person, one moment" },
        { type: "p", text: "Abstract statistics rarely move people. A single, vivid story does. Pair it with a concrete ask: what does £50 actually do?" },
        { type: "list", items: ["Lead with a person, not a problem", "Tie each amount to a tangible outcome", "End with a clear, single call to action"] },
      ]
    ),
  },
  {
    id: "a3", title: "Stewardship: Keeping Donors After the Event", cat: "Retention",
    read: "7 min", fill: "fill-purple", icon: "volunteer_activism",
    author: "Sofia Marsh",
    excerpt: "The gala is over — now the relationship begins. A simple stewardship plan that keeps supporters close.",
    body: _body(
      "The most valuable donor is the one who gives again. Stewardship is how a one-night gift becomes a lifetime of support.",
      [
        { type: "h", text: "Say thank you within 48 hours" },
        { type: "p", text: "Speed signals sincerity. A prompt, personal thank-you sets the tone for everything that follows." },
        { type: "callout", text: "Show impact, not just gratitude. Tell donors exactly what their money achieved — that's what earns the next gift." },
      ]
    ),
  },
  {
    id: "a4", title: "Maximising Corporate Sponsorship", cat: "Partnerships",
    read: "9 min", fill: "fill-cyan", icon: "handshake",
    author: "Daniel Osei",
    excerpt: "Build sponsor packages that deliver real value, so partners come back year after year.",
    body: _body(
      "Sponsors aren't donors — they're partners looking for value. Frame your packages around what they get, not just what you need.",
      [
        { type: "h", text: "Lead with audience, not logos" },
        { type: "p", text: "Sponsors want access to your audience. Quantify it: who attends, how engaged they are, and how the sponsor will be seen." },
      ]
    ),
  },
  {
    id: "a5", title: "The Psychology of Live Bidding", cat: "Auctions",
    read: "6 min", fill: "fill-teal", icon: "psychology",
    author: "Priya Anand",
    excerpt: "Why anchoring, scarcity and social proof drive paddles up — and how to use them ethically.",
    body: _body(
      "Bidding is emotional. Understanding a few principles of behaviour helps you design an auction that feels exciting, not manipulative.",
      [
        { type: "h", text: "Anchor high, then build" },
        { type: "p", text: "Your first lot sets expectations for the whole night. Open with something aspirational to anchor the room's sense of value." },
      ]
    ),
  },
  {
    id: "a6", title: "Planning Your Fundraising Calendar", cat: "Strategy",
    read: "5 min", fill: "fill-navy", icon: "calendar_month",
    author: "Sofia Marsh",
    excerpt: "Map your year so campaigns build on each other instead of competing for the same supporters.",
    body: _body(
      "A scattered calendar exhausts your supporters. A planned one builds rhythm and anticipation.",
      [
        { type: "h", text: "Anchor around your tentpole event" },
        { type: "p", text: "Build the rest of your year around your single biggest moment, with smaller touchpoints leading in and following up." },
      ]
    ),
  },
  {
    id: "a7", title: "Recruiting and Briefing Event Volunteers", cat: "Operations",
    read: "6 min", fill: "fill-teal", icon: "diversity_3",
    author: "Daniel Osei",
    excerpt: "A confident, well-briefed team is invisible on the night — here's how to build one.",
    body: _body(
      "Volunteers make or break the guest experience. Treat their briefing as seriously as your run-of-show.",
      [
        { type: "h", text: "Give everyone one clear job" },
        { type: "p", text: "Assign each volunteer a single, specific role and a person to report to. Clarity beats enthusiasm on a busy night." },
      ]
    ),
  },
  {
    id: "a8", title: "Telling Your Impact Story With Data", cat: "Storytelling",
    read: "7 min", fill: "fill-navy", icon: "insights",
    author: "Marcus Lee",
    excerpt: "Numbers earn trust; stories earn gifts. Here's how to weave the two together.",
    body: _body(
      "Donors want proof their money works — and a reason to feel it. The best appeals do both.",
      [
        { type: "h", text: "Pair every stat with a face" },
        { type: "p", text: "Follow a headline number with one real story it represents. Data sets the scale; the story makes it matter." },
      ]
    ),
  },
  {
    id: "a9", title: "Pricing Auction Lots for Maximum Return", cat: "Auctions",
    read: "5 min", fill: "fill-magenta", icon: "sell",
    author: "Priya Anand",
    excerpt: "Where to set starting bids and reserves so lots stay competitive without stalling.",
    body: _body(
      "Get your opening numbers right and the room does the rest. Set them wrong and even great lots fall flat.",
      [
        { type: "h", text: "Start at 30–40% of value" },
        { type: "p", text: "A low-enough opening invites the first bid; momentum and competition carry it the rest of the way up." },
      ]
    ),
  },
];

// External link-out destinations (stubbed)
const LINKOUTS = [
  { id: "podcast", title: "Fundraising Podcast", icon: "podcasts", fill: "fill-magenta",
    desc: "Candid conversations with fundraising leaders on what's working right now. New episodes every fortnight.",
    cta: "Listen now", href: "https://example.com/givergy-podcast", meta: "24 episodes" },
  { id: "webinars", title: "Fundraising Webinars", icon: "videocam", fill: "fill-cyan",
    desc: "Live and on-demand sessions with the Givergy team and guest experts. Register for what's coming up.",
    cta: "Browse webinars", href: "https://example.com/givergy-webinars", meta: "Live & on-demand" },
  { id: "updates", title: "Product Updates", icon: "rocket_launch", fill: "fill-purple",
    desc: "Every new feature and improvement shipping across the Givergy platform, explained in plain English.",
    cta: "See what's new", href: "https://example.com/givergy-changelog", meta: "Updated weekly" },
];

// Logged-in account tools surfaced inline
const TOOLS = [
  { id: "support", title: "Submit a Support Ticket", icon: "support_agent", tone: "",
    desc: "Stuck on something? Send our team the details and we'll get back to you.", action: "ticket" },
  { id: "book", title: "Book Staff or Equipment", icon: "inventory_2", tone: "magenta",
    desc: "Reserve on-site event staff, bid devices and screens for your next event.", action: "book" },
  { id: "account", title: "Account Details", icon: "manage_accounts", tone: "purple",
    desc: "Manage your profile, organisation and notification preferences.", action: "account" },
  { id: "create", title: "Create a Campaign", icon: "add_circle", tone: "",
    desc: "Spin up a new fundraising campaign and start adding your event details.", action: "create" },
  { id: "manage", title: "Manage Campaigns", icon: "dashboard", tone: "magenta",
    desc: "Jump into the Givergy CMS to run your live and upcoming campaigns.", action: "external",
    href: "https://cms.givergy.com" },
];

// Personalised resources (logged-in "for you")
const FORYOU = [
  { id: "f1", title: "Your Spring Gala 2026 checklist is 60% complete", cat: "Resume setup", icon: "checklist", fill: "fill-navy", kind: "campaign" },
  { id: "f2", title: "Recommended: Running a Live Prize Draw on the Night", cat: "Because you added a prize draw", icon: "auto_awesome", fill: "fill-teal", kind: "guide", ref: "g5" },
  { id: "f3", title: "New webinar: Maximising auction revenue", cat: "Saved for you", icon: "videocam", fill: "fill-cyan", kind: "linkout" },
];

const MEMBER = { name: "Alex Rivera", org: "Hope Children's Trust", initials: "AR", role: "Campaign Manager", email: "alex@hopetrust.org" };

Object.assign(window, { GUIDES, ADVICE, LINKOUTS, TOOLS, FORYOU, MEMBER });
