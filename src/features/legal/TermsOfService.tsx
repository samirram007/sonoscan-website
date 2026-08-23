import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import Reveal from '../ui/Reveal'

const lastUpdated = 'January 1, 2026'

const sections = [
  {
    title: '1. Introduction',
    content: `Welcome to SONOSCAN HEALTHCARE! These terms and conditions outline the rules and regulations for the use of SONOSCAN HEALTHCARE PVT LTD's Website, located at https://www.sonoscanhealthcare.com. By accessing this website we assume you accept these terms and conditions. Do not continue to use SONOSCAN HEALTHCARE if you do not agree to take all of the terms and conditions stated on this page.`,
    terminology: true,
  },
  {
    title: '2. Cookies',
    content: `We employ the use of cookies. By accessing SONOSCAN HEALTHCARE, you agreed to use cookies in agreement with the SONOSCAN HEALTHCARE PVT LTD's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.`,
  },
  {
    title: '3. License',
    content: `Unless otherwise stated, SONOSCAN HEALTHCARE PVT LTD and/or its licensors own the intellectual property rights for all material on SONOSCAN HEALTHCARE. All intellectual property rights are reserved. You may access this from SONOSCAN HEALTHCARE for your own personal use subjected to restrictions set in these terms and conditions.`,
    restrictions: true,
  },
  {
    title: '4. Comments & User Content',
    content: `Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. SONOSCAN HEALTHCARE PVT LTD does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of SONOSCAN HEALTHCARE PVT LTD, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, SONOSCAN HEALTHCARE PVT LTD shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.`,
    commentTerms: true,
  },
  {
    title: '5. Hyperlinking to Our Content',
    content: `The following organizations may link to our Website without prior written approval: government agencies; search engines; news organizations; online directory distributors; and system wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups.`,
    linking: true,
  },
  {
    title: '6. Refund and Cancellation Policy',
    content: `The E-Health Package is valid for the selected dated and allotted time at the time of booking or within 7 days from the time and date of invoice generation in case Date/Time is not allotted. After 7 days, the Customer shall not be entitled to claim for Services and the company shall have the right to forfeit the fees already paid in such a case.`,
    cancellation: true,
  },
  {
    title: '7. iFrames',
    content: `Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.`,
  },
  {
    title: '8. Content Liability',
    content: `We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.`,
  },
  {
    title: '9. Reservation of Rights',
    content: `We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.`,
  },
  {
    title: '10. Removal of Links',
    content: `If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly. We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.`,
  },
  {
    title: '11. Disclaimer',
    content: `To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.`,
    disclaimerItems: true,
  },
]

const terminology = [
  { term: '"Client", "You" and "Your"', definition: 'refers to you, the person log on this website and compliant to the Company\'s terms and conditions.' },
  { term: '"The Company", "Ourselves", "We", "Our" and "Us"', definition: 'refers to our Company, SONOSCAN HEALTHCARE PVT LTD.' },
  { term: '"Party", "Parties", or "Us"', definition: 'refers to both the Client and ourselves.' },
  { term: 'Purpose', definition: 'All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of in.' },
]

const restrictions = [
  'Republish material from SONOSCAN HEALTHCARE',
  'Sell, rent or sub-license material from SONOSCAN HEALTHCARE',
  'Reproduce, duplicate or copy material from SONOSCAN HEALTHCARE',
  'Redistribute content from SONOSCAN HEALTHCARE',
]

const commentWarranties = [
  'You are entitled to post the Comments on our website and have all necessary licenses and consents to do so.',
  'The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party.',
  'The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy.',
  'The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.',
]

const linkingOrganizations = [
  'commonly-known consumer and/or business information sources',
  'dot.com community sites',
  'associations or other groups representing charities',
  'online directory distributors',
  'internet portals',
  'accounting, law and consulting firms',
  'educational institutions and trade associations',
]

const disclaimerItems = [
  'limit or exclude our or your liability for death or personal injury;',
  'limit or exclude our or your liability for fraud or fraudulent misrepresentation;',
  'limit any of our or your liabilities in any way that is not permitted under applicable law; or',
  'exclude any of our or your liabilities that may not be excluded under applicable law.',
]

export default function TermsOfServicePage() {
  return (
    <>
      <SEO
        title="Terms and Conditions | Sonoscan Healthcare"
        description="Read Sonoscan Healthcare's Terms and Conditions governing the use of our website, diagnostic services, and online booking."
      />
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 -mt-16 lg:-mt-28 pt-16 lg:pt-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-violet-300/10 rounded-full blur-2xl" />
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
              Terms and Conditions
            </h1>
            <p className="text-lg text-slate-300/80 max-w-xl">
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
              <Reveal direction="up">
                <div className="bg-bg-card rounded-2xl border border-violet-200 p-8 lg:p-10 mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Welcome to SONOSCAN HEALTHCARE! These terms and conditions outline the rules and regulations for the use of SONOSCAN HEALTHCARE PVT LTD's Website, located at <a href="https://www.sonoscanhealthcare.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 transition-colors">https://www.sonoscanhealthcare.com</a>.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use SONOSCAN HEALTHCARE if you do not agree to take all of the terms and conditions stated on this page.
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

                    {/* Terminology */}
                    {section.terminology && (
                      <div className="mt-6 space-y-4">
                        {terminology.map((item) => (
                          <div key={item.term} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="font-semibold text-slate-900 text-sm">{item.term}</p>
                            <p className="text-slate-600 text-sm mt-1">{item.definition}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* IP Restrictions */}
                    {section.restrictions && (
                      <div className="mt-6">
                        <p className="text-slate-600 leading-relaxed mb-4 font-medium">You must not:</p>
                        <ul className="space-y-3">
                          {restrictions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-600">
                              <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Comment terms */}
                    {section.commentTerms && (
                      <div className="mt-6">
                        <p className="text-slate-600 leading-relaxed mb-4 font-medium">SONOSCAN HEALTHCARE PVT LTD reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
                        <p className="text-slate-600 leading-relaxed mb-4 font-medium">You warrant and represent that:</p>
                        <ul className="space-y-3">
                          {commentWarranties.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-600">
                              <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-4 bg-violet-50 rounded-xl border border-violet-200">
                          <p className="text-sm text-slate-700">
                            <span className="font-medium">License Grant:</span> You hereby grant SONOSCAN HEALTHCARE PVT LTD a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Hyperlinking */}
                    {section.linking && (
                      <div className="mt-6 space-y-4">
                        <p className="text-slate-600 leading-relaxed font-medium">These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>
                        <p className="text-slate-600 leading-relaxed font-medium">We may consider and approve other link requests from the following types of organizations:</p>
                        <ul className="space-y-2">
                          {linkingOrganizations.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-600">
                              <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-slate-600 leading-relaxed text-sm mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                          Approved organizations may hyperlink to our Website by use of our corporate name, by use of the uniform resource locator being linked to, or by use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site. No use of SONOSCAN HEALTHCARE PVT LTD's logo or other artwork will be allowed for linking absent a trademark license agreement.
                        </p>
                      </div>
                    )}

                    {/* Cancellation */}
                    {section.cancellation && (
                      <div className="mt-6 space-y-3">
                        <p className="text-slate-600 leading-relaxed">Cancellation will be acceptable provided that the Customer informs the Company inside 72 hours from the hour of booking. Cancellation charges will be applicable on the total amount of the invoice. The Customer can get in touch with us through email id <a href="mailto:info@sonoscanhealthcare.com" className="text-violet-600 hover:text-violet-700 transition-colors font-medium">info@sonoscanhealthcare.com</a> if there should be an occurrence of cancellation and refund.</p>
                        <p className="text-slate-600 leading-relaxed">The refund sum will be sent to the respective debit card/credit card/account from where payment was made and the amount won't be refundable by some other mode.</p>
                      </div>
                    )}

                    {/* Disclaimer items */}
                    {section.disclaimerItems && (
                      <div className="mt-6">
                        <p className="text-slate-600 leading-relaxed mb-4 font-medium">Nothing in this disclaimer will:</p>
                        <ul className="space-y-3">
                          {disclaimerItems.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-600">
                              <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <p className="text-sm text-slate-600 leading-relaxed">
                            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                          </p>
                        </div>
                      </div>
                    )}


                  </div>
                </Reveal>
              ))}

              <Reveal direction="up">
                <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <p className="text-sm text-slate-500">
                    These Terms and Conditions were last updated on {lastUpdated}.{' '}
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
