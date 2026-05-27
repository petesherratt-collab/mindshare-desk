import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Practice",
  description: "Selected work and working method from Mindshare Desk.",
};

type PracticeItem = {
  title: string;
  label: string;
  description: string;
  status: string;
  href?: string;
};

const items: PracticeItem[] = [
  {
    title: "Distributed Ethics",
    label: "governance framework",
    description:
      "A verifiable accountability architecture for AI systems: hashed protocols, public-chain publication, deployment records, and audit trails designed to make institutional claims testable.",
    status: "Working paper, demo stack, verifier, Sentinel model",
    href: "https://distributed-ethics-site2.vercel.app/",
  },
  {
    title: "Persona Systems",
    label: "editorial instruments",
    description:
      "Historical and fictional personas built from structured factsheets, system prompts, house rules, and repeatable editorial workflows rather than one-off prompting tricks.",
    status: "The Salon, advisory voices, prompt/factsheet method",
    href: "https://the-salon-ten.vercel.app",
  },
  {
    title: "Mindshare Advisory",
    label: "public commentary",
    description:
      "The daily front of the persona work: commentary, essays, and experiments in using AI-assisted editorial systems to read the present through deliberately shaped voices.",
    status: "Live Substack publication",
    href: "https://themindshareadvisory.substack.com/",
  },
  {
    title: "Iron Meridian",
    label: "pulp publishing system",
    description:
      "A 1947-set magazine world with recurring writer personas, editorial framing, and a print/digital publishing pipeline built around genre discipline and continuity.",
    status: "Kindle edition live, wider vault/storefront in progress",
    href: "https://www.amazon.co.uk/dp/B0GX2VM2QT?binding=kindle_edition&qid=1779790111&sr=8-10&ref=dbs_dp_rwt_sb_pc_tkin",
  },
  {
    title: "Interactive Rooms",
    label: "web prototypes",
    description:
      "The desk, detective office, AI receptionist, and other object-led interfaces: small working environments where publications, agents, and experiments become navigable surfaces.",
    status: "Live on Mindshare Desk",
  },
];

const principles = [
  "More data, same analytical instrument.",
  "Personas are editorial design, not costume changes.",
  "Systems should leave a trace a reader can inspect.",
  "The interface should feel like a place, not a menu.",
];

export default function Practice() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-mono px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="inline-block text-zinc-600 hover:text-zinc-400 text-sm transition-colors mb-14">
          ← back to the desk
        </a>

        <header className="mb-14 max-w-3xl">
          <p className="text-cyan-400 text-xs uppercase font-bold mb-3">Selected work and method</p>
          <h1 className="text-3xl sm:text-4xl text-zinc-100 tracking-tight mb-5">The Practice</h1>
          <p className="text-zinc-400 leading-7">
            A working map of the systems, publications, and editorial machinery on the desk. Not a portfolio in the agency sense: a record of what is being built, tested, published, and sharpened.
          </p>
        </header>

        <section className="grid gap-5 mb-14">
          {items.map((item) => (
            <article key={item.title} className="border-l border-zinc-700 pl-5 py-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-zinc-100 text-lg">{item.title}</h2>
                <p className="text-zinc-600 text-xs uppercase">{item.label}</p>
              </div>
              <p className="text-zinc-400 leading-7 mt-3">{item.description}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-zinc-500 text-sm">{item.status}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-200 text-sm transition-colors"
                  >
                    Open →
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="border-t border-zinc-800 pt-8">
          <h2 className="text-zinc-100 text-lg mb-5">Working Principles</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-400">
                {principle}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
