import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { CheckCircle, ArrowRight, Shield, Globe } from 'lucide-react';
import heroTravel from '../assets/hero-travel.jpg';
import bg1 from '../assets/bg-1.avif';
import bg2 from '../assets/bg2.avif';

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Subtle floating animation for the stats card */
const floatingY = {
  y: [0, -8, 0],
  transition: {
    duration: 3.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/* ─── Data ─── */
const trustPoints = [
  { icon: Shield, label: 'Verified & Secure' },
  { icon: Globe, label: '15+ Countries' },
];

const partners = [
  'TravelPro',
  'VisaWorld',
  'GlobalPass',
  'SwiftVisa',
  'PassportHub',
  'VisaExpress',
];

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-50/40 via-white to-white">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-stamp-100/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[340px] h-[340px] rounded-full bg-ink-100/20 blur-3xl pointer-events-none" />

      {/* ─── Hero Content ─── */}
      <div className="container-page pt-6 pb-10 md:pt-8 md:pb-14 lg:pt-10 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* ─── Left Column ─── */}
          <motion.div
            className="w-full lg:w-[55%] space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-stamp-50 text-stamp-600 text-xs font-semibold px-4 py-1.5 rounded-full ring-1 ring-stamp-200/50">
                ✈️ Trusted Visa Partner Since 2015
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.375rem] font-extrabold text-ink-900 leading-[1.15]"
            >
              Your visa journey{' '}
              <br className="hidden sm:block" />
              <span className="text-stamp-500">
                <Typewriter
                  words={['starts here', 'made seamless', 'our first priority']}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2200}
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-ink-500 text-base md:text-lg max-w-lg leading-relaxed"
            >
              Navigate complex visa processes with confidence. Our expert team
              provides personalized guidance to ensure fast approvals and
              hassle-free travel worldwide.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/all-visas"
                className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shadow-soft hover:shadow-soft-lg transition-all duration-200"
              >
                Apply for Visa
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => {
                  const el = document.querySelector('#services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Explore Services
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap items-center gap-5 pt-1"
            >
              {trustPoints.map((tp, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-green-100 text-green-600">
                    <tp.icon size={15} />
                  </span>
                  <span className="text-ink-600 text-sm font-medium">{tp.label}</span>
                  {i < trustPoints.length - 1 && (
                    <span className="hidden sm:block w-px h-5 bg-ink-200 ml-3" />
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-green-100 text-green-600">
                  <CheckCircle size={15} />
                </span>
                <span className="text-ink-600 text-sm font-medium">100% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right Column ─── */}
          <motion.div
            className="w-full lg:w-[45%] relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Main Image */}
            <motion.div
              variants={scaleIn}
              className="relative rounded-2xl overflow-hidden shadow-soft-lg aspect-[5/6] md:aspect-[4/5]"
            >
              <img
                src={heroTravel}
                alt="Travel destination"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
            </motion.div>

            {/* Secondary image – top-left overlap */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="hidden md:block absolute -left-6 top-10 w-24 h-24 lg:w-32 lg:h-32 rounded-xl2 overflow-hidden shadow-soft-lg ring-4 ring-white"
            >
              <img src={bg1} alt="Destination" className="w-full h-full object-cover" />
            </motion.div>

            {/* Secondary image – bottom-left overlap */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="hidden md:block absolute -left-5 bottom-14 w-20 h-20 lg:w-28 lg:h-28 rounded-xl2 overflow-hidden shadow-soft-lg ring-4 ring-white"
            >
              <img src={bg2} alt="Destination" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Stats Card with subtle animation */}
            <motion.div
              variants={fadeUp}
              custom={4}
              animate={floatingY}
              className="absolute -bottom-3 right-3 md:right-5 bg-white/95 backdrop-blur-sm rounded-xl2 shadow-soft-lg px-4 py-3 flex items-center gap-3 border border-ink-100/50"
            >
              <span className="flex items-center justify-center h-10 w-10 rounded-full bg-stamp-50">
                <span className="text-stamp-500 text-base font-bold">🌍</span>
              </span>
              <div>
                <p className="font-display text-xl font-extrabold text-ink-900">800+</p>
                <p className="text-ink-400 text-xs font-medium">Satisfied Clients</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Trusted Partners Strip ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="border-t border-ink-100/60 bg-ink-50/30"
      >
        <div className="container-page py-6">
          <p className="text-center text-ink-400 text-sm mb-4">
            Trusted by travelers and organizations worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {partners.map((name) => (
              <span
                key={name}
                className="text-ink-300 font-semibold text-lg select-none tracking-tight transition-colors hover:text-ink-500"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
