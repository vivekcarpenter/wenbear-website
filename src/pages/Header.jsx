import { useState } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "AI Solutions", href: "#ai-solutions" },
    { name: "About Us", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blogs" },
  ];

  return (
    <motion.header
      className="fixed w-full bg-white shadow-lg z-50 bg-gradient-to-r from-gray-200 to-gray-100 p-0"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="h-12">
              <img
                src={logo}
                alt="WenBear Technologies"
                className="h-full w-auto bg-transparent"
                loading="lazy"
              />
            </a>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-gray-800 font-medium hover:text-primary relative"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="#contact"
              className="hidden md:block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition whitespace-nowrap"
            >
              Get in Touch
            </a>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <RiMenuLine className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Slide from Bottom) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-40 md:hidden"
          >
            <div className="flex justify-end p-4">
              <button
                className="w-10 h-10 flex items-center justify-center text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6 p-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-medium text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition text-center mt-4 whitespace-nowrap"
              >
                Get in Touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
