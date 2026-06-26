import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import schedulingImg from "../assets/scheduling-cta.jpg";

const features = [
  "Real-time application tracking",
  "Expert consultation at every step",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function SchedulingCTA() {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* ── Left Column – Text ── */}
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-900 dark:text-white leading-tight">
              Quick, Easy &amp; Hassle‑Free Application
            </h2>

            <p className="mt-4 text-ink-500 dark:text-ink-300 leading-relaxed">
              Our streamlined visa application process eliminates complexity.
              Submit your documents, track progress in real‑time, and receive
              expert guidance every step of the way.
            </p>

            <ul className="mt-6 space-y-3">
              {features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-2 text-ink-700 dark:text-ink-200"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/auth/login"
              className="btn-primary inline-block mt-6 !px-8 !py-3"
            >
              Book a Consultation
            </Link>
          </motion.div>

          {/* ── Right Column – Image ── */}
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              ...fadeUp,
              visible: {
                ...fadeUp.visible,
                transition: { ...fadeUp.visible.transition, delay: 0.15 },
              },
            }}
          >
            <div className="rounded-2xl overflow-hidden shadow-soft-lg">
              <img
                src={schedulingImg}
                alt="Easy visa application process"
                className="w-full h-[320px] md:h-[420px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
