import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { GlassBackdrop } from "../components/shared/GlassFormShell";
import { VolunteerStage } from "./VolunteerStage";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer with National Association for the Blind, State Chapter, Lucknow. Tell us how you'd like to help and we'll match you with a programme.",
};

export default function VolunteerPage() {
  return (
    <main>
      <StagePager
        background={<GlassBackdrop image="/img/nab/dance.jpg" priority />}
        stages={[<VolunteerStage key="volunteer" />]}
      />
    </main>
  );
}
