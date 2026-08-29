// Every lead form on the site (volunteer, donate, event sign-up, programme
// enquiry, the homepage CTA tabs) funnels through submitLead, which posts
// to a single Google Apps Script web app. That script appends a row to a
// per-formType tab in one spreadsheet.
//
// The endpoint is read from NEXT_PUBLIC_FORMS_ENDPOINT. When it is not set
// (local dev, previews) the call is a no-op so the form UX still completes.
//
// The request is sent as multipart FormData with no custom headers, which
// keeps it a "simple" request the Apps Script accepts without any CORS
// preflight. The response is intentionally ignored: a failed sheet write
// must never block the visitor's confirmation screen.

export type LeadPayload = Record<string, string | number>;

export async function submitLead(formType: string, payload: LeadPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_FORMS_ENDPOINT;
  if (!endpoint) return;

  try {
    const body = new FormData();
    body.append("formType", formType);
    for (const [key, value] of Object.entries(payload)) {
      body.append(key, String(value));
    }
    await fetch(endpoint, { method: "POST", body });
  } catch {
    // Swallowed on purpose. See the note above.
  }
}
