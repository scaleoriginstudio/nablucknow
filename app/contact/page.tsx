import type { Metadata } from "next";
import { StagePager } from "../components/shared/StagePager";
import { ContactStage } from "./ContactStage";
import { ContactCarousel } from "./ContactCarousel";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with National Association for the Blind, State Chapter, Lucknow. Visit us, call, email, or send a message.",
};

export default function ContactPage() {
  return (
    <main>
      <StagePager
        background={
          <>
            <ContactCarousel />
            <div className="absolute inset-0 bg-navy/80" />
          </>
        }
        stages={[<ContactStage key="contact" />]}
      />
    </main>
  );
}
