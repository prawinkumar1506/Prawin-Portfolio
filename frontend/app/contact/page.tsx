'use client'
import emailjs from '@emailjs/browser';

import { useEffect, useState } from "react";



import { motion } from "framer-motion"
import { Mail, LinkedinIcon, GithubIcon, InstagramIcon, TwitterIcon, Send, MapPin } from "lucide-react"
import Navbar from "@/components/Navbar"
import PrawinChatbot from "@/components/PrawinChatbot"
import Footer from '@/components/Footer'
import toast from 'react-hot-toast';

const Contact = () => {
    useEffect(() => {
        emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
    }, []);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const socialLinks = [
        {
            name: "LinkedIn",
            icon: <LinkedinIcon className="w-6 h-6" />,
            url: "https://www.linkedin.com/in/prawin-kumar-s-a60153284/",
            color: "hover:text-blue-600 dark:hover:text-blue-400",
        },
        {
            name: "GitHub",
            icon: <GithubIcon className="w-6 h-6" />,
            url: "https://github.com/prawinkumar1506",
            color: "hover:text-gray-800 dark:hover:text-gray-300",
        },
        {
            name: "Instagram",
            icon: <InstagramIcon className="w-6 h-6" />,
            url: "https://www.instagram.com/prawin._.spk/",
            color: "hover:text-pink-600 dark:hover:text-pink-400",
        },
        {
            name: "Twitter",
            icon: <TwitterIcon className="w-6 h-6" />,
            url: "https://x.com/JEEAsp39595",
            color: "hover:text-blue-500 dark:hover:text-blue-400",
        },
        {
            name: "Email",
            icon: <Mail className="w-6 h-6" />,
            url: "mailto:prawinkumar1506@gmail.com",
            color: "hover:text-red-600 dark:hover:text-red-400",
        },
    ]

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }



// Initialize once — e.g., in your component or a useEffect
     // Replace with your actual key

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    name: formData.name,
                    email: formData.email,
                    title: formData.subject,
                    message: formData.message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            console.log("EmailJS SUCCESS:", result);
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", subject: "", message: "" });

        } catch (error) {
            // This shows the *whole* object & its properties
            console.error("EmailJS ERROR (raw):", error);
            console.error("Error.text:", error?.text);
            console.error("Error.status:", error?.status);
            toast.error(`Failed to send. Error: ${error?.text || "Unknown"}`);
        }

        finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
        <>
            <Navbar/>
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        Get in Touch with Prawin
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Let's connect and discuss opportunities, collaborations, or just have a chat about technology and
                        innovation. I'm always excited to meet new people!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Contact Details */}
                        <div className="p-8 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Contact Information</h2>

                            <div className="space-y-4">
                                <motion.div whileHover={{ x: 10 }} className="flex items-center">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-2xl mr-4">
                                        <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                        <a
                                            href="mailto:prawinkumar1506@gmail.com"
                                            className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                        >
                                            prawinkumar1506@gmail.com
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ x: 10 }} className="flex items-center">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl mr-4">
                                        <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Chennai, Tamil Nadu, India</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="p-8 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Connect with Me</h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
                                    >
                                        {social.icon}
                                        <span className="text-sm font-medium mt-2">{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 shadow-lg"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Send a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="Your Name"
                                    />
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </motion.div>
                            </div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                    placeholder="What's this about?"
                                />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                                    placeholder="Tell me about your project, idea, or just say hello!"
                                />
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
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

export default Contact
