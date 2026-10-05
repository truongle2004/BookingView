import Image from 'next/image';
import arcjetLogo from '@/public/assets/images/arcjet-light.svg';
import checklyLogo from '@/public/assets/images/checkly-logo-light.png';
import clerkLogo from '@/public/assets/images/clerk-logo-dark.png';
import crowdinLogo from '@/public/assets/images/crowdin-dark.png';
import nextJsBoilerplateLogo from '@/public/assets/images/nextjs-boilerplate-saas.png';
import posthogLogo from '@/public/assets/images/posthog-logo.svg';

export const Sponsors = () => (
  <table className="border-collapse">
    <tbody>
      <tr className="h-56">
        <td className="border-2 border-gray-300 p-3">
          <a
            aria-label="Visit Clerk"
            href="https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate"
          >
            <Image
              src={clerkLogo}
              alt="Clerk – Authentication & User Management for Next.js"
              width={220}
            />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a aria-label="Visit Arcjet" href="https://launch.arcjet.com/Q6eLbRE">
            <Image src={arcjetLogo} alt="Arcjet" width={220} />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a aria-label="Visit Crowdin" href="https://l.crowdin.com/next-js">
            <Image src={crowdinLogo} alt="Crowdin" width={220} />
          </a>
        </td>
      </tr>
      <tr className="h-56">
        <td className="border-2 border-gray-300 p-3">
          <a
            aria-label="Visit PostHog"
            href="https://posthog.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate"
          >
            <Image src={posthogLogo} alt="PostHog" width={220} />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a
            aria-label="Visit Checkly"
            href="https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate"
          >
            <Image src={checklyLogo} alt="Checkly" width={220} />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a
            aria-label="Visit Next.js SaaS Boilerplate"
            href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
          >
            <Image src={nextJsBoilerplateLogo} alt="Next.js SaaS Boilerplate" width={220} />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
);
