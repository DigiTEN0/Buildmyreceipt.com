import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data. The receipt generator runs entirely in your browser — the details you enter are never sent to our servers.`,
  alternates: { canonical: "/legal/privacy" },
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="6 August 2026"
      intro={`This policy explains what happens to your data when you use ${SITE.domain}. The short version: the receipt generator runs entirely in your browser, and the business details, line items and amounts you type are never transmitted to us.`}
      blocks={[
        {
          heading: "Receipt data stays on your device",
          body: [
            "The generator is client-side software. When you enter a business name, an address, line items, amounts or upload a logo, that information is held in your browser's memory and used to render the preview.",
            "When you download a PNG or PDF, the file is produced on your device by your browser. It is not uploaded to us, not processed on our servers, and not stored anywhere by us.",
            "This means we cannot see the receipts you create, and we could not produce them if asked to.",
          ],
        },
        {
          heading: "What we do collect",
          body: [
            "We collect limited technical information when you visit, in common with almost every website:",
          ],
          list: [
            "Standard server logs — IP address, user agent, requested URL, timestamp and referrer — retained for a short period for security and abuse prevention.",
            "Aggregate, privacy-respecting analytics about which pages are visited and from where. We do not use these to build a profile of you across sites.",
            "If you contact us, whatever you put in your message and the address you send it from, so we can reply.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We do not use advertising or cross-site tracking cookies. Any cookies or local storage we set are strictly functional — remembering your interface preferences, for example.",
          ],
        },
        {
          heading: "Legal bases",
          body: [
            "Where the UK GDPR or EU GDPR applies to you, we rely on legitimate interests for security logging, abuse prevention and aggregate analytics — specifically, our interest in keeping the service running, secure and improving. Where we ask for consent, you can withdraw it at any time.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "We do not sell your data and we do not share it with advertisers.",
            "We use service providers for hosting, content delivery and analytics, who process data on our behalf under contract. We may disclose information where we are legally required to do so, or in response to valid legal process.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Server logs are retained for a short period and then deleted. Correspondence is kept for as long as needed to deal with the matter and any follow-up.",
            "Receipt content is not retained at all, because it never reaches us.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Depending on where you live, you may have rights to access, correct, delete, restrict or object to the processing of your personal data, and to receive a copy of it.",
            `To exercise any of these, contact ${SITE.email}. We will respond within the period required by the applicable law. You also have the right to complain to your local data protection authority.`,
          ],
        },
        {
          heading: "Children",
          body: [
            "The service is not directed at children and we do not knowingly collect personal data from anyone under 16.",
          ],
        },
        {
          heading: "Changes and contact",
          body: [
            "We may update this policy. The date at the top shows when it was last changed.",
            `Questions about privacy: ${SITE.email}`,
          ],
        },
      ]}
    />
  );
}
