import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { CsrWhyStage, CsrWhereStage, CsrHowStage, CsrStartStage } from "./CsrStages";

export const metadata: Metadata = {
  title: "CSR Partnerships",
  description:
    "Partner with National Association for the Blind, State Chapter, Lucknow on CSR: inclusive schools and vocational training for visually impaired people, aligned with Schedule VII of the Companies Act, 2013.",
};

export default function CsrPage() {
  return (
    <main>
      <StagePager
        stages={[
          <CsrWhyStage key="why" />,
          <CsrWhereStage key="where" />,
          <CsrHowStage key="how" />,
          <CsrStartStage key="start" />,
        ]}
        stageLabels={[
          { en: "Why partner with us", hi: "हमारे साथ क्यों जुड़ें" },
          { en: "Where your CSR goes", hi: "आपका CSR कहाँ जाता है" },
          { en: "How a partnership works", hi: "साझेदारी कैसे काम करती है" },
          { en: "Start a CSR partnership", hi: "CSR साझेदारी शुरू करें" },
        ]}
      />
    </main>
  );
}
