'use client'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
    { lang: "English", text: "Hello!" },
    { lang: "Spanish", text: "¡Hola!" },
    { lang: "French", text: "Bonjour!" },
    { lang: "German", text: "Hallo!" },
    { lang: "Japanese", text: "こんにちは!" },
    { lang: "Hindi", text: "नमस्ते!" },
    { lang: "Chinese", text: "你好!" },
    { lang: "Russian", text: "Привет!" },
    // ...add more as needed
];

export default function SplashScreen() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % greetings.length);
        }, 300);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
            {/* Rotating Greeting */}
            <div className="mb-4 h-16 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={greetings[index].text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-semibold"
                        style={{ color: "#a78bfa" }}
                    >
                        {greetings[index].text}
                        <div className="text-base text-gray-400">{greetings[index].lang}</div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Name */}
            <div className="flex flex-col items-center">
        <span className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
         S PRAWIN <span className="text-white">KUMAR</span>
        </span>
            </div>

            {/* Double-sided Animated Bar */}
            <div className="flex items-center mt-8 w-full justify-center">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 120 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-l"
                />
                <div className="h-2 w-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mx-2" />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 120 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-r"
                />
            </div>

            {/* Subtitle */}
            <div className="mt-6 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
                Full Stack Developer
            </div>
        </div>
    );
}
