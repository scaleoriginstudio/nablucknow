import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { GlassBackdrop } from "../components/shared/GlassFormShell";
import { DonateStage } from "./DonateStage";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Donate to National Association for the Blind, State Chapter, Lucknow. Choose a cause and support our work with visually impaired individuals.",
};

export default function DonatePage() {
  return (
    <main>
      <StagePager
        background={<GlassBackdrop image="/img/nab/cover-page.jpg" priority />}
        stages={[<DonateStage key="donate" />]}
      />
    </main>
  );
}
