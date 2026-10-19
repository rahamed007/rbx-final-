"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HorizontalRail from "./HorizontalRail";
import MedalCard, { type MedalCardData } from "./MedalCard";
import MedalModal from "./MedalModal";

/** Horizontal medal rail with the holographic detail modal. */
export default function MedalShowcase({ medals }: { medals: MedalCardData[] }) {
  const [selected, setSelected] = useState<MedalCardData | null>(null);
  return (
    <>
      <HorizontalRail>
        {medals.map((medal, i) => (
          <div key={medal.id} className="w-[80vw] shrink-0 sm:w-[340px]">
            <MedalCard medal={medal} index={i} onOpen={setSelected} />
          </div>
        ))}
      </HorizontalRail>
      <AnimatePresence>{selected && <MedalModal medal={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
}
