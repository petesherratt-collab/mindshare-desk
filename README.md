Mindshare Desk
The personal website of Peter Sherratt — writer, persona architect, builder of AI-augmented publications, and author of the Distributed Ethics framework.
Live site → mindshare-desk.vercel.app

About
This is my desk. Everything I write, build and publish lands here first or eventually.
I work at the seam between AI tooling and editorial craft — building publications, personas and frameworks that take what large language models can now do and put it to a clear editorial purpose. The work spans governance, fiction, satire, political philosophy and design.
The site is built around the image of a working desk: papers, sculpture, practice. Each surface is a way in to a different piece of work.

Distributed Ethics
The work I expect to outlast everything else here.
Distributed Ethics is a governance framework that uses cryptographic hashing and blockchain publication to make the standards an AI system is supposed to meet a matter of public, tamper-evident record. At the time of any incident, the gap between what an organisation claimed its AI was governed by and what it was actually doing becomes provable — or disprovable — without relying on the organisation's own records.
The framework has a three-tier accountability architecture: issuing authority (who set the protocol), deploying organisation (who runs the AI), and agent layer (the AI and its monitoring Sentinel). Each tier hashes its governing documents, publishes those hashes to a public chain, and chains daily session summaries into Merkle batches. Audit becomes a function of arithmetic rather than trust.
What exists today:

The working paper, five revisions, on SSRN — Abstract ID 6719078
A one-page executive summary for policy and research audiences
The Psychologist Sentinel deployment stack — a clinical safeguarding worked example using C-SSRS, HEEADSSS and PHQ-A frameworks, with a four-document Claude Project: protocol, knowledge base, session summary schema, and Sentinel persona
An interactive demo interface (single self-contained HTML file) walking through a five-session transcript and the Sentinel's intervention at Session 9
A Solidity smart contract registering protocols, deployments and Sentinel agent identities — verify() is read-only and gas-free, so independent verification requires no permission and no payment
A Python CLI verifier any deploying organisation can run from the command line
A demonstration transcript, hash chain table, and suppression-attack addendum

Targeted institutional readership: DSIT (AI Safety Institute), the Ada Lovelace Institute, parliamentary committee staff, and select frontier-lab policy teams. Also of interest to D&O and cyber liability underwriters thinking about verifiable governance as a material risk factor.
If Distributed Ethics is the only thing you read from this desk, that is the right choice.

The publications
The Salon
A parliament of twenty-odd historical thinkers convened nightly to judge contemporary questions. Machiavelli, Hobbes, Wollstonecraft, Keynes, Adam Smith and others. Each Judgement is auto-generated overnight in four movements: Framing · Reframe · Verdict · Maxim.
→ the-salon-ten.vercel.app
Mindshare Advisory — Substack
The daily front of the persona work. A daily post drawing on the Salon's persona roster to comment on current events, paired with a weekly long-form essay by AI William Blake — visions, prophecy, and Blake's analytic instrument turned on the present.
→ themindshareadvisory.substack.com
The Cold Eye
A satirical journal with a recurring ensemble cast — Clive, Sir Horace Bloodworth, Dr Maud Fenwick, The Colonel, Pip, Celestine and others. Voltaire-meets-Twain register, kept sharp.
Iron Meridian
A 1947-set pulp fiction magazine with nineteen writer personas, a Walt Greer editorial pipeline, and a subscriber-exclusive vault site gated by QR codes. Print-ready layout in Canva for Issue 1, migrating to Affinity Publisher from Issue 2. Digital-only via KDP, primary storefront on Gumroad.

The practice
The methodology underneath everything: paired research factsheets and system prompts that treat AI personas as an editorial design problem rather than a prompting problem. The Persona Foundry — a thirty-parameter writer-persona generator — underpins persona creation across the projects.
Working principle: more data, same analytical instrument. A historical thinker reads the present with full contemporary knowledge but with their formation-period framework intact. Hobbes can read a tweet. He still reads it as a Hobbesian.

The novel
Brass Neck — speculative fiction in background development. A privateer protagonist, an AI antagonist (Varney) suffering a narrative delusion, and a fully built world waiting for its time.

Who I am
Peter Sherratt. UK-based. Independent creator and media strategist. I build things that didn't exist a year ago because the tooling didn't exist a year ago — but the editorial sensibility behind them is older than that.

How the site is built
LayerChoiceFrameworkNext.js (App Router)LanguageTypeScriptStylingTailwind CSSHostingVercelBuild assistantClaude Code
Conventions for AI-assisted edits live in AGENTS.md. CLAUDE.md is a pointer to that file.
Local development
bashnpm install
npm run dev
Open http://localhost:3000 to see the desk locally.
bashnpm run dev      # dev server with hot reload
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint

Get in touch
Open an issue here, find me on Substack, or through any of the publications linked above. For Distributed Ethics enquiries — particularly from policy, research or insurance audiences — the SSRN paper carries my contact details, and a one-page executive summary is available on request.

Licence
Code: MIT (see LICENSE).
Editorial content linked from the Desk — the Judgements, the Substack posts, the Iron Meridian stories, the Distributed Ethics paper and supporting materials, the persona writing — is published as-is and not licensed for redistribution. Persona system prompts, factsheets, the Distributed Ethics framework and its reference implementation remain my own work.

Peter Sherratt — Mindshare Advisory.
