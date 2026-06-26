import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { CheckCircle, ArrowRight } from 'lucide-react';
import heroTravel from '../assets/hero-travel.jpg';
import bg1 from '../assets/bg-1.avif';
import bg2 from '../assets/bg2.avif';

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Data ─── */
const stats = [
  { icon: '✓', label: 'Trusted & Verified', highlight: false },
  { value: '100%', label: 'Success Rate' },
  { value: '10+', label: 'Years Experience' },
  { value: '15+', label: 'Countries Served' },
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
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-stamp-100/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-ink-100/20 blur-3xl pointer-events-none" />

      {/* ─── Hero Content ─── */}
      <div className="container-page pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ─── Left Column ─── */}
          <motion.div
            className="w-full lg:w-[57%] space-y-7"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-stamp-50 text-stamp-600 text-xs font-semibold px-4 py-1.5 rounded-full">
                ✈️ #1 Visa Navigation Portal in the World
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-tight"
            >
              Your visa journey{' '}
              <br className="hidden sm:block" />
              <span className="text-stamp-500">
                <Typewriter
                  words={['our first priority', 'made seamless', 'starts here']}
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
              className="text-ink-500 text-base md:text-lg max-w-xl leading-relaxed"
            >
              Your visa matters more than a typical approval. With our experienced
              team, your visa is approved with care when you trust us.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-3.5"
            >
              <Link
                to="/all-visas"
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Get Started Now
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/all-visas"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Apply for Visa
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap items-center gap-5 pt-2"
            >
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  {s.icon ? (
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                      <CheckCircle size={16} />
                    </span>
                  ) : (
                    <span className="font-display font-extrabold text-xl text-ink-900">
                      {s.value}
                    </span>
                  )}
                  <span className="text-ink-500 text-sm font-medium">{s.label}</span>
                  {i < stats.length - 1 && (
                    <span className="hidden sm:block w-px h-5 bg-ink-200 ml-3" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right Column ─── */}
          <motion.div
            className="w-full lg:w-[43%] relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Main Image */}
            <motion.div
              variants={scaleIn}
              className="relative rounded-2xl overflow-hidden shadow-soft-lg aspect-[4/5] md:aspect-[3/4]"
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
              className="hidden md:block absolute -left-8 top-12 w-28 h-28 lg:w-36 lg:h-36 rounded-xl2 overflow-hidden shadow-soft-lg ring-4 ring-white"
            >
              <img src={bg1} alt="Destination" className="w-full h-full object-cover" />
            </motion.div>

            {/* Secondary image – bottom-left overlap */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="hidden md:block absolute -left-6 bottom-16 w-24 h-24 lg:w-32 lg:h-32 rounded-xl2 overflow-hidden shadow-soft-lg ring-4 ring-white"
            >
              <img src={bg2} alt="Destination" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Stats Card */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="absolute -bottom-4 right-4 md:right-6 bg-white rounded-xl2 shadow-soft-lg px-5 py-4 flex items-center gap-3 border border-ink-100/50"
            >
              <span className="flex items-center justify-center h-11 w-11 rounded-full bg-stamp-50">
                <span className="text-stamp-500 text-lg font-bold">🌍</span>
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold text-ink-900">800+</p>
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
        transition={{ delay: 1, duration: 0.8 }}
        className="border-t border-ink-100/60 bg-ink-50/30"
      >
        <div className="container-page py-8">
          <p className="text-center text-ink-400 text-sm mb-5">
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
