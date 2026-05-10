/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Play, CheckCircle2, ChevronRight, Quote, Check } from "lucide-react";

const FadeInView = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number; key?: React.Key }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const ProjectCalculator = () => {
  const [serviceType, setServiceType] = React.useState<"design" | "development" | "both">("both");
  const [pages, setPages] = React.useState(5);
  const [needContent, setNeedContent] = React.useState(false);
  const [needSEO, setNeedSEO] = React.useState(false);
  const [timeline, setTimeline] = React.useState<"regular" | "fast" | "rush">("regular");

  const calculatePrice = () => {
    let base = 499;
    let perPage = 200;

    if (serviceType === "design") {
      base = 399;
      perPage = 100;
    } else if (serviceType === "development") {
      base = 199;
      perPage = 100;
    }

    let total = Math.max(base, base + (pages - 1) * perPage);
    if (needContent) total += pages * 50;
    if (needSEO) total += pages * 50;
    
    if (timeline === "rush") total += pages * 100;
    if (timeline === "fast") total += pages * 25;

    return total;
  };

  const calculateAgencyCost = () => {
    const perPage = serviceType === "both" ? 1000 : 400;
    return 8000 + (pages - 1) * perPage;
  };

  const calculateFreelancerCost = () => {
    const perPage = serviceType === "both" ? 500 : 200;
    return 3000 + (pages - 1) * perPage;
  };

  const currentPrice = calculatePrice();
  const agencyPrice = calculateAgencyCost();
  const freelancerPrice = calculateFreelancerCost();

  return (
    <section id="calculator-section" className="py-16 md:py-28 px-4 md:px-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <FadeInView>
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 font-mono">Try project estimation calculator</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Get premium website within <br /> <span className="font-instrument italic">your budget</span>
            </h2>
          </div>
        </FadeInView>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Left Column: Calculator Form */}
          <div className="bg-[#0D0D0D] p-8 lg:p-12 divide-y divide-[#1E1E1E]">
            {/* Service Type */}
            <div className="pb-10">
              <h3 className="text-lg font-bold uppercase tracking-tight text-white/90 mb-6">What kind of service do you need?</h3>
              <div className="flex flex-col gap-4">
                {[
                  { id: "design", label: "Only Design" },
                  { id: "development", label: "Only Development" },
                  { id: "both", label: "Design + Development" }
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-4 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="serviceType" 
                      value={option.id}
                      checked={serviceType === option.id}
                      onChange={(e) => setServiceType(e.target.value as any)}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${serviceType === option.id ? 'border-[#FF5656]' : 'border-white/10'}`}>
                      {serviceType === option.id && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />}
                    </div>
                    <span className={`text-sm font-semibold uppercase tracking-wider transition-colors ${serviceType === option.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Pages */}
            <div className="py-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold uppercase tracking-tight text-white/90">Number of Pages</h3>
                <span className="text-2xl font-bold font-instrument italic text-[#FF5656]">{pages}</span>
              </div>
              <div className="relative w-full h-12 flex items-center">
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1" 
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF5656]"
                />
                <div className="absolute -bottom-2 w-full flex justify-between text-[10px] font-bold text-white/20 tracking-widest uppercase">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="py-10">
              <h3 className="text-lg font-bold uppercase tracking-tight text-white/90 mb-6">Additional Services</h3>
              <div className="flex flex-col gap-6">
                {[
                  { id: "content", label: "I will need help with content", price: "+$50/page", state: needContent, setState: setNeedContent },
                  { id: "seo", label: "I want to optimize my website for SEO", price: "+$50/page", state: needSEO, setState: setNeedSEO }
                ].map((addon) => (
                  <label key={addon.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        checked={addon.state}
                        onChange={(e) => addon.setState(e.target.checked)}
                        className="hidden"
                      />
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${addon.state ? 'border-[#FF5656] bg-[#FF5656]' : 'border-white/10'}`}>
                        {addon.state && <Check size={14} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className={`text-sm font-semibold uppercase tracking-wider transition-colors ${addon.state ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                        {addon.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#FF5656] font-mono tracking-tighter">{addon.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-10">
              <h3 className="text-lg font-bold uppercase tracking-tight text-white/90 mb-6">How fast do you need this?</h3>
              <div className="flex flex-col gap-4">
                {[
                  { id: "rush", label: "Within 7 Days", price: "+$100/page" },
                  { id: "fast", label: "Within 14 Days", price: "+$25/page" },
                  { id: "regular", label: "Regular Speed (Based on discussion)", price: "No extra cost" }
                ].map((option) => (
                  <label key={option.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="timeline" 
                        value={option.id}
                        checked={timeline === option.id}
                        onChange={(e) => setTimeline(e.target.value as any)}
                        className="hidden"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${timeline === option.id ? 'border-[#FF5656]' : 'border-white/10'}`}>
                        {timeline === option.id && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />}
                      </div>
                      <span className={`text-sm font-semibold uppercase tracking-wider transition-colors ${timeline === option.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#FF5656] font-mono tracking-tighter uppercase">{option.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Cost Estimation */}
          <div className="bg-[#0a0a0a] p-8 lg:p-12 border-l border-white/10 min-h-[720px] flex flex-col">
            <div className="mb-12">
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-white mb-2">Estimated Cost</h3>
              <p className="text-white/40 text-sm font-medium">Clear pricing tailored to your unique requirements.</p>
            </div>

            <div className="space-y-6 flex-grow flex flex-col">
              {/* Agency Card */}
              <div className="bg-white/5 rounded-[24px] p-8 border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Typical Agency charges minimum</p>
                <div className="text-4xl font-bold text-white tracking-tighter">${agencyPrice.toLocaleString()}</div>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-tight mt-3">+ Too much extra time & additional cost</p>
              </div>

              {/* Freelancer Card */}
              <div className="bg-white/5 rounded-[24px] p-8 border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Regular Freelancer charges minimum</p>
                <div className="text-4xl font-bold text-white tracking-tighter">${freelancerPrice.toLocaleString()}</div>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-tight mt-3">+ Too much headache & back-and-forth</p>
              </div>

              {/* Your Price Card */}
              <div className="bg-gradient-to-br from-[#FF5656] via-[#FF8A56] to-[#FF5656] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(255,86,86,0.2)] flex flex-col justify-center mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 mb-2">With Cognitoxlabs</p>
                <div className="text-6xl font-bold text-white tracking-tighter leading-tight animate-pulse-slow">${currentPrice.toLocaleString()}</div>
                <p className="text-[11px] font-bold text-white/90 uppercase tracking-tight mt-4">Save your money, time & headache</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="relative w-full bg-[#0a0a0a] text-white font-barlow selection:bg-white/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
        />

        {/* Navigation Bar */}
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between w-full max-w-6xl h-16 px-6 bg-white/95 backdrop-blur-md rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20"
          >
            {/* Logo */}
            <div className="flex items-center text-[#222] font-semibold text-lg hover:opacity-80 transition-opacity cursor-pointer">
              Cognitoxlabs
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-8 text-[#222] text-[14px] font-medium uppercase tracking-tight">
              {["About", "Works", "Services", "Testimonial"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:opacity-60 transition-opacity"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button className="flex items-center gap-2 px-4 h-10 bg-[#222] text-white rounded-full text-xs font-medium transition-transform active:scale-95 group">
              Book A Free Meeting
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </div>
            </button>
          </motion.nav>
        </div>

        {/* Hero Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24">
          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-center justify-center leading-[0.9] text-white"
          >
            <span className="text-[60px] md:text-[84px] font-bold tracking-[-4px] uppercase">
              Build{" "}
            </span>
            <span className="mx-2 md:mx-4 font-instrument italic text-[84px] md:text-[110px] text-white leading-none">
              stunning
            </span>
            <span className="text-[60px] md:text-[84px] font-bold tracking-[-4px] uppercase">
              {" "}with us
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[18px] font-medium text-white/95 max-w-2xl leading-relaxed"
          >
            Website Designing and Development for business and startups
          </motion.p>

          {/* Secondary CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <button className="flex items-center gap-3 px-10 py-5 bg-white text-[#222] rounded-full text-[14px] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
              <Play fill="currentColor" size={14} className="transition-transform group-hover:scale-110" />
              See Our Workreel
            </button>
          </motion.div>
        </main>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeInView>
            <h2 className="text-[48px] md:text-[64px] font-bold leading-tight tracking-tight uppercase">
              We design for <br />
              <span className="font-instrument italic text-white/50 lowercase">the future.</span>
            </h2>
            <p className="mt-8 text-xl text-white/60 leading-relaxed max-w-lg font-medium">
              At Cognitoxlabs, we blend strategy with stunning visual narratives. We are a collection of dreamers, builders, and designers dedicated to scaling your digital presence.
            </p>
            <div className="mt-12 flex flex-col gap-4">
              {['6+ Successful Projects', 'Global Client Base', 'Award Winning Design'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-lg font-semibold uppercase tracking-tight text-white/80">
                  <CheckCircle2 size={20} className="text-white/40" />
                  {item}
                </div>
              ))}
            </div>
          </FadeInView>
          <FadeInView delay={0.2}>
            <div className="relative aspect-square rounded-[32px] overflow-hidden bg-white/5 border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                alt="Workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-2xl font-instrument italic">"Innovation is not just about tools, but about the impact we leave behind."</p>
                <p className="mt-2 text-sm uppercase tracking-widest text-white/40 font-bold">Our Philosophy</p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-24 bg-white text-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInView>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">Selected Portfolio</p>
                <h2 className="text-[48px] md:text-[64px] font-bold leading-none tracking-tighter uppercase">
                  Featured <span className="font-instrument italic lowercase">projects</span>
                </h2>
              </div>
              <p className="max-w-xs text-black/60 font-medium leading-relaxed">Creating digital impact through tailored experiences and pixel perfection.</p>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Nexus UI Kit', category: 'Product Design', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
              { title: 'Aetheria App', category: 'Development', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' },
              { title: 'Lumina Brand', category: 'Branding', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
              { title: 'Zenith Site', category: 'E-commerce', img: 'https://images.unsplash.com/photo-1541462608141-67571a670297?auto=format&fit=crop&q=80&w=800' }
            ].map((work, idx) => (
              <FadeInView key={idx} delay={idx * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[16/10] bg-gray-100 rounded-[24px] overflow-hidden">
                    <img 
                      src={work.img} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={work.title}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform delay-100 duration-300">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-bold uppercase tracking-tight">{work.title}</h3>
                      <p className="text-black/40 font-bold tracking-widest uppercase text-xs mt-2">{work.category}</p>
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <div className="text-center mb-20">
              <h2 className="text-[48px] md:text-[64px] font-bold leading-none uppercase tracking-tighter">
                Our <span className="font-instrument italic lowercase">expertise</span>
              </h2>
              <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto font-medium">Providing end-to-end solutions for the digital era.</p>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            {[
              { title: 'Graphic Design', desc: 'Visual storytelling and brand identities that resonate and stick.' },
              { title: 'UI/UX Design', desc: 'User-centric interfaces optimized for engagement and conversion.' },
              { title: 'Web Development', desc: 'Robust, scalable, and high-performance web solutions for the modern web.' },
              { title: 'SEO Strategy', desc: 'Data-driven optimization to put your business at the top of search.' },
              { title: 'Brand Strategy', desc: 'Positioning your brand to stand out in a crowded marketplace.' },
              { title: 'Digital Marketing', desc: 'Performance marketing focused on measurable growth and ROI.' }
            ].map((service, idx) => (
              <div key={idx} className="bg-[#0a0a0a] p-12 hover:bg-white/5 transition-all duration-500 group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-10 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <ChevronRight size={20} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{service.title}</h3>
                <p className="text-white/40 leading-relaxed font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonial" className="py-24 bg-white text-[#0a0a0a] overflow-hidden border-y border-black/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeInView>
            <div className="flex justify-center mb-12">
              <Quote size={56} className="text-black/5" fill="currentColor" />
            </div>
            <h2 className="text-[36px] md:text-[56px] font-instrument italic leading-[1.1] mb-16 tracking-tight">
              "Working with Cognitoxlabs was the best decision for our startup. They took our vision and turned it into a digital reality that exceeded all expectations."
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-black/5 shadow-xl">
                <img src="https://i.pravatar.cc/150?u=12" alt="Client" className="w-full h-full object-cover" />
              </div>
              <p className="font-bold uppercase tracking-widest text-sm">Alex Rivera</p>
              <p className="text-black/40 text-[10px] font-bold uppercase mt-2">Founder, TechVanguard</p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Calculator Section */}
      <ProjectCalculator />

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left mb-16">
            <div>
               <div className="font-bold text-3xl uppercase tracking-tighter mb-4">Cognitoxlabs</div>
               <p className="text-white/40 max-w-xs font-medium">Crafting digital excellence for world-class brands and emerging startups.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-sm font-bold uppercase tracking-widest text-white/40">
              {['About', 'Works', 'Services', 'Testimonial'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            <div>© 2026 COGNITOXLABS. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
