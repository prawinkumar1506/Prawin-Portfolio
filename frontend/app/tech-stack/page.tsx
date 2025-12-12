'use client'


import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { Code, Database, Brain, Wrench } from "lucide-react"
import PrawinChatbot from "@/components/PrawinChatbot";

const TechStack = () => {
    const techCategories = [
        {
            title: "Programming Languages",
            icon: <Code className="w-8 h-8" />,
            color: "from-blue-500 to-purple-500",
            technologies: [
                { name: "Python" },
                { name: "JavaScript" },
                { name: "Java" },
                { name: "C++" },
                { name: "C" },
            ],
        },
        {
            title: "Web Technologies",
            icon: <Code className="w-8 h-8" />,
            color: "from-green-500 to-blue-500",
            technologies: [
                { name: "React.js", level: 90 },
                { name: "HTML/CSS", level: 95 },
                { name: "SpringBoot", level: 75 },
                { name: "Flask", level: 80 },
                { name: "Bootstrap", level: 85 },
            ],
        },
        {
            title: "Databases",
            icon: <Database className="w-8 h-8" />,
            color: "from-purple-500 to-pink-500",
            technologies: [
                { name: "MySQL", level: 85 },
                { name: "MongoDB", level: 80 },
                { name: "Oracle", level: 75 },
                { name: "Firebase Firestore", level: 80 },
                { name: "NoSQL", level: 75 },
            ],
        },
        {
            title: "Generative AI",
            icon: <Brain className="w-8 h-8" />,
            color: "from-pink-500 to-red-500",
            technologies: [
                { name: "Hugging Face Transformers", level: 85 },
                { name: "LangChain", level: 80 },
                { name: "RAG", level: 85 },
                { name: "LLM", level: 80 },
                { name: "LoRA/QLoRA", level: 75 },
                { name: "OpenAI API", level: 90 },
            ],
        },
        {
            title: "Tools & Others",
            icon: <Wrench className="w-8 h-8" />,
            color: "from-orange-500 to-yellow-500",
            technologies: [
                { name: "Git/GitHub", level: 90 },
                { name: "Flutter", level: 70 },
                { name: "Android Studio", level: 75 },
                { name: "WebStorm", level: 85 },
                { name: "IntelliJ", level: 80 },
                { name: "Arduino", level: 65 },
            ],
        },
    ]

    return (
        <>
        <>
            <Navbar/>
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        Tech Stack
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        A comprehensive overview of the technologies, frameworks, and tools I use to build innovative solutions and
                        bring ideas to life.
                    </p>
                </motion.div>

                {/* Tech Categories */}
                <div className="space-y-12">
                    {techCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.2 }}
                            className="p-8 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg"
                        >
                            {/* Category Header */}
                            <div className="flex items-center mb-8">
                                <div className={`p-3 rounded-2xl bg-gradient-to-r ${category.color} text-white mr-4`}>
                                    {category.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{category.title}</h2>
                            </div>

                            {/* Technologies Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.technologies.map((tech, techIndex) => (
                                    <motion.div
                                        key={techIndex}
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{
                                            delay: categoryIndex * 0.2 + techIndex * 0.1,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            transition: {type: "spring", stiffness: 400},
                                        }}
                                        className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></span>
                                            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">{tech.name}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Floating Tech Bubbles Animation */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                    className="fixed inset-0 pointer-events-none overflow-hidden"
                >
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20"
                            animate={{
                                x: [0, 100, 0],
                                y: [0, -100, 0],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.5,
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
            </>
            <PrawinChatbot/>
            </>
    )
}

export default TechStack
