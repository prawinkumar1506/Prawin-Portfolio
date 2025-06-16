'use client'
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8"
        >
            <div className="max-w-7xl mx-auto px-4 flex flex-row md:flex-row justify-between items-center">
                <div className="mb-3 md:mb-0 text-center md:text-left">
                    <h3 className="text-xl font-bold">S Prawin Kumar</h3>
                    <p className="text-sm text-white/80">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                {/* If you want to re-enable links later:
        <div className="flex space-x-6">
          <Link href="/projects" className="hover:underline hover:text-white font-medium transition">
            Projects
          </Link>
          <Link href="/about" className="hover:underline hover:text-white font-medium transition">
            About
          </Link>
          <Link href="/contact" className="hover:underline hover:text-white font-medium transition">
            Contact
          </Link>
        </div>
        */}
            </div>
        </motion.footer>
    );
};

export default Footer;
