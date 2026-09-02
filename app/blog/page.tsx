import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { EventsStage } from "./EventsStage";
import { LinkedInStage } from "./LinkedInStage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Event recaps and LinkedIn updates from National Association for the Blind, State Chapter, Lucknow.",
};

export default function BlogPage() {
  return (
    <main>
      <StagePager
        stages={[<EventsStage key="events" />, <LinkedInStage key="linkedin" />]}
        stageLabels={["Blog", "On LinkedIn"]}
      />
    </main>
  );
}
