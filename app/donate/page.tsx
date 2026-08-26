import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { DonateStage } from "./DonateStage";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Donate to National Association for the Blind, State Chapter, Lucknow. Choose a cause and support our work with visually impaired individuals.",
};

export default function DonatePage() {
  return (
    <main>
      <StagePager stages={[<DonateStage key="donate" />]} />
    </main>
  );
}
