import { motion } from "framer-motion";
import { Globe, GraduationCap, Briefcase, Building2 } from "lucide-react";

const services = [
  {
    title: "Tourist Visa",
    icon: Globe,
    description:
      "Personalized tourist visa assistance for leisure, sightseeing, and short-term travel to popular destinations worldwide.",
  },
  {
    title: "Student Visa",
    icon: GraduationCap,
    description:
      "Specialized visa services for students seeking education opportunities abroad including universities and institutions.",
  },
  {
    title: "Work Visa",
    icon: Briefcase,
    description:
      "Comprehensive work permit and employment visa solutions for professionals seeking international career opportunities.",
  },
  {
    title: "Business Visa",
    icon: Building2,
    description:
      "Expert business visa assistance for entrepreneurs, investors, and corporate travelers for seamless international commerce.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 bg-surface-subtle dark:bg-surface-dark"
    >
      <div className="container-page">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow mx-auto">Services</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold text-ink-900 dark:text-white">
            Our Visa Services
          </h2>
          <p className="mt-3 text-ink-500 dark:text-ink-300 max-w-2xl mx-auto">
            Comprehensive visa solutions tailored to your travel needs
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariant}
                className="bg-white dark:bg-surface-dark-subtle rounded-xl2 border border-ink-100 dark:border-ink-800 p-6 transition-all hover:shadow-soft-lg hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-ink-50 dark:bg-ink-800 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-ink-700 dark:text-stamp-400" />
                </div>
                <h3 className="text-lg font-display font-semibold text-ink-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-ink-500 dark:text-ink-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
