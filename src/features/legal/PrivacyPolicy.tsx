import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import Reveal from '../ui/Reveal'

const lastUpdated = 'January 1, 2026'

const sections = [
  {
    title: '1. Interpretation and Definitions',
    content: `The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.`,
    definitions: true,
  },
  {
    title: '2. Collecting and Using Your Personal Data',
    content: `While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to: email address, first name and last name, phone number, and address, state, province, ZIP/postal code, city.`,
    subsections: [
      {
        heading: 'Usage Data',
        text: `Usage Data is collected automatically when using the Service. Usage Data may include information such as your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data. When you access the Service by or through a mobile device, we may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.`,
      },
      {
        heading: 'Tracking Technologies and Cookies',
        text: `We use Cookies and similar tracking technologies to track the activity on our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service. The technologies we use may include Cookies or Browser Cookies, Web Beacons, and other similar technologies. Cookies can be "Persistent" or "Session" Cookies. We use both Session and Persistent Cookies for purposes including: Necessary/Essential Cookies (Session Cookies administered by us to provide services), Cookies Policy/Notice Acceptance Cookies (Persistent Cookies to identify if users have accepted the use of cookies), and Functionality Cookies (Persistent Cookies to remember choices you make).`,
      },
    ],
  },
  {
    title: '3. Use of Your Personal Data',
    content: `The Company may use Personal Data for the following purposes: to provide and maintain our Service, including to monitor the usage of our Service; to manage your Account — to manage your registration as a user of the Service; for the performance of a contract — the development, compliance and undertaking of the purchase contract for the products, items or services you have purchased; to contact you by email, telephone calls, SMS, or other equivalent forms of electronic communication; to provide you with news, special offers and general information about other goods, services and events which we offer; to manage your requests; for business transfers; and for other purposes such as data analysis, identifying usage trends, and improving our Service.`,
    sharing: true,
  },
  {
    title: '4. Retention of Your Personal Data',
    content: `The Company will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.`,
  },
  {
    title: '5. Transfer of Your Personal Data',
    content: `Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. The Company will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.`,
  },
  {
    title: '6. Delete Your Personal Data',
    content: `You have the right to delete or request that we assist in deleting the Personal Data that we have collected about you. Our Service may give you the ability to delete certain information about you from within the Service. You may update, amend, or delete your information at any time by signing in to your Account, if you have one, and visiting the account settings section that allows you to manage your personal information. You may also contact us to request access to, correct, or delete any personal information that you have provided to us. Please note, however, that we may need to retain certain information when we have a legal obligation or lawful basis to do so.`,
  },
  {
    title: '7. Disclosure of Your Personal Data',
    content: `If the Company is involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.`,
    legal: true,
  },
  {
    title: '8. Security of Your Personal Data',
    content: `The security of your Personal Data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.`,
  },
  {
    title: '9. Children\'s Privacy',
    content: `Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from anyone under the age of 13 without verification of parental consent, we take steps to remove that information from our servers.`,
  },
  {
    title: '10. Links to Other Websites',
    content: `Our Service may contain links to other websites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.`,
  },
  {
    title: '11. Changes to this Privacy Policy',
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`,
  },
  {
    title: '12. Contact Us',
    content: `If you have any questions about this Privacy Policy, you can contact us:`,
    contact: true,
  },
]

const definitions = [
  { term: 'Account', definition: 'means a unique account created for You to access our Service or parts of our Service.' },
  { term: 'Affiliate', definition: 'means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.' },
  { term: 'Company', definition: '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to SONOSCAN HEALTHCARE PVT LTD, 44, S.M. AVENUE, KOLKATA - 700014.' },
  { term: 'Cookies', definition: 'are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.' },
  { term: 'Country', definition: 'refers to: West Bengal, India' },
  { term: 'Device', definition: 'means any device that can access the Service such as a computer, a cellphone or a digital tablet.' },
  { term: 'Personal Data', definition: 'is any information that relates to an identified or identifiable individual.' },
  { term: 'Service', definition: 'refers to the Website.' },
  { term: 'Service Provider', definition: 'means any natural or legal person who processes the data on behalf of the Company.' },
  { term: 'Usage Data', definition: 'refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).' },
  { term: 'Website', definition: 'refers to Sonoscan Healthcare, accessible from https://www.sonoscanhealthcare.com' },
  { term: 'You', definition: 'means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.' },
]

const sharingPurposes = [
  'With Service Providers: to monitor and analyze the use of our Service, to contact You.',
  'For business transfers: in connection with any merger, sale of Company assets, financing, or acquisition.',
  'With Affiliates: including our parent company and any other subsidiaries, joint venture partners or other companies that we control.',
  'With business partners: to offer you certain products, services or promotions.',
  'With other users: when you share personal information in public areas.',
  'With your consent: for any other purpose with your consent.',
]

const legalDisclosures = [
  'Comply with a legal obligation',
  'Protect and defend the rights or property of the Company',
  'Prevent or investigate possible wrongdoing in connection with the Service',
  'Protect the personal safety of Users of the Service or the public',
  'Protect against legal liability',
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | Sonoscan Healthcare"
        description="Read Sonoscan Healthcare's Privacy Policy to understand how we collect, use, and protect your personal information."
      />
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-slate-900 -mt-16 lg:-mt-28 pt-16 lg:pt-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Legal
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-violet-200/80 max-w-xl">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Content ═══ */}
      <section className="py-16 lg:py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sidebar navigation */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32 space-y-2">
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider mb-4">
                  On this page
                </h3>
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`}
                    className="block text-sm text-slate-500 hover:text-violet-600 transition-colors py-1.5"
                  >
                    {section.title.replace(/^\d+\.\s*/, '')}
                  </a>
                ))}
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-9">
              <div className="prose prose-slate max-w-none">
                <Reveal direction="up">
                  <div className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-8">
                    <p className="text-slate-600 leading-relaxed">
                      This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                    </p>
                  </div>
                </Reveal>

                {sections.map((section, i) => (
                  <Reveal key={section.title} direction="up" delay={i * 80}>
                    <div
                      id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}
                      className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-6 scroll-mt-32"
                    >
                      <h2 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h2>
                      <p className="text-slate-600 leading-relaxed">{section.content}</p>

                      {/* Definitions */}
                      {section.definitions && (
                        <div className="mt-6 space-y-4">
                          {definitions.map((def) => (
                            <div key={def.term} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                              <p className="font-semibold text-slate-900 text-sm">{def.term}</p>
                              <p className="text-slate-600 text-sm mt-1">{def.definition}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Subsections */}
                      {section.subsections?.map((sub) => (
                        <div key={sub.heading} className="mt-6">
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">{sub.heading}</h3>
                          <p className="text-slate-600 leading-relaxed">{sub.text}</p>
                        </div>
                      ))}

                      {/* Sharing purposes */}
                      {section.sharing && (
                        <div className="mt-6">
                          <p className="text-slate-600 leading-relaxed mb-4 font-medium">We may share your personal information in the following situations:</p>
                          <ul className="space-y-3">
                            {sharingPurposes.map((purpose, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>{purpose}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Legal disclosures */}
                      {section.legal && (
                        <div className="mt-6">
                          <p className="text-slate-600 leading-relaxed mb-4 font-medium">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                          <ul className="space-y-3">
                            {legalDisclosures.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Contact */}
                      {section.contact && (
                        <div className="mt-6 p-5 bg-violet-50 rounded-xl border border-violet-200">
                          <p className="text-slate-700">
                            <span className="font-medium">By email:</span>{' '}
                            <a href="mailto:info@sonoscanhealthcare.com" className="text-violet-600 hover:text-violet-700 transition-colors">
                              info@sonoscanhealthcare.com
                            </a>
                          </p>
                          <p className="text-slate-700 mt-2">
                            <span className="font-medium">Company:</span>{' '}
                            SONOSCAN HEALTHCARE PVT LTD
                          </p>
                          <p className="text-slate-700 mt-2">
                            <span className="font-medium">Address:</span>{' '}
                            44, S.M. Avenue, Kolkata - 700014
                          </p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Footer note */}
              <Reveal direction="up">
                <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <p className="text-sm text-slate-500">
                    This Privacy Policy was last updated on {lastUpdated}.{' '}
                    <Link to="/contact" className="text-violet-600 hover:text-violet-700 font-medium transition-colors">
                      Contact us
                    </Link>{' '}
                    if you have any questions.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
