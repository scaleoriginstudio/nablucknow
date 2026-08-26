import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { BlogGridStage } from "./BlogGridStage";
import { InstagramStage } from "./InstagramStage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Awareness articles and event recaps from National Association for the Blind, State Chapter, Lucknow.",
};

export default function BlogPage() {
  return (
    <main>
      <StagePager stages={[<BlogGridStage key="grid" />, <InstagramStage key="instagram" />]} />
    </main>
  );
}
