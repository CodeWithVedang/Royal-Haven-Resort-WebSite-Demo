/**
 * Payment abstraction.
 *
 * Only the `demo` adapter exists, and it is honest about it: it simulates a
 * gateway round-trip and returns `captured: false`. Adding Razorpay, Stripe or
 * PayU means adding an adapter here and setting NEXT_PUBLIC_PAYMENT_PROVIDER —
 * no other file in the app needs to change.
 */

import { site } from "@/lib/site";
import { delay } from "@/lib/utils";

export type PaymentProvider = "demo" | "razorpay" | "stripe" | "payu";

export type PaymentIntent = {
  amount: number;
  currency: "INR";
  reference: string;
  description: string;
};

export type PaymentOutcome = {
  provider: PaymentProvider;
  status: "simulated" | "captured" | "unavailable";
  captured: boolean;
  /** Shown to the guest, so the demo never implies money moved. */
  message: string;
};

type Adapter = (intent: PaymentIntent) => Promise<PaymentOutcome>;

const demoAdapter: Adapter = async (intent) => {
  await delay(900);
  return {
    provider: "demo",
    status: "simulated",
    captured: false,
    message: `Demo checkout — no payment was taken. A live gateway would charge ${new Intl.NumberFormat(
      "en-IN",
      { style: "currency", currency: "INR", maximumFractionDigits: 0 },
    ).format(intent.amount)} against ${intent.reference}.`,
  };
};

const ADAPTERS: Partial<Record<PaymentProvider, Adapter>> = {
  demo: demoAdapter,
};

export const activeProvider: PaymentProvider = site.integrations.paymentProvider;

export const isLiveGateway = activeProvider !== "demo";

/** UPI, cards and netbanking are all listed by the gateway, not by us. */
export const acceptedMethods = ["UPI", "Cards", "Netbanking", "Bank transfer"];

export async function authorisePayment(intent: PaymentIntent): Promise<PaymentOutcome> {
  const adapter = ADAPTERS[activeProvider];

  if (!adapter) {
    return {
      provider: activeProvider,
      status: "unavailable",
      captured: false,
      message: `${activeProvider} is configured but no adapter is installed in this build. The reservation was held without payment.`,
    };
  }

  return adapter(intent);
}
