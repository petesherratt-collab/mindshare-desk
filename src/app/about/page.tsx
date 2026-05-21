import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pete Sherratt",
  description: "Multimodal builder tinkerer thinker writer dreamer and occasional lunatic.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-mono px-6 py-16 max-w-2xl mx-auto">
      <a href="/" className="inline-block text-zinc-600 hover:text-zinc-400 text-sm transition-colors mb-16">
        ← back to the desk
      </a>

      <div className="flex flex-col sm:flex-row gap-10 items-start">
        <div className="flex-shrink-0">
          <Image
            src="/pete.png"
            alt="Pete Sherratt"
            width={160}
            height={160}
            className="object-cover border-4 border-zinc-800"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl text-zinc-100 tracking-tight">Pete Sherratt</h1>
            <p className="text-zinc-500 text-sm mt-1">London</p>
          </div>

          <p className="text-zinc-300 leading-relaxed">
            Multimodal builder tinkerer thinker writer dreamer and occasional lunatic.
          </p>

          <div className="space-y-2 text-sm text-zinc-500">
            <p>
              <a href="https://themindshareadvisory.substack.com/" target="_blank" rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors">
                Mindshare Advisory →
              </a>
            </p>
            <p>
              <a href="https://the-salon-ten.vercel.app" target="_blank" rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors">
                The Salon →
              </a>
            </p>
            <p>
              <a href="https://distributed-ethics-site2.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors">
                Distributed Ethics →
              </a>
            </p>
            <p>
              <a href="/papers" className="hover:text-zinc-300 transition-colors">
                The Papers →
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
