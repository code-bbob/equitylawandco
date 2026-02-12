import Link from "next/link";
import ScrollFadeIn from "../components/ScrollFadeIn";
import FadeIn from "../components/FadeIn";

export const metadata = {
  title: 'About Us',
  description: 'Equity Law & Co. traces its roots to Sahara Law Chamber (est. 1998), evolved through Equity Law Chamber (2014), and was restructured in 2025 — delivering practical, reliable, and result-oriented legal solutions rooted in fairness and equity.',
  keywords: 'about Equity Law, law firm Nepal, legal services Kathmandu, Nepal lawyers, Equity Law history, Sahara Law Chamber',
  openGraph: {
    title: 'About Equity Law & Co.',
    description: 'With roots dating back to 1998, Equity Law & Co. is a full-service law firm in Nepal delivering practical, reliable, and result-oriented legal solutions.',
    url: 'https://equitylawandco.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://equitylawandco.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50 ">
      {/* Hero Section */}
      <section className="bg-[url('/images/banner3.webp')] bg-cover bg-center text-white py-12 sm:py-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-44">
          <FadeIn delay={100} duration={700} slideDistance={30}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif mb-4 sm:mb-6">
              About Equity Law & Co.
            </h1>
          </FadeIn>
          <FadeIn delay={300} duration={700}>
            <p className="text-base hidden md:block sm:text-xl text-amber-100 md:max-w-3xl">
              With a legacy rooted in Sahara Law Chamber (est. 1998), we have grown through
              decades of dedicated practice into a full-service law firm delivering practical,
              reliable, and result-oriented legal solutions rooted in fairness and equity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Company History */}
      <section className="py-12 sm:py-20 bg-amber-50">
        <div className=" mx-auto px-4 sm:px-6 lg:px-24 xl:px-64">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollFadeIn slideDistance={40}>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-900 mb-6">
                  Our History
                </h2>
              <p className="text-base sm:text-lg text-slate-700 mb-4 leading-relaxed">
                Our professional journey began with the establishment of{" "}
                <strong>Sahara Law Chamber in 1998 A.D.</strong>, which laid a
                strong foundation for our legal practice. Building upon this
                experience and institutional growth,{" "}
                <strong>Equity Law Chamber</strong> was formally established in{" "}
                <strong>2014 A.D.</strong>
              </p>
              <p className="text-base sm:text-lg text-slate-700 mb-4 leading-relaxed">
                Further reflecting our expansion, diversified services, and
                renewed commitment to professional excellence, the firm was
                restructured in <strong>2025 A.D.</strong> as{" "}
                <strong>Equity Law & Co.</strong> — marking a new chapter of
                institutional strength and broader service offerings.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Throughout this journey of over two decades, we have maintained
                applied equitably, taking into account the concept of fairness,
                reasonableness, and the real-life circumstances of those seeking
                justice.
              </p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn slideDistance={40} duration={800}>
              <div className="bg-amber-50 p-6 sm:p-8 rounded-lg border-2 border-amber-200">
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-700 pl-6">
                    <div className="text-3xl font-bold text-amber-900">1998</div>
                    <p className="text-slate-700 mt-2">
                      Established as Sahara Law Chamber
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-700 pl-6">
                    <div className="text-3xl font-bold text-amber-900">2014</div>
                    <p className="text-slate-700 mt-2">
                      Evolved into Equity Law Chamber
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-700 pl-6">
                    <div className="text-3xl font-bold text-amber-900">2025</div>
                    <p className="text-slate-700 mt-2">
                      Restructured as Equity Law & Co.
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-700 pl-6">
                    <div className="text-3xl font-bold text-amber-900">Today</div>
                    <p className="text-slate-700 mt-2">
                      27+ years of legal excellence
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Core Values & Pillars */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-24 xl:px-64">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-900 mb-4">
              Our Core Pillars
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              The four principles that guide every decision and action at Equity
              Law & Co., represented in our logo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                title: "Equity",
                description:
                  "Applying law equitably, considering fairness, reasonableness, and the real circumstances of those seeking justice.",
              },
              {
                title: "Fairness",
                description:
                  "Treating all parties with impartiality and ensuring just outcomes based on legal principles and equity.",
              },
              {
                title: "Diligence",
                description:
                  "Demonstrating meticulous attention to detail and thorough analysis in every matter we undertake.",
              },
              {
                title: "Responsiveness",
                description:
                  "Providing prompt and accessible legal guidance, understanding the urgency of our clients' needs.",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-lg border-2 border-amber-100 hover:border-amber-700 transition-all hover:shadow-lg"
              >
                <div className="text-4xl font-bold text-amber-700 mb-4">⚖</div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-amber-50 p-10 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed">
                To advise and represent clients in a wide range of legal matters with particular strengths in Intellectual Property Law, Real Estate Law, Arbitration, Family Matters, Foreign Direct Investment, and Corporate and Business Law, while upholding the highest standards of professional ethics and legal excellence.
              </p>
            </div>
            <div className="bg-amber-900 text-white p-10 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-100 mb-4">Our Vision</h3>
              <p className="text-amber-50 leading-relaxed">
                To become the trusted legal partner for businesses and individuals in Nepal by combining dedication, critical thinking, and a strong sense of responsibility to deliver practical, result-oriented solutions founded on principles of fairness and equity.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="bg-[url('/images/banner1.jpg')] bg-cover bg-center text-white py-12 sm:py-20 ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-44">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif mb-4 sm:mb-6">
            Our Commitment
          </h1>
          <p className="text-base sm:text-xl text-white font-semibold  max-w-3xl">
             Equity Law & Co. is committed to upholding the highest values of
            professional ethics and legal excellence. Through dedication,
            critical thinking, and a strong sense of responsibility, we aim to
            deliver practical, reliable, and result-oriented legal solutions
            that truly serve our clients' best interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4  mt-10">
            <Link
              href="/appointments"
              className="bg-amber-100 text-amber-900 hover:scale-105 px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/#contact"
              className=" text-amber-100 bg-amber-800 hover:scale-105 px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-24 xl:px-64">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="bg-amber-50 p-10 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                Our Mission
              </h3>
              <p className="text-slate-700 leading-relaxed">
                To advise and represent clients in a wide range of legal matters
                with particular strengths in Intellectual Property Law, Real
                Estate Law, Arbitration, Family Matters, Foreign Direct
                Investment, and Corporate and Business Law, while upholding the
                highest standards of professional ethics and legal excellence.
              </p>
            </div>

            <div className="bg-amber-900 text-white p-10 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-100 mb-4">
                Our Vision
              </h3>
              <p className="text-amber-50 leading-relaxed">
                To become the trusted legal partner for businesses and
                individuals in Nepal by combining dedication, critical thinking,
                and a strong sense of responsibility to deliver practical,
                result-oriented solutions founded on principles of fairness and
                equity.
              </p>
            </div>

            {/* Motto */}
            <div className="bg-gray-500 text-white p-6 sm:p-10 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-4">
                Our Motto
              </h3>
              <p className="text-amber-50 leading-relaxed">
                Justice through Equity: Applying the law with fairness, reasonableness, and a deep understanding of our clients' real-life circumstances to achieve just outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas of Expertise */}
      <section className="py-12 sm:py-20 bg-amber-50 ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-24 xl:px-64">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-900 mb-4 text-center">
            Areas of Expertise
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-center mb-12">
            We provide specialized legal counsel across diverse practice areas,
            combining deep expertise with practical understanding of your
            industry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Intellectual Property Law",
              "Real Estate Law",
              "Arbitration",
              "Family Matters",
              "Foreign Direct Investment",
              "Corporate and Business Law",
            ].map((area, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg border border-amber-200 hover:border-amber-700 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl text-amber-700 mr-3">✓</span>
                  <h3 className="text-xl font-bold text-amber-900">{area}</h3>
                </div>
                <p className="text-slate-700">
                  Expert consultation and representation in all aspects of{" "}
                  {area.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      {/* <section className="py-20 bg-[url('/images/banner1.jpg')] bg-cover bg-center text-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif text-black mb-6">Our Commitment</h2>
          <p className="text-xl text-black font-semibold max-w-3xl mx-auto leading-relaxed mb-8">
            Equity Law & Co. is committed to upholding the highest values of
            professional ethics and legal excellence. Through dedication,
            critical thinking, and a strong sense of responsibility, we aim to
            deliver practical, reliable, and result-oriented legal solutions
            that truly serve our clients' best interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/appointments"
              className="bg-amber-100 text-amber-900 hover:bg-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/#contact"
              className="border-2 border-amber-100 text-amber-100 hover:bg-amber-800 px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
