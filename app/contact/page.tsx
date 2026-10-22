import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { ContactStage } from "./ContactStage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with National Association for the Blind, State Chapter, Lucknow. Visit us, call, email, or send a message.",
};

export default function ContactPage() {
  return (
    <main>
      <StagePager stages={[<ContactStage key="contact" />]} />
    </main>
  );
}
