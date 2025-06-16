// 'use client'
//
//
//
// import Navbar from "@/components/Navbar"
// import { motion } from "framer-motion"
// import { ExternalLink, GithubIcon } from "lucide-react"
// import PrawinChatbot from "@/components/PrawinChatbot";
//
// const Projects = () => {
//     const projects = [
//         {
//             title: "SEGAT - Smart Engineering Graphics Assessment Tool",
//             description:
//                 "An AI-powered assessment platform for engineering graphics that automatically evaluates technical drawings and provides instant feedback to students.",
//             image: "/placeholder.svg?height=300&width=500",
//             techStack: ["Python", "OpenCV", "Machine Learning", "Flask", "React"],
//             github: "#",
//             demo: "#",
//             featured: true,
//         },
//         {
//             title: "U R Hired – Enhanced Job Screening with AI",
//             description:
//                 "Revolutionary job screening platform that uses AI to match candidates with positions based on skills, experience, and cultural fit.",
//             image: "/placeholder.svg?height=300&width=500",
//             techStack: ["Python", "NLP", "React", "Node.js", "MongoDB"],
//             github: "#",
//             demo: "#",
//             featured: true,
//         },
//         {
//             title: "ChessMate – Ultimate Chess Learning Platform",
//             description:
//                 "Comprehensive chess learning platform with AI-powered move analysis, interactive tutorials, and personalized training programs.",
//             image: "/placeholder.svg?height=300&width=500",
//             techStack: ["JavaScript", "React", "Chess.js", "Stockfish", "Firebase"],
//             github: "#",
//             demo: "#",
//             featured: false,
//         },
//         {
//             title: "AI-Driven Real-Time Traffic Light Optimization",
//             description:
//                 "Smart traffic management system that uses computer vision and AI to optimize traffic light timing based on real-time traffic conditions.",
//             image: "/placeholder.svg?height=300&width=500",
//             techStack: ["Python", "OpenCV", "TensorFlow", "IoT", "Arduino"],
//             github: "#",
//             demo: "#",
//             featured: false,
//         },
//         {
//             title: "VoyageMind – AI Travel Planner",
//             description:
//                 "Intelligent travel planning application that creates personalized itineraries using AI, considering preferences, budget, and real-time data.",
//             image: "/placeholder.svg?height=300&width=500",
//             techStack: ["React", "Python", "OpenAI API", "Maps API", "Firebase"],
//             github: "#",
//             demo: "#",
//             featured: false,
//         },
//     ]
//
//     const getTechColor = (tech) => {
//         const colors = {
//             Python: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
//             JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
//             React: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
//             "Machine Learning": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
//             OpenCV: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
//             "Node.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
//             MongoDB: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
//             Firebase: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
//             default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//         }
//         return colors[tech] || colors.default
//     }
//
//     return (
//         <>
//         <>
//             <Navbar/>
//         <div className="min-h-screen pt-24 pb-16">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Header */}
//                 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
//                         Projects
//                     </h1>
//                     <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//                         A showcase of my work in full-stack development, AI integration, and innovative solutions that solve
//                         real-world problems.
//                     </p>
//                 </motion.div>
//
//                 {/* Featured Projects */}
//                 <div className="mb-16">
//                     <motion.h2
//                         initial={{ opacity: 0, x: -30 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8"
//                     >
//                         Featured Projects
//                     </motion.h2>
//
//                     <div className="grid lg:grid-cols-2 gap-8">
//                         {projects
//                             .filter((project) => project.featured)
//                             .map((project, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 50 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.2 }}
//                                     whileHover={{ y: -10 }}
//                                     className="group relative overflow-hidden rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-2xl transition-all duration-300"
//                                 >
//                                     {/* Project Image */}
//                                     <div className="relative overflow-hidden">
//                                         <img
//                                             src={project.image || "/placeholder.svg"}
//                                             alt={project.title}
//                                             className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//
//                                         {/* Overlay Buttons */}
//                                         <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                             <motion.a
//                                                 href={project.github}
//                                                 whileHover={{ scale: 1.1 }}
//                                                 whileTap={{ scale: 0.9 }}
//                                                 className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-full text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
//                                             >
//                                                 <GithubIcon className="w-6 h-6" />
//                                             </motion.a>
//                                             <motion.a
//                                                 href={project.demo}
//                                                 whileHover={{ scale: 1.1 }}
//                                                 whileTap={{ scale: 0.9 }}
//                                                 className="p-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
//                                             >
//                                                 <ExternalLink className="w-6 h-6" />
//                                             </motion.a>
//                                         </div>
//                                     </div>
//
//                                     {/* Project Content */}
//                                     <div className="p-6">
//                                         <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
//                                             {project.title}
//                                         </h3>
//                                         <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>
//
//                                         {/* Tech Stack */}
//                                         <div className="flex flex-wrap gap-2">
//                                             {project.techStack.map((tech, techIndex) => (
//                                                 <span
//                                                     key={techIndex}
//                                                     className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
//                                                 >
//                           {tech}
//                         </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                     </div>
//                 </div>
//
//                 {/* Other Projects */}
//                 <div>
//                     <motion.h2
//                         initial={{ opacity: 0, x: -30 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.5 }}
//                         className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8"
//                     >
//                         Other Projects
//                     </motion.h2>
//
//                     <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//                         {projects
//                             .filter((project) => !project.featured)
//                             .map((project, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 30 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: 0.6 + index * 0.1 }}
//                                     whileHover={{ y: -5, scale: 1.02 }}
//                                     className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300"
//                                 >
//                                     <div className="flex justify-between items-start mb-4">
//                                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
//                                             {project.title}
//                                         </h3>
//                                         <div className="flex space-x-2">
//                                             <motion.a
//                                                 href={project.github}
//                                                 whileHover={{ scale: 1.1 }}
//                                                 whileTap={{ scale: 0.9 }}
//                                                 className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
//                                             >
//                                                 <GithubIcon className="w-5 h-5" />
//                                             </motion.a>
//                                             <motion.a
//                                                 href={project.demo}
//                                                 whileHover={{ scale: 1.1 }}
//                                                 whileTap={{ scale: 0.9 }}
//                                                 className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
//                                             >
//                                                 <ExternalLink className="w-5 h-5" />
//                                             </motion.a>
//                                         </div>
//                                     </div>
//
//                                     <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{project.description}</p>
//
//                                     <div className="flex flex-wrap gap-1">
//                                         {project.techStack.slice(0, 3).map((tech, techIndex) => (
//                                             <span
//                                                 key={techIndex}
//                                                 className={`px-2 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
//                                             >
//                         {tech}
//                       </span>
//                                         ))}
//                                         {project.techStack.length > 3 && (
//                                             <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
//                         +{project.techStack.length - 3}
//                       </span>
//                                         )}
//                                     </div>
//                                 </motion.div>
//                             ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//             </>
//             <PrawinChatbot/>
//             </>
//     )
// }
//
// export default Projects


//
//
// // v2
// 'use client'
// import Navbar from "@/components/Navbar"
// //import { motion } from "framer-motion"
// //import { ExternalLink, GithubIcon } from "lucide-react"
// import PrawinChatbot from "@/components/PrawinChatbot";
// import { useRef, useState, useEffect } from "react"
// import { motion, useInView, useAnimation, stagger } from "framer-motion"
// import { GithubIcon, ExternalLink, Zap, Star } from "lucide-react"
// import Footer from '@/components/Footer'
// // ======================================================================
// // Project Data (Update video paths as needed)
// // ======================================================================
// const featuredProjects = [
//     {
//         title: "EcoFinds – Sustainable Marketplace",
//         period: "June 2025 – Present",
//         description: "Full-stack sustainable marketplace with React/Flask/MongoDB.",
//         skills: ["React.js", "Flask", "MongoDB", "Tailwind"],
//         category: "Full-Stack",
//         video: "/videos/ecofinds-demo.mov",
//         github: "https://github.com/prawinkumar1506/EcoFinds",
//         gradient: "from-green-500 to-emerald-600"
//     },
//     {
//         title: "U R Hired – AI Recruitment",
//         period: "March 2025 – Present",
//         description: "AI-powered recruitment platform with React/Vite/Flask.",
//         skills: ["React.js", "Vite", "AI/ML", "Python"],
//         video: "/videos/urhired-demo.mp4",
//         github: "https://github.com/prawinkumar1506/URHired",
//         gradient: "from-blue-500 to-indigo-600"
//     }
// ]
//
// const otherProjects = [
//     {
//         title: "SEGAT AI Tool",
//         description: "AI-powered engineering graphics solution.",
//         skills: ["Python", "AutoCAD AI", "ChatGPT API"],
//         video: "/videos/segat.mp4",
//         github: "https://github.com/prawinkumar1506/segat-ai",
//         gradient: "from-purple-500 to-violet-600"
//     },
//     {
//         title: "Crew AI Task System",
//         description: "Multi-agent AI task management.",
//         skills: ["Python", "CrewAI", "Gemini"],
//         video: "/videos/crewai.mp4",
//         github: "https://github.com/prawinkumar1506/crew-ai-tasks",
//         gradient: "from-orange-500 to-red-600"
//     },
//     {
//         title: "VoyageMind Travel AI",
//         description: "Personalized travel itineraries with AI.",
//         skills: ["GenAI", "React.js", "API"],
//         video: "/videos/voyagemind.mp4",
//         github: "https://github.com/prawinkumar1506/voyagemind",
//         gradient: "from-cyan-500 to-blue-600"
//     },
//     {
//         title: "ChessMate Platform",
//         description: "Java-based chess learning with AI bot.",
//         skills: ["Java", "Chess Engine", "React"],
//         video: "/videos/chessmate.mp4",
//         github: "https://github.com/prawinkumar1506/chessmate",
//         gradient: "from-amber-500 to-orange-600"
//     }
// ]
// // ======================================================================
// // Component
// // ======================================================================
// const Projects = () => {
//     const sliderRef = useRef<HTMLDivElement>(null)
//     const controls = useAnimation()
//     const [isMounted, setIsMounted] = useState(false)
//
//     // Hydration fix
//     useEffect(() => setIsMounted(true), [])
//
//     // Scroll handlers
//     const scroll = (direction: 'left' | 'right') => {
//         if (sliderRef.current) {
//             const scrollAmount = sliderRef.current.offsetWidth * 0.8
//             sliderRef.current.scrollBy({
//                 left: direction === 'left' ? -scrollAmount : scrollAmount,
//                 behavior: 'smooth'
//             })
//         }
//     }
//
//     // Animation triggers
//     const ref = useRef(null)
//     const isInView = useInView(ref, { once: true, margin: "-100px" })
//
//     useEffect(() => {
//         if (isInView) {
//             controls.start("visible")
//         }
//     }, [controls, isInView])
//
//     return (
//         <>
//             <>
//                 <Navbar/>
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-slate-900 py-24">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Header */}
//                 <motion.div
//                     ref={ref}
//                     initial="hidden"
//                     animate={controls}
//                     variants={{
//                         hidden: { opacity: 0, y: 30 },
//                         visible: { opacity: 1, y: 0 }
//                     }}
//                     className="text-center mb-20"
//                 >
//                     <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
//                         Project Portfolio
//                     </h1>
//                     <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//                         Cutting-edge solutions combining modern tech stack with AI capabilities
//                     </p>
//                 </motion.div>
//
//                 {/* Featured Projects Grid */}
//                 <motion.section
//                     variants={{
//                         hidden: { opacity: 0 },
//                         visible: {
//                             opacity: 1,
//                             transition: {
//                                 staggerChildren: 0.2,
//                                 delayChildren: 0.3
//                             }
//                         }
//                     }}
//                     initial="hidden"
//                     animate={controls}
//                     className="grid md:grid-cols-2 gap-8 mb-28"
//                 >
//                     {featuredProjects.map((project, idx) => (
//                         <motion.div
//                             key={idx}
//                             variants={{
//                                 hidden: { opacity: 0, scale: 0.9 },
//                                 visible: { opacity: 1, scale: 1 }
//                             }}
//                             className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-2xl hover:shadow-3xl transition-shadow duration-500"
//                         >
//                             <div className="relative h-80">
//                                 {isMounted && (
//                                     <video
//                                         autoPlay
//                                         muted
//                                         loop
//                                         playsInline
//                                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                                     >
//                                         <source src={project.video} type="video/mp4" />
//                                     </video>
//                                 )}
//                                 <div className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-20`} />
//                             </div>
//
//                             <div className="p-6">
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <Zap className="w-6 h-6 text-purple-600" />
//                                     <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{project.title}</h3>
//                                 </div>
//                                 <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {project.skills.map((skill, i) => (
//                                         <span
//                                             key={i}
//                                             className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
//                                         >
//                       {skill}
//                     </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.section>
//
//                 {/* Other Projects Slider */}
//                 <section className="relative">
//                     <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
//                         Other Innovations
//                         <span className="ml-4 text-purple-600">↔</span>
//                     </h2>
//
//                     {/* Slider Controls */}
//                     <button
//                         onClick={() => scroll('left')}
//                         className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-800 p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
//                     >
//                         ←
//                     </button>
//                     <button
//                         onClick={() => scroll('right')}
//                         className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-800 p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
//                     >
//                         →
//                     </button>
//
//                     {/* Slider Container */}
//                     <div
//                         ref={sliderRef}
//                         className="flex overflow-x-auto scrollbar-hide space-x-8 pb-8 pl-4 pr-16"
//                     >
//                         {otherProjects.map((project, idx) => (
//                             <motion.div
//                                 key={idx}
//                                 initial={{ opacity: 0, x: 50 }}
//                                 whileInView={{ opacity: 1, x: 0 }}
//                                 viewport={{ once: true, margin: "0px 100px 0px 0px" }}
//                                 className="min-w-[300px] max-w-[400px] flex-shrink-0 relative group"
//                             >
//                                 <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
//                                     <div className="relative h-56 overflow-hidden rounded-t-2xl">
//                                         {isMounted && (
//                                             <video
//                                                 autoPlay
//                                                 muted
//                                                 loop
//                                                 playsInline
//                                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                                             >
//                                                 <source src={project.video} type="video/mp4" />
//                                             </video>
//                                         )}
//                                         <div className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-20`} />
//                                     </div>
//
//                                     <div className="p-6">
//                                         <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
//                                             {project.title}
//                                         </h3>
//                                         <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
//                                             {project.description}
//                                         </p>
//                                         <div className="flex flex-wrap gap-2">
//                                             {project.skills.map((skill, i) => (
//                                                 <span
//                                                     key={i}
//                                                     className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full"
//                                                 >
//                           {skill}
//                         </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </div>
//             </>
//             <Footer/>
//             <PrawinChatbot/>
//         </>
//     )
// }
//
// export default Projects

//v3
'use client'
import Navbar from "@/components/Navbar"
import Footer from '@/components/Footer'
import PrawinChatbot from "@/components/PrawinChatbot";
import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Zap, Star } from "lucide-react"

// Project Data
const featuredProjects = [
    {
        title: "EcoFinds – Sustainable Marketplace",
        period: "June 2025 – Present",
        description: "Full-stack sustainable marketplace with React/Flask/MongoDB.",
        skills: ["React.js", "Flask", "MongoDB", "Tailwind"],
        category: "Full-Stack",
        video: "/videos/ecofinds-demo.mov",
        github: "https://github.com/prawinkumar1506/EcoFinds",
        external: "https://ecofinds.live",
        gradient: "from-green-500 to-emerald-600"
    },
    {
        title: "U R Hired – AI Recruitment",
        period: "March 2025 – Present",
        description: "AI-powered recruitment platform with React/Vite/Flask.",
        skills: ["React.js", "Vite", "AI/ML", "Python"],
        video: "/videos/urhired-demo.mp4",
        github: "https://github.com/prawinkumar1506/URHired",
        external: "https://urhired.live",
        gradient: "from-blue-500 to-indigo-600"
    }
]

const otherProjects = [
    {
        title: "SEGAT AI Tool",
        description: "AI-powered engineering graphics solution.",
        skills: ["Python", "AutoCAD AI", "  Gemini API","RAG","LangChain"],
        video: "/videos/segat.mp4",
        github: "https://github.com/prawinkumar1506/SEGAT-using-GEN-AI-",
        external: "",
        gradient: "from-purple-500 to-violet-600"
    },
    {
        title: "Crew AI Task System",
        description: "Multi-agent AI task management.",
        skills: ["Python", "CrewAI", "Gemini"],
        video: "/videos/crewai.mp4",
        github: "https://github.com/prawinkumar1506/crew-ai-tasks",
        external: "",
        gradient: "from-orange-500 to-red-600"
    },
    {
        title: "VoyageMind Travel AI",
        description: "Personalized travel itineraries with AI.",
        skills: ["GenAI", "React.js", "API"],
        video: "/videos/voyagemind.mp4",
        github: "https://github.com/prawinkumar1506/VoyageMind",
        external: "",
        gradient: "from-cyan-500 to-blue-600"
    },
    {
        title: "ChessMate Platform",
        description: "Java-based chess learning with AI bot.",
        skills: ["Java", "Chess Engine", "React"],
        video: "/videos/chessmate.mp4",
        github: "https://github.com/prawinkumar1506/chessmate",
        external: "",
        gradient: "from-amber-500 to-orange-600"
    }
]

// Modal Animation Variants
const modalVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 100, scale: 0.95, transition: { duration: 0.2 } }
}

const Projects = () => {
    const sliderRef = useRef(null)
    const controls = useAnimation()
    const [isMounted, setIsMounted] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)

    useEffect(() => setIsMounted(true), [])

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth * 0.8
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const openModal = (project) => {
        setSelectedProject(project)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setTimeout(() => setSelectedProject(null), 300)
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-slate-900 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                            Project Portfolio
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Cutting-edge solutions combining modern tech stack with AI capabilities
                        </p>
                    </motion.div>

                    {/* Featured Projects */}
                    <motion.section
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 gap-8 mb-28"
                    >
                        {featuredProjects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(80,0,200,0.15)" }}
                                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-2xl hover:shadow-3xl transition-shadow duration-500 cursor-pointer"
                                onClick={() => openModal(project)}
                            >
                                <div className="relative h-80">
                                    {isMounted && (
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        >
                                            <source src={project.video} type="video/mp4" />
                                        </video>
                                    )}
                                    <div className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-20`} />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Zap className="w-6 h-6 text-purple-600" />
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{project.title}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.section>

                    {/* Other Projects Slider */}
                    <section className="relative">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                            Other Innovations
                            <span className="ml-4 text-purple-600">↔</span>
                        </h2>
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-800 p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
                        >←</button>
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-800 p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
                        >→</button>
                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto scrollbar-hide space-x-8 pb-8 pl-4 pr-16"
                        >
                            {otherProjects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "0px 100px 0px 0px" }}
                                    whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(80,0,200,0.13)" }}
                                    className="min-w-[300px] max-w-[400px] flex-shrink-0 relative group cursor-pointer"
                                    onClick={() => openModal(project)}
                                >
                                    <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                        <div className="relative h-56 overflow-hidden rounded-t-2xl">
                                            {isMounted && (
                                                <video
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                >
                                                    <source src={project.video} type="video/mp4" />
                                                </video>
                                            )}
                                            <div className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-20`} />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.skills.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            {/* Animated Modal */}
            <AnimatePresence>
                {modalOpen && selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 250, damping: 22 }}
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 text-2xl"
                                onClick={closeModal}
                            >×</button>
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {selectedProject.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedProject.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedProject.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-6">
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-purple-100 dark:hover:bg-purple-900 transition"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>GitHub</span>
                                </a>
                                {selectedProject.external && (
                                    <a
                                        href={selectedProject.external}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
            <PrawinChatbot />
        </>
    )
}

export default Projects
