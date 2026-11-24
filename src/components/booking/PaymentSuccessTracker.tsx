"use client";

import { useEffect } from "react";
import { trackOnce } from "@/lib/analytics";

/** Fires consultation_payment_success once per Stripe session, only rendered for verified bookings. */
export function PaymentSuccessTracker({ sessionId, value }: { sessionId: string; value: number }) {
  useEffect(() => {
    trackOnce("consultation_payment_success", sessionId, { value, currency: "MAD" });
  }, [sessionId, value]);
  return null;
}
