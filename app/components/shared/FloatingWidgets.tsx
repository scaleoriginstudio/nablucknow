"use client";

import { useOverlay } from "./OverlayContext";
import { Icon } from "./Icon";
import { FOOTER_CONTACT } from "./constants";

// The mobile number, not the landline — wa.me needs a real WhatsApp-reachable
// number. Country code + number, digits only, no leading 0 or spaces.
const WHATSAPP_HREF = `https://wa.me/91${FOOTER_CONTACT.phones[1].replace(/\D/g, "").slice(-10)}`;

/** Two persistent floating buttons, stacked bottom-right on every page —
    the corner a thumb naturally rests on when holding a phone one-handed.
    Donate opens the same overlay the header/footer Donate links use;
    WhatsApp is a plain external chat link. */
export function FloatingWidgets() {
  const { openDonate } = useOverlay();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={openDonate}
        aria-label="Donate"
        title="Donate"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white shadow-lg transition-transform hover:scale-105 hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
      >
        <Icon name="volunteer_activism" size={26} weight={400} />
      </button>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.001L2.05 21.95l5.075-1.33A9.943 9.943 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5c-1.66 0-3.201-.474-4.502-1.29l-.323-.192-3.234.85.862-3.147-.211-.325A8.474 8.474 0 0 1 3.5 12c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5z" />
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </a>
    </div>
  );
}
