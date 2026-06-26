import { Link } from 'react-router-dom';
import { Twitter, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Destinations', to: '/#destinations' },
];

const services = [
  { label: 'Tourist Visa', to: '/all-visas?type=tourist' },
  { label: 'Student Visa', to: '/all-visas?type=student' },
  { label: 'Work Visa', to: '/all-visas?type=work' },
  { label: 'Business Visa', to: '/all-visas?type=business' },
];

const socials = [
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Youtube, href: '#', label: 'Youtube' },
];

const Footer = () => {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="container-page py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Visa Navigator" className="h-9 w-auto" />
              <span className="text-xl font-display font-bold text-white">
                Visa Navigator
              </span>
            </div>
            <p className="text-ink-300 text-sm leading-relaxed mt-3">
              Simplifying visa processes and immigration services for travelers
              worldwide.
            </p>
            <div className="mt-4 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-full bg-ink-800 text-ink-300 hover:bg-stamp-400 hover:text-ink-900 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-base mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col">
              {quickLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-ink-300 text-sm hover:text-stamp-400 transition-colors block py-1.5"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-semibold text-base mb-4">
              Services
            </h4>
            <nav className="flex flex-col">
              {services.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-ink-300 text-sm hover:text-stamp-400 transition-colors block py-1.5"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-semibold text-base mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stamp-400 flex-shrink-0 mt-0.5" />
                <span className="text-ink-300 text-sm">
                  123 Business Avenue, Suite 500, New York, NY 10001
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-stamp-400 flex-shrink-0 mt-0.5" />
                <span className="text-ink-300 text-sm">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-stamp-400 flex-shrink-0 mt-0.5" />
                <span className="text-ink-300 text-sm">
                  info@visanavigator.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ink-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ink-400 text-sm">
            &copy; 2024 Visa Navigator. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/terms"
              className="text-ink-400 text-sm hover:text-stamp-400 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-ink-400 text-sm hover:text-stamp-400 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
