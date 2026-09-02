import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { UpcomingEventsStage } from "./UpcomingEventsStage";
import { PastEventsStage } from "./PastEventsStage";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events from National Association for the Blind, State Chapter, Lucknow: programmes, fundraisers, and awareness drives, online and offline.",
};

export default function EventsPage() {
  return (
    <main>
      <StagePager
        stages={[<UpcomingEventsStage key="upcoming" />, <PastEventsStage key="past" />]}
        stageLabels={["Upcoming Events", "Past Events"]}
      />
    </main>
  );
}
