import { motion } from "framer-motion";
import { Calendar, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import aboutImg from "../assets/about-consultation.jpg";

const statCards = [
  {
    value: "10+",
    label: "Years Experience",
    icon: Calendar,
    position: "top-4 -right-4 md:top-6 md:-right-6",
  },
  {
    value: "15+",
    label: "Expert Consultants",
    icon: Users,
    position: "bottom-24 -right-4 md:bottom-28 md:-right-6",
  },
  {
    value: "800+",
    label: "Satisfied Clients",
    icon: Heart,
    position: "-bottom-4 left-1/2 -translate-x-1/2 md:-bottom-5",
  },
];

const avatars = [
  { initials: "JD", bg: "bg-ink-600" },
  { initials: "AS", bg: "bg-stamp-500" },
  { initials: "MR", bg: "bg-emerald-500" },
  { initials: "KL", bg: "bg-sky-500" },
  { initials: "TP", bg: "bg-rose-500" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-surface-dark overflow-hidden"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left Column – Image ── */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
              <img
                src={aboutImg}
                alt="Visa consultation session"
                className="w-full h-[360px] md:h-[460px] object-cover"
              />
            </div>

            {/* Floating stat cards – hidden on small screens */}
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  custom={idx + 1}
                  variants={fadeUp}
                  className={`absolute hidden md:flex items-center gap-3 bg-white dark:bg-surface-dark-subtle rounded-xl shadow-soft px-4 py-3 ${card.position}`}
                >
                  <span className="w-10 h-10 rounded-lg bg-ink-50 dark:bg-ink-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-ink-700 dark:text-stamp-400" />
                  </span>
                  <div>
                    <p className="text-lg font-display font-bold text-ink-900 dark:text-white leading-none">
                      {card.value}
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-300">
                      {card.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Avatar row */}
            <div className="flex items-center mt-6 gap-1">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className={`w-9 h-9 rounded-full ${a.bg} text-white text-xs font-semibold flex items-center justify-center ring-2 ring-white dark:ring-surface-dark -ml-2 first:ml-0`}
                >
                  {a.initials}
                </span>
              ))}
              <span className="ml-2 text-sm text-ink-500 dark:text-ink-400">
                Join 800+ happy clients
              </span>
            </div>
          </motion.div>

          {/* ── Right Column – Text ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0.5}
          >
            <span className="section-eyebrow">About</span>

            <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold text-ink-900 dark:text-white leading-tight">
              At Visa Navigator, we are committed to delivering high‑quality,
              client‑centered visa services with compassion and integrity.
            </h2>

            <p className="mt-5 text-ink-500 dark:text-ink-300 leading-relaxed">
              With over a decade of medical{" "}
              <strong className="text-ink-700 dark:text-white">
                excellence
              </strong>
              , our team of certified and experienced consultants provides
              comprehensive visa assistance using modern technology and
              evidence‑based practices.
            </p>

            <Link to="/about" className="btn-primary inline-block mt-8">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
