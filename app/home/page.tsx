

'use client'
import PrawinChatbot from "@/components/PrawinChatbot"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from "framer-motion"
import { ArrowDown, Code, Sparkles, Rocket } from "lucide-react"
import Link from "next/link"
import SplashScreen from "@/components/SplashScreen";


const Home = () => {
    return (

        <>
            <>
                <Navbar/>

                <div className="min-h-screen pt-16 flex items-center justify-center">
                    {/* ✅ Top Navbar */}
                    {/*<nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md z-50">*/}
                    {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
                    {/*        <div className="flex justify-between items-center h-16">*/}
                    {/*            <div className="text-2xl font-bold text-purple-600">SPK</div>*/}
                    {/*            <div className="space-x-6 hidden md:flex">*/}
                    {/*                <Link href="/projects" className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition">*/}
                    {/*                    Projects*/}
                    {/*                </Link>*/}
                    {/*                <Link href="/tech-stack" className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition">*/}
                    {/*                    Tech Stack*/}
                    {/*                </Link>*/}
                    {/*                <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition">*/}
                    {/*                    About*/}
                    {/*                </Link>*/}
                    {/*                <Link href="/contact" className="text-gray-800 dark:text-gray-200 hover:text-purple-600 transition">*/}
                    {/*                    Contact*/}
                    {/*                </Link>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</nav>*/}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            {/* Hero Section */}
                            <motion.div
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8}}
                                className="mb-8"
                            >
                                <motion.div
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    transition={{delay: 0.2, type: "spring", stiffness: 200}}
                                    className="mb-6"
                                >
                                    <div
                                        className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1">
                                        <div
                                            className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <span
                      className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    SPK
                  </span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.h1
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="text-5xl md:text-7xl font-bold mb-6"
                                >
              <span
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                S Prawin Kumar
              </span>
                                </motion.h1>

                                <motion.h2
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6}}
                                    className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
                                >
                                    Full Stack Developer & Gen AI Enthusiast
                                </motion.h2>

                                <motion.p
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.8}}
                                    className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
                                >
                                    Building intelligent solutions with code and creativity. Passionate about
                                    creating impactful technology
                                    that bridges the gap between innovation and real-world applications.
                                </motion.p>
                            </motion.div>

                            {/* Feature Cards */}
                            <motion.div
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 1}}
                                className="grid md:grid-cols-3 gap-8 mb-12"
                            >
                                {[
                                    {
                                        icon: <Code className="w-8 h-8"/>,
                                        title: "Full Stack Development",
                                        description: "Building end-to-end solutions with modern technologies",
                                    },
                                    {
                                        icon: <Sparkles className="w-8 h-8"/>,
                                        title: "Gen AI Integration",
                                        description: "Leveraging AI to create intelligent applications",
                                    },
                                    {
                                        icon: <Rocket className="w-8 h-8"/>,
                                        title: "Innovation Focus",
                                        description: "Turning creative ideas into scalable solutions",
                                    },
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{scale: 1.05, y: -5}}
                                        className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg"
                                    >
                                        <div
                                            className="text-purple-600 dark:text-purple-400 mb-4 flex justify-center">{feature.icon}</div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 1.2}}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            >
                                <a
                                    href="https://drive.google.com/uc?export=download&id=1zRg1jok2uHfupx58K5sya7Z45ovDhB7g"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        Download Resume
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 12l-7.5 7.5L4.5 12M12 19.5V4.5"/>
                                        </svg>
                                    </motion.button>
                                </a>


                                <Link href="/contact">
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                                    >
                                        Get In Touch
                                    </motion.button>
                                </Link>
                            </motion.div>

                            {/*/!* Scroll Indicator *!/*/}
                            {/*<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-16">*/}
                            {/*    <motion.div*/}
                            {/*        animate={{ y: [0, 10, 0] }}*/}
                            {/*        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}*/}
                            {/*        className="flex justify-center"*/}
                            {/*    >*/}
                            {/*        <ArrowDown className="w-6 h-6 text-purple-600 dark:text-purple-400" />*/}
                            {/*    </motion.div>*/}
                            {/*</motion.div>*/}
                        </div>
                    </div>
                </div>
            </>
            <Footer/>
            <PrawinChatbot/>
        </>
    )
}

export default Home
