/**
 * Demo enquiry service.
 *
 * Nothing leaves the browser: the form round-trip is simulated so the UI can
 * exercise its pending, success and failure states. Swapping this for a real
 * endpoint (CRM, Sales & Catering, or a transactional mailer) means replacing
 * `deliver()` only — the components import `submitEnquiry` and nothing else.
 */

export type EnquiryKind = "stay" | "wedding";

export type Enquiry = {
  kind: EnquiryKind;
  name: string;
  email: string;
  phone: string;
  /** Free-form label: "12 – 15 Nov 2026", "Undecided", and so on. */
  dates: string;
  guests: string;
  message: string;
  /** Wedding enquiries carry a little more; kept loose on purpose. */
  extra?: Record<string, string>;
};

export type EnquiryReceipt = {
  reference: string;
  /** ISO timestamp of the simulated acknowledgement. */
  receivedAt: string;
  /** Working days quoted back to the guest. */
  replyWithin: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry | "venue" | "budget" | "events", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string): boolean {
  return EMAIL.test(value.trim());
}

/** 10 digits for an Indian mobile, or up to 13 with a country code. */
export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function validateEnquiry(enquiry: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (enquiry.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!isEmail(enquiry.email)) errors.email = "We need a working email to reply to.";
  if (!isPhone(enquiry.phone)) {
    errors.phone = "Enter a 10-digit mobile number, or include your country code.";
  }
  if (enquiry.message.trim().length < 10) {
    errors.message = "A line or two about what you have in mind helps us answer properly.";
  }
  return errors;
}

function reference(kind: EnquiryKind): string {
  const year = new Date().getFullYear();
  const serial = Math.floor(1000 + Math.random() * 9000);
  return `${kind === "wedding" ? "RH-W" : "RH-E"}-${year}-${serial}`;
}

/** The single seam a real integration would replace. */
async function deliver(enquiry: Enquiry): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (process.env.NODE_ENV === "development") {
    console.info("[demo] enquiry captured locally", enquiry.kind, enquiry.email);
  }
}

export async function submitEnquiry(enquiry: Enquiry): Promise<EnquiryReceipt> {
  await deliver(enquiry);
  return {
    reference: reference(enquiry.kind),
    receivedAt: new Date().toISOString(),
    replyWithin: enquiry.kind === "wedding" ? "one working day" : "a few hours",
  };
}

/** True while the site is running without a connected CRM or mail service. */
export const isDemoEnquiry = true;
