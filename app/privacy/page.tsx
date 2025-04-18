export const revalidate = 86400; // Revalidate once per day (24 hours)

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Privacy Policy",
              description: "This is the privacy policy for Stage Plotter.",
              url: "https://www.thestageplotter.com/privacy",
              mainEntityOfPage: "https://www.thestageplotter.com/privacy",
            }),
          }}
        />
      </Head>
      <main
        className={`bg-black text-white min-h-screen font-urbanist`}
        style={{ fontFamily: "Urbanist, sans-serif" }}
      >
        <Image
          src="/newlogo.png"
          alt="logo"
          width={400}
          height={400}
          className="mx-auto"
          priority
        />
        <div className="max-w-3xl mx-auto p-6  border-t-4">
          <h1 className="text-3xl font-bold mb-4 text-white">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-6">
            Last updated: February 3, 2025
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              1. Introduction
            </h2>
            <p className="text-gray-300">
              Welcome to <strong>Stage Plotter</strong>
              Your privacy is important to us. This Privacy Policy explains what
              data we collect, how we use it, and your rights.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              2. Information We Collect
            </h2>
            <p className="mb-2 text-gray-300">
              We collect the following types of data:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-300">
              <li>
                <strong className="text-white">Account Information:</strong>{" "}
                When you sign in with Google, we receive your name, email, and
                profile picture.
              </li>
              <li>
                <strong className="text-white">Stage Plot Data:</strong> Your
                custom stage plots, band setups, and any notes you add.
              </li>
              <li>
                <strong className="text-white">Usage Data:</strong> Basic
                analytics, such as the number of logins and pages visited.
              </li>
            </ul>
          </section>

          {/* Rest of the sections remain similar, just adjust text colors */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              3. How We Use Your Data
            </h2>
            <p className="mb-2 text-gray-300">We use your data to:</p>
            <ul className="list-disc ml-6 mt-2 text-gray-300">
              <li>Let you create, edit, and store stage plots.</li>
              <li>Authenticate users with Google (via Supabase).</li>
              <li>Improve app functionality and fix bugs.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              7. Contact
            </h2>
            <p className="text-gray-300">
              If you have any privacy concerns, contact us at:{" "}
              <Link
                href="mailto:pforbeswebdev@gmail.com"
                className="text-gray-300 underline"
                aria-label="Send an email to Peter Forbes"
              >
                pforbeswebdev@gmail.com
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
