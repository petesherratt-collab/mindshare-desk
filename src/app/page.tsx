"use client";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ironMeridianAmazonUrl = "https://www.amazon.co.uk/dp/B0GX2VM2QT?binding=kindle_edition&qid=1779790111&sr=8-10&ref=dbs_dp_rwt_sb_pc_tkin";

const Hotspot = ({
  top, left, width, height, label, onClick, glow = "cyan", debug = false,
}: {
  top: string; left: string; width: string; height: string;
  label: string; onClick: () => void; glow?: "cyan" | "amber"; debug?: boolean;
}) => {
  const glowStyle =
    glow === "amber"
      ? "hover:border-amber-400 hover:shadow-[0_0_15px_#f59e0b]"
      : "hover:border-cyan-400 hover:shadow-[0_0_15px_cyan]";
  const debugStyle = debug
    ? glow === "amber"
      ? "border-amber-400/80 bg-amber-400/10"
      : "border-cyan-400/80 bg-cyan-400/10"
    : "border-transparent";

  return (
    <motion.div
      className={`absolute cursor-pointer group border-2 ${debugStyle} ${glowStyle} transition-all duration-300`}
      style={{ top, left, width, height }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={(event) => {
        if (debug) {
          event.stopPropagation();
          return;
        }
        onClick();
      }}
    >
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900/95 text-zinc-300 font-mono text-xs px-2 py-1 transition-opacity whitespace-nowrap ${debug ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {label}
      </div>
      {debug && (
        <div className="absolute bottom-1 left-1 bg-black/80 text-white text-[10px] px-1.5 py-1 leading-tight">
          {top} / {left}<br />{width} x {height}
        </div>
      )}
    </motion.div>
  );
};
export default function Desk() {
  const [viewMode, setViewMode] = useState('consultancy');
  const [debugHotspots] = useState(() =>
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has('hotspots')
  );
  const [pointer, setPointer] = useState<string | null>(null);
  const router = useRouter();

  function capturePointer(event: MouseEvent<HTMLDivElement>) {
    if (!debugHotspots) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const left = (((event.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const top = (((event.clientY - rect.top) / rect.height) * 100).toFixed(1);
    setPointer(`top ${top}% / left ${left}%`);
  }

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
          {debugHotspots && (
            <div className="fixed left-4 top-4 z-50 rounded bg-black/90 border border-cyan-500/70 px-3 py-2 text-xs text-cyan-100 shadow-xl">
              <div className="font-bold text-cyan-300">Hotspot calibration</div>
              <div>Click the image for coordinates.</div>
              <div>{pointer || "Waiting for click..."}</div>
              <div className="mt-1 text-zinc-400">Use: ?hotspots=1</div>
            </div>
          )}
          {viewMode === 'consultancy' ? (
            <div className="relative w-full max-w-[1920px] aspect-[16/9]" onClick={capturePointer}>
              <Image src="/office_papers3.png" alt="Desk" fill className="object-cover" priority />

              {/* The Cold Eye - framed newspaper, left wall */}
              <Hotspot debug={debugHotspots} top="7.65%" left="5.7%" width="12.6%" height="35.7%" label="The Cold Eye"          onClick={() => {}} />

              {/* Wall portraits */}
              <Hotspot debug={debugHotspots} top="12.9%" left="30.15%" width="7.7%" height="16.2%" label="Jack London"           onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#london', '_blank')} />
              <Hotspot debug={debugHotspots} top="12.9%" left="40.95%" width="7.7%" height="16.2%" label="Niccolò Machiavelli"   onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#machiavelli', '_blank')} />
              <Hotspot debug={debugHotspots} top="12.9%" left="51.15%" width="7.7%" height="16.2%" label="Thomas Hobbes"          onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#hobbes', '_blank')} />
              <Hotspot debug={debugHotspots} top="12.9%" left="61.75%" width="7.7%" height="16.2%" label="Michel de Montaigne"    onClick={() => window.open('https://the-salon-ten.vercel.app/index.html#montaigne', '_blank')} />

              {/* Screen - Distributed Ethics diagram */}
              <Hotspot debug={debugHotspots} top="26.9%" left="36.7%" width="28%" height="31.6%" label="Distributed Ethics"    onClick={() => window.open('https://distributed-ethics-site2.vercel.app/', '_blank')} />

              {/* Dodecahedron sculpture */}
              <Hotspot debug={debugHotspots} top="43.6%" left="25.25%" width="10.5%" height="16.8%" label="AI Receptionist"       onClick={() => router.push('/receptionist')} />

              {/* Paperweight & papers */}
              <Hotspot debug={debugHotspots} top="52.31%" left="6.94%" width="11.12%" height="15.39%" label="The Papers"            onClick={() => router.push('/papers')} />

              {/* Mindshare Advisory card */}
              <Hotspot debug={debugHotspots} top="57%" left="16.95%" width="9.1%" height="9%"  label="Mindshare Advisory"    onClick={() => window.open('https://themindshareadvisory.substack.com/', '_blank')} />

              {/* Pete Sherratt - framed photo, right of desk */}
              <Hotspot debug={debugHotspots} top="46.75%" left="75.75%" width="8.5%" height="13.5%" label="Pete Sherratt"         onClick={() => router.push('/about')} />

              {/* Persona cards - spread across centre desk */}
              <Hotspot debug={debugHotspots} top="68.5%" left="33.6%" width="28.8%" height="20%" label="The Salon"             onClick={() => window.open('https://the-salon-ten.vercel.app', '_blank')} />

              {/* Iron Meridian - right stack */}
              <Hotspot debug={debugHotspots} top="58%" left="68.7%" width="21.6%" height="16%" label="Iron Meridian"         onClick={() => window.open(ironMeridianAmazonUrl, '_blank')} />

              {/* The Practice book - bottom right */}
              <Hotspot debug={debugHotspots} top="79%" left="65%" width="24%" height="16%" label="The Practice"          onClick={() => router.push('/practice')} />

              {/* Iron Meridian magazine pile - enters the detective office */}
              <Hotspot debug={debugHotspots} top="68%" left="5%"  width="24%" height="23%" label="Iron Meridian"         onClick={() => setViewMode('private-eye')} />
            </div>
          ) : (
            <div className="relative w-full max-w-[1920px] aspect-[16/9]" onClick={capturePointer}>
              <Image src="/private-eye-office.png" alt="A. Cade - Private Investigations" fill className="object-cover" priority unoptimized />

              {/* Door - frosted glass panel, full left column */}
              <Hotspot debug={debugHotspots} glow="amber" top="0%"  left="0%"  width="28%" height="100%" label="← Leave"                   onClick={() => setViewMode('consultancy')} />

              {/* The Salon neon sign - vertical sign, far left of window */}
              <Hotspot debug={debugHotspots} glow="amber" top="8%"  left="43%" width="6%"  height="14%"  label="The Salon"                  onClick={() => window.open('https://the-salon-ten.vercel.app', '_blank')} />

              {/* Green banker's lamp - shade + neck + base */}
              <Hotspot debug={debugHotspots} glow="amber" top="29%" left="29%" width="14%" height="32%"  label="The Lamp"                   onClick={() => {}} />

              {/* Rotary telephone - black phone, left of typewriter */}
              <Hotspot debug={debugHotspots} glow="amber" top="46%" left="35%" width="12%" height="20%"  label="Reception"                 onClick={() => router.push('/receptionist')} />

              {/* Typewriter - centre desk */}
              <Hotspot debug={debugHotspots} glow="amber" top="40%" left="45%" width="16%" height="28%"  label="The Typewriter"             onClick={() => {}} />

              {/* Iron Meridian - case files, newspaper & confidential folders */}
              <Hotspot debug={debugHotspots} glow="amber" top="57%" left="52%" width="31%" height="31%"  label="Iron Meridian - Case Files" onClick={() => window.open(ironMeridianAmazonUrl, '_blank')} />

              {/* A. Cade - the detective figure */}
              <Hotspot debug={debugHotspots} glow="amber" top="10%" left="67%" width="16%" height="77%"  label="A. Cade"                    onClick={() => router.push('/detective')} />

              {/* Iron Meridian collector's editions - right shelf */}
              <Hotspot debug={debugHotspots} glow="amber" top="29%" left="83%" width="10%" height="34%"  label="Iron Meridian"              onClick={() => window.open(ironMeridianAmazonUrl, '_blank')} />

              {/* Jim Beam - bourbon bottle & glass */}
              <Hotspot debug={debugHotspots} glow="amber" top="48%" left="86%" width="6%"  height="27%"  label="Jim Beam"                   onClick={() => {}} />
            </div>
          )}
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
