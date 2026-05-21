import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Papers",
  description: "Fragments, discards, and work in progress.",
};

const items: { label: string; href?: string; note?: string }[] = [
  // Add entries here — { label: "Name", href: "https://...", note: "optional description" }
];

export default function Papers() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-mono px-6 py-16 max-w-2xl mx-auto">
      <a href="/" className="inline-block text-zinc-600 hover:text-zinc-400 text-sm transition-colors mb-12">
        ← back to the desk
      </a>

      <header className="mb-12">
        <h1 className="text-2xl text-zinc-100 tracking-tight mb-2">The Papers</h1>
        <p className="text-zinc-500 text-sm">
          Fragments, discards, system prompts, skills, and whatever else doesn&apos;t fit elsewhere.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-zinc-600 text-sm italic">Nothing filed yet.</p>
      ) : (
        <ul className="space-y-6">
          {items.map((item, i) => (
            <li key={i} className="border-l border-zinc-700 pl-4">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-zinc-200">{item.label}</span>
              )}
              {item.note && (
                <p className="text-zinc-500 text-sm mt-1">{item.note}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
