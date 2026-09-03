import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { ProgramsView } from "./ProgramsView";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Fundraising talks, performances, and experiential events for corporate and school groups, run by National Association for the Blind, State Chapter, Lucknow.",
};

export default function ProgramsPage() {
  return (
    <main>
      <StagePager stages={[<ProgramsView key="programs" />]} />
    </main>
  );
}
