'use client'
import Navbar from "@/components/Navbar"
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Award } from 'lucide-react'
import React from 'react'
import PrawinChatbot from "@/components/PrawinChatbot";
import Footer from '@/components/Footer'
const AboutPage = () => {
    const experiences = [
        {
            title: 'Generative AI Engineer',
            company: 'EinNel Technologies',
            type: 'Internship',
            link: 'https://einnel.com/',
            description: 'Worked on multi-AI agent systems and advanced AI orchestration for intelligent task automation.',
        },
        {
            title: 'Web Master',
            company: 'AGS Scientific Company',
            type: 'Role',
            link: 'https://www.agsscientific.com/',
            description: 'Managing and developing web solutions for scientific equipment company.',
        },
        {
            title: 'Web Master Team',
            company: 'SSN IEEE PES',
            type: 'Role',
            description: 'Leading web development initiatives for IEEE Power & Energy Society chapter.',
        },
    ]

    const education = [
        {
            degree: 'B.E. Computer Science and Engineering',
            institution: 'SSN College of Engineering',
            status: 'Pre Final Year',
            cgpa: '8.719',
            icon: <GraduationCap className="w-6 h-6" />,
        },
        {
            degree: 'B.Sc. Data Science',
            institution: 'IIT Madras',
            status: 'Ongoing',
            cgpa: '7.75',
            icon: <GraduationCap className="w-6 h-6" />,
        },
    ]

    const achievements = [
        "Top 7 finalist in Odoo x Paradox IITM Hackathon 2025",
        "Winners of SSN ACM Turtle Graphics Competition",
        "IEEE Xtreme 24-Hour Coding Competition – AIR 364, Global Rank 1254",
        "Represented college in multiple chess tournaments across Tamil Nadu",
        "Competed in state-level chess championships with strong performance",
        "School Topper with 97.6% in CBSE Board Exams",

    ]


    return (
        <>
        <>
            <Navbar/>
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        About Me
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
                        I'm a full stack developer and Gen AI enthusiast with a passion for building impactful tech
                        solutions that bridge innovation with real-world applications.
                    </p>

                    {/* Profile Photo */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/prawin.jpg"
                            alt="S Prawin Kumar"
                            className="w-40 h-40 rounded-full shadow-lg border-4 border-purple-400 dark:border-purple-600 object-cover transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                            S Prawin Kumar
                        </h3>
                    </div>


                </motion.div>


                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Experience Section */}
                    <motion.div initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}} transition={{delay: 0.2}}>
                        <div className="flex items-center mb-8">
                            <Briefcase className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3"/>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Experience &
                                Activities</h2>
                        </div>

                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3 + index * 0.1}}
                                    className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{exp.title}</h3>
                                        <span
                                            className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full">
                      {exp.type}
                    </span>
                                    </div>
                                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                                        {exp.link ? (
                                            <a href={exp.link} target="_blank" rel="noopener noreferrer"
                                               className="hover:underline">
                                                {exp.company}
                                            </a>
                                        ) : (
                                            exp.company
                                        )}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education Section */}
                    <motion.div initial={{opacity: 0, x: 50}} animate={{opacity: 1, x: 0}} transition={{delay: 0.4}}>
                        <div className="flex items-center mb-8">
                            <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3"/>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Education</h2>
                        </div>

                        <div className="space-y-6 mb-12">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.5 + index * 0.1}}
                                    className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg"
                                >
                                    <div className="flex items-start mb-3">
                                        <div className="text-purple-600 dark:text-purple-400 mr-3 mt-1">{edu.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">{edu.degree}</h3>
                                            <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">{edu.institution}</p>
                                            <div className="flex justify-between items-center">
                                                <span
                                                    className="text-sm text-gray-600 dark:text-gray-400">{edu.status}</span>
                                                <span
                                                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                          CGPA: {edu.cgpa}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Achievements */}
                        <div className="flex items-center mb-6">
                            <Award className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3"/>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Achievements</h2>
                        </div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.7}}
                            className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg"
                        >
                            <div className="grid grid-cols-1 gap-3">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.8 + index * 0.1}}
                                        className="flex items-center"
                                    >
                                        <div
                                            className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
        </>
            <Footer/>
            <PrawinChatbot/>
            </>
    )
}

export default AboutPage
