// "use client"
//
// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
//
// import { motion } from "framer-motion"
// import { Menu, X, Sun, Moon } from "lucide-react"
// import { useTheme } from "@/contexts/ThemeContext"
//
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const pathname = usePathname()
//   const { isDark, toggleTheme } = useTheme()
//
//   const menuItems = [
//     { name: "Home", path: "/home" },
//     { name: "About", path: "/about" },
//     { name: "Tech Stack", path: "/tech-stack" },
//     { name: "Projects", path: "/projects" },
//     { name: "Contact", path: "/contact" },
//   ]
//
//   return (
//       <motion.nav
//           initial={{ y: -100 }}
//           animate={{ y: 0 }}
//           className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-purple-200 dark:border-purple-800"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center">
//               <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
//               >
//                 Prawin Kumar
//               </motion.div>
//             </Link>
//
//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8">
//               {menuItems.map((item) => (
//                   <Link
//                       key={item.name}
//                       href={item.path}
//                       className={`relative px-3 py-2 text-sm font-medium transition-colors ${
//                           pathname === item.path
//                               ? "text-purple-600 dark:text-purple-400"
//                               : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
//                       }`}
//                   >
//                     {item.name}
//                     {pathname === item.path && (
//                         <motion.div
//                             layoutId="activeTab"
//                             className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
//                         />
//                     )}
//                   </Link>
//               ))}
//
//               {/* Theme Toggle */}
//               <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={toggleTheme}
//                   className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
//               >
//                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
//               </motion.button>
//             </div>
//
//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center space-x-2">
//               <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={toggleTheme}
//                   className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
//               >
//                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
//               </motion.button>
//
//               <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-gray-700 dark:text-gray-300">
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//
//           {/* Mobile Menu */}
//           {isOpen && (
//               <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="md:hidden py-4 border-t border-purple-200 dark:border-purple-800"
//               >
//                 {menuItems.map((item) => (
//                     <Link
//                         key={item.name}
//                         href={item.path}
//                         onClick={() => setIsOpen(false)}
//                         className={`block px-3 py-2 text-base font-medium transition-colors ${
//                             pathname === item.path
//                                 ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/50"
//                                 : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
//                         }`}
//                     >
//                       {item.name}
//                     </Link>
//                 ))}
//               </motion.div>
//           )}
//         </div>
//       </motion.nav>
//   )
// }
//
// export default Navbar
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { motion } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { isDark, toggleTheme } = useTheme()

    const menuItems = [
        { name: "Home", path: "/home" },
        { name: "About", path: "/about" },
        { name: "Tech Stack", path: "/tech-stack" },
        { name: "Projects", path: "/projects" },
        { name: "Contact", path: "/contact" },
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-purple-200 dark:border-purple-800"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_200%] bg-clip-text text-transparent animate-shimmer"
                        >
                            Port Folio
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                                    pathname === item.path
                                        ? "text-purple-600 dark:text-purple-400"
                                        : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                }`}
                            >
                                {item.name}
                                {pathname === item.path && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                                    />
                                )}
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>

                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-gray-700 dark:text-gray-300">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t border-purple-200 dark:border-purple-800"
                    >
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 text-base font-medium transition-colors ${
                                    pathname === item.path
                                        ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/50"
                                        : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* 💫 Custom shimmer effect animation */}
            <style jsx>{`
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
          background-size: 200% 200%;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
        </motion.nav>
    )
}

export default Navbar
