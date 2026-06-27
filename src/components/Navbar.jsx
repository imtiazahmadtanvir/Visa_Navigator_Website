import { Link, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../provider/AuthProvider';
import logo from '../assets/logo.png';
import defaultPic from '../assets/defulteimage.png';
import { Menu, X, ChevronDown, LogOut, UserIcon } from 'lucide-react';

const ADMIN_EMAIL = 'imtiaztanveer07@gmail.com';

const baseLinks = [
  { label: 'Services', path: '#services' },
  { label: 'Destinations', path: '#destinations' },
];

const authLinks = [
  { label: 'All Visas', path: '/all-visas' },
  { label: 'My Applications', path: '/my-visa-applications' },
];

const adminLinks = [
  { label: 'Add Visa', path: '/add-visa' },
  { label: 'My Added Visas', path: '/my-added-visas' },
];

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  // Build navigation links based on auth state
  const navLinks = [
    ...baseLinks,
    ...(user ? authLinks : []),
    ...(user && isAdmin ? adminLinks : []),
  ];

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogOut = () => {
    logOut();
    setDropdownOpen(false);
  };

  const isActive = (path) => {
    if (path.startsWith('#')) return false;
    return location.pathname === path;
  };

  const handleNavClick = (path) => {
    if (path.startsWith('#')) {
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-soft border-b border-ink-100/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-page flex items-center justify-between h-14 md:h-16">
          {/* ─── Logo ─── */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src={logo}
              alt="Visa Navigator"
              className="h-8 w-8 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-bold text-base text-ink-900 tracking-tight hidden sm:inline">
              Visa <span className="text-stamp-500">Navigator</span>
            </span>
          </Link>

          {/* ─── Desktop Links ─── */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.path} className="relative">
                {link.path.startsWith('#') ? (
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="relative px-3 py-1.5 text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors rounded-lg"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="relative px-3 py-1.5 text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors rounded-lg inline-block"
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-1 -bottom-0.5 h-0.5 bg-stamp-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* ─── Desktop Right ─── */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-ink-100 hover:border-ink-200 bg-white hover:bg-ink-50/50 transition-all duration-200"
                >
                  <img
                    src={user.photoURL || defaultPic}
                    alt={user.displayName || 'User'}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-stamp-100"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-medium text-ink-700 max-w-[100px] truncate">
                    {user.displayName || 'User'}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-ink-400 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl2 shadow-soft-lg border border-ink-100 overflow-hidden py-1.5"
                    >
                      <div className="px-4 py-2.5 border-b border-ink-100/60">
                        <p className="text-sm font-semibold text-ink-800 truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-ink-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/my-profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-900 transition-colors"
                      >
                        <UserIcon size={15} />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth/login" className="btn-primary text-sm px-4 py-2 rounded-full">
                Contact Us
              </Link>
            )}
          </div>

          {/* ─── Mobile Hamburger ─── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-ink-700 hover:bg-ink-100/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink-900/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-soft-lg lg:hidden flex flex-col"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-5 h-14 border-b border-ink-100/60">
                <Link
                  to="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <img src={logo} alt="Visa Navigator" className="h-8 w-8 rounded-lg" />
                  <span className="font-display font-bold text-ink-900">
                    Visa <span className="text-stamp-500">Navigator</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-ink-100/60 text-ink-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.path.startsWith('#') ? (
                        <button
                          onClick={() => {
                            handleNavClick(link.path);
                            setMobileOpen(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900 transition-colors"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          to={link.path}
                          className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isActive(link.path)
                              ? 'bg-stamp-50 text-stamp-600'
                              : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Mobile footer */}
              <div className="border-t border-ink-100/60 p-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-1">
                      <img
                        src={user.photoURL || defaultPic}
                        alt={user.displayName || 'User'}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-stamp-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink-800 truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-ink-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to="/my-profile"
                        className="flex-1 btn-secondary text-xs text-center py-2 rounded-lg"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="flex-1 bg-red-50 text-red-500 text-xs font-medium py-2 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/auth/login"
                    className="btn-primary w-full text-center text-sm py-2.5 rounded-full block"
                  >
                    Contact Us
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
