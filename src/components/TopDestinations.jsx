import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

import usa from '../assets/usa.jpg';
import can from '../assets/Canada.jpg';
import aus from '../assets/Australia.webp';
import germany from '../assets/germany.webp';
import india from '../assets/india.webp';
import japan from '../assets/japan.jpg';

const destinations = [
  {
    id: 1,
    name: 'USA',
    flag: '🇺🇸',
    image: usa,
    categories: ['Tourist', 'Student', 'Work'],
    successRate: '92%',
    processingTime: '2-4 weeks',
  },
  {
    id: 2,
    name: 'Canada',
    flag: '🇨🇦',
    image: can,
    categories: ['Tourist', 'Student', 'Business'],
    successRate: '89%',
    processingTime: '3-5 weeks',
  },
  {
    id: 3,
    name: 'Australia',
    flag: '🇦🇺',
    image: aus,
    categories: ['Student', 'Work', 'Tourist'],
    successRate: '85%',
    processingTime: '4-6 weeks',
  },
  {
    id: 4,
    name: 'Germany',
    flag: '🇩🇪',
    image: germany,
    categories: ['Work', 'Student', 'Business'],
    successRate: '88%',
    processingTime: '3-4 weeks',
  },
  {
    id: 5,
    name: 'India',
    flag: '🇮🇳',
    image: india,
    categories: ['Tourist', 'Business'],
    successRate: '90%',
    processingTime: '1-2 weeks',
  },
  {
    id: 6,
    name: 'Japan',
    flag: '🇯🇵',
    image: japan,
    categories: ['Tourist', 'Work', 'Student'],
    successRate: '87%',
    processingTime: '2-3 weeks',
  },
];

const tabs = ['All', 'Tourist', 'Student', 'Work', 'Business'];

const TopDestinations = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? destinations
      : destinations.filter((d) => d.categories.includes(activeTab));

  return (
    <section
      id="destinations"
      className="py-20 bg-surface-subtle dark:bg-surface-dark"
    >
      <div className="container-page">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-ink-900 dark:text-white text-center"
        >
          Meet Our Visa Destinations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-ink-500 dark:text-ink-400 text-center max-w-2xl mx-auto mb-8 mt-3"
        >
          Explore the most popular countries with high visa approval rates
        </motion.p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-ink-700 text-white'
                  : 'bg-ink-50 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Destination Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="bg-white dark:bg-surface-dark-subtle rounded-xl2 border border-ink-100 dark:border-ink-800 overflow-hidden hover:shadow-soft-lg transition-all group"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-xl font-display font-semibold text-ink-900 dark:text-white">
                    {dest.flag} {dest.name}
                  </h3>

                  {/* Category Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {dest.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-ink-50 dark:bg-ink-800 text-ink-600 dark:text-ink-300 text-xs px-2.5 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      {dest.successRate}
                    </span>
                    <span className="flex items-center gap-1 text-ink-500 dark:text-ink-400">
                      <Clock className="w-4 h-4" />
                      {dest.processingTime}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/all-visas?country=${dest.name}`}
                    className="btn-ghost mt-4 border border-ink-200 dark:border-ink-700 w-full justify-center inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ink-700 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
                  >
                    Explore Visas
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default TopDestinations;
