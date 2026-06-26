import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    feedback:
      'The facility is clean, the consultants are knowledgeable, and the appointment process was very smooth!',
    rating: 5,
    country: 'India',
  },
  {
    id: 2,
    name: 'Natasha K.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback:
      'A truly professional team. The consultation was thorough, and the staff made me feel comfortable throughout my visit. Highly recommended!',
    rating: 5,
    country: 'USA',
  },
  {
    id: 3,
    name: 'Daniel Thomas',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    feedback:
      'I had an excellent experience at Visa Navigator. From the moment I walked in, the staff were friendly and explained everything clearly and provided the right treatment.',
    rating: 4,
    country: 'UK',
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    feedback:
      'Outstanding service! The online application tracking was brilliant. I could see exactly where my application stood at every step of the process.',
    rating: 5,
    country: 'Spain',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark">
      <div className="container-page">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-ink-900 dark:text-white text-center"
        >
          What Our Clients Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-ink-500 dark:text-ink-400 text-center max-w-2xl mx-auto mb-12 mt-3"
        >
          Real experiences from travelers who trusted us with their visa journey
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white dark:bg-surface-dark-subtle rounded-xl2 border border-ink-100 dark:border-ink-800 p-6 relative"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-4 right-5 text-5xl leading-none text-ink-100 dark:text-ink-800 font-serif select-none pointer-events-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < t.rating
                        ? 'text-stamp-400 fill-stamp-400'
                        : 'text-ink-200 dark:text-ink-700'
                    }`}
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-ink-600 dark:text-ink-300 leading-relaxed italic text-sm">
                {t.feedback}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-ink-800 dark:text-white text-sm">
                    {t.name}
                  </p>
                  <p className="text-sm text-ink-400">{t.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
