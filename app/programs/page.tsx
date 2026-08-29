import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { GlassBackdrop } from "../components/shared/GlassFormShell";
import { ProgramStage } from "./ProgramStage";
import { PROGRAMS } from "./programs-data";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Fundraising talks, performances, and experiential events for corporate and school groups, run by National Association for the Blind, State Chapter, Lucknow.",
};

export default function ProgramsPage() {
  return (
    <main>
      <StagePager
        background={<GlassBackdrop image="/img/placeholders/talk-inclusion.jpg" priority />}
        stages={PROGRAMS.map((program, i) => (
          <ProgramStage key={program.slug} program={program} reverse={i % 2 === 1} />
        ))}
      />
    </main>
  );
}
