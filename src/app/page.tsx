"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Hotspot = ({
  top, left, width, height, label, onClick, glow = "cyan",
}: {
  top: string; left: string; width: string; height: string;
  label: string; onClick: () => void; glow?: "cyan" | "amber";
}) => {
  const glowStyle =
    glow === "amber"
      ? "hover:border-amber-400 hover:shadow-[0_0_15px_#f59e0b]"
      : "hover:border-cyan-400 hover:shadow-[0_0_15px_cyan]";
  return (
    <motion.div
      className={`absolute cursor-pointer group border-2 border-transparent ${glowStyle} transition-all duration-300`}
      style={{ top, left, width, height }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900/95 text-zinc-300 font-mono text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </div>
    </motion.div>
  );
};

export default function Desk() {
  const [viewMode, setViewMode] = useState('consultancy');
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0 }}
      >
        <main className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden font-mono">
          {viewMode === 'consultancy' ? (
            <div className="relative w-full max-w-[1920px] aspect-[16/9]">
              <Image src="/office_papers3.png" alt="Desk" fill className="object-cover" priority />

              {/* The Cold Eye — framed newspaper, left wall */}
              <Hotspot top="0%"  left="0%"  width="18%" height="51%" label="The Cold Eye"          onClick={() => {}} />

              {/* Wall portraits */}
              <Hotspot top="10%" left="28%" width="10%" height="20%" label="Jack London"           onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#london', '_blank')} />
              <Hotspot top="10%" left="39%" width="10%" height="20%" label="Niccolò Machiavelli"   onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#machiavelli', '_blank')} />
              <Hotspot top="10%" left="50%" width="10%" height="20%" label="Thomas Hobbes"          onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#hobbes', '_blank')} />
              <Hotspot top="10%" left="61%" width="10%" height="20%" label="Michel de Montaigne"    onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#montaigne', '_blank')} />

              {/* Screen — Distributed Ethics diagram */}
              <Hotspot top="22%" left="36%" width="28%" height="34%" label="Distributed Ethics"    onClick={() => window.open('https://distributed-ethics-site2.vercel.app/', '_blank')} />

              {/* Dodecahedron sculpture */}
              <Hotspot top="40%" left="23%" width="15%" height="24%" label="The Sculpture"         onClick={() => {}} />

              {/* Paperweight & papers */}
              <Hotspot top="51%" left="3%"  width="13%" height="18%" label="The Papers"            onClick={() => router.push('/papers')} />

              {/* Mindshare Advisory card */}
              <Hotspot top="51%" left="17%" width="13%" height="9%"  label="Mindshare Advisory"    onClick={() => window.open('https://themindshareadvisory.substack.com/', '_blank')} />

              {/* Pete Sherratt — framed photo, right of desk */}
              <Hotspot top="33%" left="73%" width="20%" height="27%" label="Pete Sherratt"         onClick={() => router.push('/about')} />

              {/* Persona cards — spread across centre desk */}
              <Hotspot top="66%" left="30%" width="36%" height="25%" label="The Salon"             onClick={() => window.open('https://the-salon-ten.vercel.app', '_blank')} />

              {/* Iron Meridian — right stack */}
              <Hotspot top="58%" left="66%" width="27%" height="16%" label="Iron Meridian"         onClick={() => {}} />

              {/* The Practice book — bottom right */}
              <Hotspot top="69%" left="62%" width="30%" height="16%" label="The Practice"          onClick={() => {}} />

              {/* Iron Meridian magazine pile — enters the detective office */}
              <Hotspot top="68%" left="5%"  width="24%" height="23%" label="Iron Meridian"         onClick={() => setViewMode('private-eye')} />
            </div>
          ) : (
            /* ── Private Eye Office ─────────────────────────────── */
            <div className="relative w-full max-w-[1920px] aspect-[16/9]">
              <Image src="/private-eye-office.png" alt="A. Cade — Private Investigations" fill className="object-cover" priority unoptimized />

              {/* Door — frosted glass panel, full left column */}
              <Hotspot glow="amber" top="0%"  left="0%"  width="28%" height="100%" label="← Leave"                   onClick={() => setViewMode('consultancy')} />

              {/* The Salon neon sign — vertical sign, far left of window */}
              <Hotspot glow="amber" top="8%"  left="43%" width="6%"  height="14%"  label="The Salon"                  onClick={() => window.open('https://the-salon-ten.vercel.app', '_blank')} />

              {/* Green banker's lamp — shade + neck + base */}
              <Hotspot glow="amber" top="29%" left="29%" width="14%" height="32%"  label="The Lamp"                   onClick={() => {}} />

              {/* Rotary telephone — black phone, left of typewriter */}
              <Hotspot glow="amber" top="46%" left="35%" width="12%" height="20%"  label="Contact"                    onClick={() => {}} />

              {/* Typewriter — centre desk */}
              <Hotspot glow="amber" top="40%" left="45%" width="16%" height="28%"  label="The Typewriter"             onClick={() => {}} />

              {/* Iron Meridian — case files, newspaper & confidential folders */}
              <Hotspot glow="amber" top="57%" left="52%" width="31%" height="31%"  label="Iron Meridian — Case Files" onClick={() => {}} />

              {/* A. Cade — the detective figure */}
              <Hotspot glow="amber" top="10%" left="67%" width="16%" height="77%"  label="A. Cade"                    onClick={() => router.push('/detective')} />

              {/* Iron Meridian collector's editions — right shelf */}
              <Hotspot glow="amber" top="29%" left="83%" width="10%" height="34%"  label="Iron Meridian"              onClick={() => {}} />

              {/* Jim Beam — bourbon bottle & glass */}
              <Hotspot glow="amber" top="48%" left="86%" width="6%"  height="27%"  label="Jim Beam"                   onClick={() => {}} />
            </div>
          )}
        </main>
      </motion.div>
    </AnimatePresence>
  );
}