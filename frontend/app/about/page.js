import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50 ">
      {/* Hero Section */}
      <section className="bg-[url('/images/banner3.webp')] bg-cover bg-center text-white py-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-44">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
            About Equity Law & Co.
          </h1>
          <p className="text-xl text-amber-100 md:max-w-3xl">
            A full-service law firm in Nepal dedicated to delivering practical,
            reliable, and result-oriented legal solutions rooted in fairness and
            equity.
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-amber-50">
        <div className=" mx-auto px-4 sm:px-6 lg:px-64">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-serif text-amber-900 mb-6">
                Our History
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Equity Law & Co. was established in <strong>2014 A.D.</strong>{" "}
                as "Equity Law Chamber," beginning as a specialized legal
                practice committed to providing expert counsel across various
                practice areas.
              </p>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                In <strong>2025 A.D.</strong>, the firm underwent strategic
                restructuring to become "Equity Law & Co.," reflecting its
                institutional growth, expanded service offerings, and
                institutional strength. This transformation marks our commitment
                to serving clients with even greater expertise and resources.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Throughout our journey, we have maintained our founding
                principle: law should not be merely applied but applied
                equitably, taking into account the concept of fairness,
                reasonableness, and the real-life circumstances of those seeking
                justice.
              </p>
            </div>
            <div className="bg-amber-50 p-8 rounded-lg border-2 border-amber-200">
              <div className="space-y-6">
                <div className="border-l-4 border-amber-700 pl-6">
                  <div className="text-3xl font-bold text-amber-900">2014</div>
                  <p className="text-slate-700 mt-2">
                    Founded as Equity Law Chamber
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
                    Serving clients with distinction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Pillars */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-64">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4">
              Our Core Pillars
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              The four principles that guide every decision and action at Equity
              Law & Co., represented in our logo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="bg-white p-8 rounded-lg border-2 border-amber-100 hover:border-amber-700 transition-all hover:shadow-lg"
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
      <section className="bg-[url('/images/banner1.jpg')] bg-cover bg-center text-white py-20 ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-44">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
            Our Commitment
          </h1>
          <p className="text-xl text-white font-semibold  max-w-3xl">
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

      <section className="py-20 bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-64">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
            <div className="bg-gray-500 text-white p-10 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-100 mb-4">
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
      <section className="py-20 bg-amber-50 ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-64">
          <h2 className="text-4xl font-bold font-serif text-amber-900 mb-4 text-center">
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
