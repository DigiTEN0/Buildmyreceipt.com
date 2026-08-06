import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing use of ${SITE.name} — licence, acceptable use, disclaimers, limitation of liability and termination.`,
  alternates: { canonical: "/legal/terms" },
};

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="6 August 2026"
      intro={`These terms govern your use of ${SITE.domain} and the tools on it. By using the site you agree to them. If you do not agree, do not use the site.`}
      blocks={[
        {
          heading: "The service",
          body: [
            `${SITE.name} is a document generation tool. It takes information you enter and renders it as a receipt you can download as an image or PDF.`,
            "The generator runs in your browser. The details you type into it are processed on your own device and are not transmitted to or stored on our servers.",
            "We provide the service on an 'as is' and 'as available' basis. We may change, suspend or discontinue any part of it at any time.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "Your use of the service is subject to our Acceptable Use Policy, which forms part of these terms. In summary: this tool is for legitimate business documentation, and must not be used to create documents intended to deceive anyone.",
            "Breach of the Acceptable Use Policy is a breach of these terms and may result in immediate termination of access.",
          ],
        },
        {
          heading: "Your representations",
          body: [
            "Each time you generate a document, you represent and warrant that:",
          ],
          list: [
            "The document records a transaction to which you are a party, or is a reissued record of a transaction that genuinely occurred, or is for template, sample or testing purposes only.",
            "You will not present the document to any person as evidence of a transaction that did not take place.",
            "You own or are authorised to use any logo, mark or business name you enter or upload.",
            "Your use of the service complies with all laws applicable to you.",
          ],
        },
        {
          heading: "Licence",
          body: [
            "We grant you a limited, non-exclusive, non-transferable, revocable licence to use the service for the purposes permitted by these terms.",
            "You own the documents you create. We claim no rights over the content you enter or the output you generate.",
            "You may not copy, scrape, resell, sublicense or redistribute the site, its templates, its written content or its code without our written permission.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The site, its design, its written content and its template library are our property or licensed to us, and are protected by copyright and other laws.",
            "All business names, addresses and transaction details shown in templates and previews are fictional and are used for illustration only. Any resemblance to a real business is coincidental and unintended.",
            "If you believe content on this site infringes your intellectual property, contact us at " + SITE.abuseEmail + " with details of the work concerned and the material you say infringes it.",
          ],
        },
        {
          heading: "Disclaimers",
          body: [
            "We make no warranty that the service will be uninterrupted, error-free, or that any document it produces will meet a legal, tax, accounting or regulatory requirement in any jurisdiction.",
            "Nothing on this site is legal, tax or accounting advice. You should obtain advice from a qualified professional licensed in your jurisdiction before relying on any document for a regulatory or tax purpose.",
            "To the fullest extent permitted by law, we disclaim all warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose and non-infringement.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits, revenue, data or goodwill, arising out of or in connection with your use of the service.",
            "Our total aggregate liability arising out of or in connection with the service will not exceed the greater of the amount you paid us in the twelve months before the claim arose, or fifty US dollars.",
            "Nothing in these terms limits liability that cannot lawfully be limited, including liability for death or personal injury caused by negligence, or for fraud.",
          ],
        },
        {
          heading: "Indemnity",
          body: [
            "You agree to indemnify and hold us harmless against any claim, demand, loss, liability, cost or expense (including reasonable legal fees) arising out of your use of the service, any document you create with it, or your breach of these terms or of the Acceptable Use Policy.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "We may suspend or terminate your access to the service at any time, with or without notice, where we believe you have breached these terms or the Acceptable Use Policy, or where we consider it necessary to protect the service or other users.",
            "Provisions which by their nature should survive termination — including intellectual property, disclaimers, limitation of liability and indemnity — will survive.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "We may update these terms from time to time. The date at the top of this page shows when they were last changed. Continuing to use the service after a change means you accept the updated terms.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `General enquiries: ${SITE.email}`,
            `Reports of misuse or infringement: ${SITE.abuseEmail}`,
          ],
        },
      ]}
    />
  );
}
