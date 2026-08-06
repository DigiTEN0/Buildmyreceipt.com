import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "What BuildMyReceipt may and may not be used for. Permitted business documentation uses, prohibited uses, and how we handle reports of misuse.",
  alternates: { canonical: "/legal/acceptable-use" },
};

export default function Page() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      updated="6 August 2026"
      intro={`This policy sets out what ${SITE.name} may and may not be used for. It forms part of our Terms of Service, and it applies to everyone who uses the site — with or without an account.`}
      blocks={[
        {
          heading: "What this tool is for",
          body: [
            `${SITE.name} generates receipt documents from information you enter. It is intended for legitimate business documentation and record-keeping.`,
            "Typical permitted uses include:",
          ],
          list: [
            "Issuing a receipt to your own customer for a sale you made — particularly a cash sale, where no card or bank record exists.",
            "Reissuing or reconstructing a record of a transaction that genuinely took place, where the original document was lost or never produced.",
            "Producing rent receipts, donation acknowledgements, deposit receipts and similar documents for transactions you are a party to.",
            "Creating blank or sample templates for internal use, training, or design and layout work.",
            "Generating synthetic test documents for software development and quality assurance — for example, testing receipt scanning, OCR or expense pipelines.",
          ],
        },
        {
          heading: "Prohibited uses",
          body: [
            "You must not use this service to create any document that misrepresents a transaction, or that is intended to deceive another person or organisation.",
            "Specifically, you must not use the service to:",
          ],
          list: [
            "Commit or facilitate fraud, forgery, or the obtaining of money, goods, services or credit by deception.",
            "Create a document recording a transaction that did not happen, where that document will be shown to anyone as evidence that it did.",
            "Support a false or inflated expense claim, reimbursement request, insurance claim, warranty claim, refund or chargeback.",
            "Mislead a tax authority, benefits agency, court, regulator, lender, landlord, insurer or employer.",
            "Impersonate a business, or produce a document that appears to have been issued by a business that did not issue it.",
            "Reproduce the trade marks, logos, brand names or distinctive trade dress of any third party without authorisation.",
            "Produce documents in bulk by automated means, or attempt to circumvent any rate limit or technical restriction on the service.",
          ],
        },
        {
          heading: "Third-party brands and trade marks",
          body: [
            "Every template on this site uses fictional business names and details. We do not provide, and will not add, templates that reproduce the branding of real companies.",
            "You may upload your own logo, or a logo you are authorised to use. Uploading a third party's logo or mark without authorisation breaches this policy and may infringe that party's rights independently of anything in these terms.",
          ],
        },
        {
          heading: "Your responsibility for what you create",
          body: [
            "You are solely responsible for the content of every document you generate and for what you do with it afterwards. We do not review, verify or endorse the information you enter.",
            "By generating a document you confirm that it records a transaction you are a party to, that it is being reissued as a record of a transaction that took place, or that it is for template, sample or testing purposes.",
            "Nothing on this site is legal, tax or accounting advice. Whether a particular document satisfies a legal or regulatory requirement in your jurisdiction is a question for a qualified professional.",
          ],
        },
        {
          heading: "Reporting misuse",
          body: [
            `If you believe a document created with this service is being used to deceive you or someone else, or that content on this site infringes your rights, contact us at ${SITE.abuseEmail}.`,
            "Please include as much detail as you can: the document itself if you have it, how it reached you, and what it is being used to claim. We read every report.",
          ],
        },
        {
          heading: "Enforcement",
          body: [
            "We may suspend or terminate access to the service at any time, without notice and without refund, where we believe this policy has been breached.",
            "Where we are required to do so by law, or where we consider it appropriate in response to valid legal process, we may disclose information to law enforcement or other authorities.",
          ],
        },
      ]}
    />
  );
}
