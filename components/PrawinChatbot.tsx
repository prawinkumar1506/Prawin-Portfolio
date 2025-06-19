// // components/PrawinChatbot.tsx
// 'use client';
//
// import React, { useState, useRef, useEffect } from 'react';
// import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
//
// interface Message {
//     id: string;
//     text: string;
//     isBot: boolean;
//     timestamp: Date;
// }
//
// const PrawinChatbot: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState<Message[]>([
//         {
//             id: '1',
//             text: "Hi! I'm Prawin's virtual assistant. I can tell you about his skills, projects, experience, and more. What would you like to know?",
//             isBot: true,
//             timestamp: new Date(),
//         },
//     ]);
//     const [inputMessage, setInputMessage] = useState('');
//     const [isTyping, setIsTyping] = useState(false);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };
//
//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);
//
//     const getBotResponse = async (userMessage: string): Promise<string> => {
//         const message = userMessage.toLowerCase();
//
//         // Comprehensive knowledge base about Prawin
//         const responses: { [key: string]: string } = {
//             // Greetings
//             'hello': "Hello! I'm here to tell you all about Prawin. What specifically would you like to know?",
//             'hi': "Hi there! I can share information about Prawin's skills, projects, experience, and background. What interests you most?",
//             'hey': "Hey! Feel free to ask me anything about Prawin - his technical skills, projects, or professional experience.",
//
//             // About Prawin
//             'about': "Prawin is a passionate Full-Stack Developer with expertise in modern web technologies. He specializes in React, Node.js, and cloud technologies, with a strong focus on creating scalable and user-friendly applications.",
//             'who': "Prawin is a dedicated software developer who loves building innovative web applications. He has experience with both frontend and backend development, and enjoys solving complex technical challenges.",
//             'background': "Prawin has a strong background in computer science and web development. He's continuously learning new technologies and staying updated with industry trends to deliver cutting-edge solutions.",
//
//             // Technical Skills
//             'skills': "Prawin's technical skills include:\n• Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS\n• Backend: Node.js, Express.js, Python, Java\n• Databases: MongoDB, PostgreSQL, MySQL\n• Cloud: AWS, Google Cloud Platform\n• Tools: Git, Docker, VS Code\n• Other: RESTful APIs, GraphQL, Responsive Design",
//             'frontend': "Prawin is skilled in modern frontend technologies including React, Next.js, TypeScript, JavaScript, HTML5, CSS3, and Tailwind CSS. He focuses on creating responsive, accessible, and performant user interfaces.",
//             'backend': "For backend development, Prawin works with Node.js, Express.js, Python, and Java. He has experience building RESTful APIs, handling database operations, and implementing secure authentication systems.",
//             'react': "Prawin is proficient in React and its ecosystem, including hooks, context API, state management, and modern React patterns. He also works extensively with Next.js for full-stack applications.",
//             'nodejs': "Prawin has solid experience with Node.js and Express.js for building scalable backend services, APIs, and server-side applications with proper error handling and security measures.",
//             'database': "Prawin works with various databases including MongoDB for NoSQL solutions, PostgreSQL and MySQL for relational data. He understands database design, optimization, and ORM/ODM usage.",
//             'cloud': "Prawin has experience with cloud platforms like AWS and Google Cloud Platform, including deployment, serverless functions, and cloud storage solutions.",
//
//             // Projects
//             'projects': "Prawin has worked on several interesting projects including:\n• Portfolio Website - A modern, responsive portfolio built with Next.js\n• E-commerce Platform - Full-stack shopping application\n• Task Management System - Collaborative project management tool\n• Weather App - Real-time weather application with API integration\nWould you like details about any specific project?",
//             'portfolio': "Prawin's portfolio website (which you're currently viewing!) is built with Next.js, TypeScript, and Tailwind CSS. It showcases his work, skills, and includes this interactive chatbot feature.",
//             'ecommerce': "Prawin developed a full-stack e-commerce platform with features like user authentication, product catalog, shopping cart, payment integration, and admin dashboard using React, Node.js, and MongoDB.",
//             'task management': "The task management system is a collaborative tool built with React and Node.js, featuring real-time updates, user roles, project tracking, and deadline management.",
//
//             // Experience
//             'experience': "Prawin has practical experience in full-stack development, working on various personal and collaborative projects. He has experience with the complete software development lifecycle from planning to deployment.",
//             'work': "Prawin has worked on diverse projects ranging from small business websites to complex web applications. He's experienced in both individual and team development environments.",
//
//             // Education & Learning
//             'education': "Prawin has a strong foundation in computer science and is continuously expanding his knowledge through online courses, documentation, and hands-on projects.",
//             'learning': "Prawin is always learning! He stays updated with the latest web development trends, attends online workshops, and practices new technologies through personal projects.",
//
//             // Contact & Collaboration
//             'contact': "You can reach Prawin through:\n• Email: [prawin.email@example.com]\n• LinkedIn: [LinkedIn Profile]\n• GitHub: [GitHub Profile]\nFor complex discussions or collaboration opportunities, feel free to reach out directly!",
//             'hire': "Prawin is open to new opportunities! He's looking for roles where he can contribute his full-stack development skills and grow with innovative teams. Contact him to discuss potential collaborations.",
//             'collaborate': "Prawin loves collaborating on interesting projects! Whether it's open source contributions or team projects, he's always excited to work with fellow developers.",
//
//             // Soft Skills
//             'soft skills': "Beyond technical skills, Prawin has strong problem-solving abilities, excellent communication skills, attention to detail, and a passion for clean, maintainable code. He works well in teams and enjoys mentoring others.",
//             'problem solving': "Prawin approaches problems systematically - breaking them down, researching solutions, and implementing clean, efficient code. He enjoys tackling complex challenges and finding creative solutions.",
//
//             // Hobbies & Interests
//             'hobbies': "When not coding, Prawin enjoys exploring new technologies, contributing to open source projects, reading tech blogs, and staying updated with industry trends. He also loves problem-solving and algorithmic challenges.",
//             'interests': "Prawin is passionate about emerging technologies like AI/ML integration in web apps, serverless architectures, and modern development practices. He's always exploring new tools and frameworks.",
//         };
//
//         // Find matching response
//         for (const [key, response] of Object.entries(responses)) {
//             if (message.includes(key)) {
//                 return response;
//             }
//         }
//
//         // Default responses for unmatched queries
//         const defaultResponses = [
//             "That's an interesting question! For detailed information about that topic, I'd recommend reaching out to Prawin directly via email or LinkedIn. He'd be happy to discuss it with you personally.",
//             "I don't have specific information about that, but Prawin would love to answer your question directly! Feel free to contact him for a more detailed discussion.",
//             "That's a great question! For complex queries like this, it's best to connect with Prawin directly. He can provide comprehensive answers and discuss your specific needs.",
//         ];
//
//         return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
//     };
//
//     const handleSendMessage = async () => {
//         if (!inputMessage.trim()) return;
//
//         const userMessage: Message = {
//             id: Date.now().toString(),
//             text: inputMessage,
//             isBot: false,
//             timestamp: new Date(),
//         };
//
//         setMessages(prev => [...prev, userMessage]);
//         setInputMessage('');
//         setIsTyping(true);
//
//         // Simulate API call delay
//         setTimeout(async () => {
//             const botResponse = await getBotResponse(inputMessage);
//             const botMessage: Message = {
//                 id: (Date.now() + 1).toString(),
//                 text: botResponse,
//                 isBot: true,
//                 timestamp: new Date(),
//             };
//
//             setMessages(prev => [...prev, botMessage]);
//             setIsTyping(false);
//         }, 1000);
//     };
//
//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter') {
//             handleSendMessage();
//         }
//     };
//
//     return (
//         <>
//             {/* Chat Toggle Button */}
//             <div className="fixed bottom-6 right-6 z-50">
//                 <Button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:scale-110"
//                     size="icon"
//                 >
//                     {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
//                 </Button>
//             </div>
//
//             {/* Chat Window */}
//             {isOpen && (
//                 <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)]">
//                     <Card className="h-full shadow-2xl border-0 bg-white dark:bg-gray-900">
//                         {/* Header */}
//                         <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
//                             <div className="flex items-center space-x-2">
//                                 <Bot className="h-5 w-5" />
//                                 <div>
//                                     <h3 className="font-semibold">Know about Prawin</h3>
//                                     <p className="text-xs text-blue-100">Virtual Assistant</p>
//                                 </div>
//                             </div>
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={() => setIsOpen(false)}
//                                 className="h-8 w-8 text-white hover:bg-blue-700"
//                             >
//                                 <X className="h-4 w-4" />
//                             </Button>
//                         </div>
//
//                         {/* Messages */}
//                         <CardContent className="p-0 flex flex-col h-[calc(100%-140px)]">
//                             <ScrollArea className="flex-1 p-4">
//                                 <div className="space-y-4">
//                                     {messages.map((message) => (
//                                         <div
//                                             key={message.id}
//                                             className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
//                                         >
//                                             <div
//                                                 className={`max-w-[80%] p-3 rounded-lg ${
//                                                     message.isBot
//                                                         ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
//                                                         : 'bg-blue-600 text-white'
//                                                 }`}
//                                             >
//                                                 <div className="flex items-start space-x-2">
//                                                     {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
//                                                     <div className="text-sm whitespace-pre-line">{message.text}</div>
//                                                     {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     {isTyping && (
//                                         <div className="flex justify-start">
//                                             <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
//                                                 <div className="flex items-center space-x-2">
//                                                     <Bot className="h-4 w-4" />
//                                                     <div className="flex space-x-1">
//                                                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                                                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                                                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div ref={messagesEndRef} />
//                             </ScrollArea>
//
//                             {/* Input Area */}
//                             <div className="p-4 border-t">
//                                 <div className="flex space-x-2">
//                                     <Input
//                                         value={inputMessage}
//                                         onChange={(e) => setInputMessage(e.target.value)}
//                                         onKeyPress={handleKeyPress}
//                                         placeholder="Ask about Prawin's skills, projects..."
//                                         className="flex-1"
//                                         disabled={isTyping}
//                                     />
//                                     <Button
//                                         onClick={handleSendMessage}
//                                         disabled={!inputMessage.trim() || isTyping}
//                                         size="icon"
//                                         className="bg-blue-600 hover:bg-blue-700"
//                                     >
//                                         <Send className="h-4 w-4" />
//                                     </Button>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-2 text-center">
//                                     For complex questions, feel free to contact Prawin directly!
//                                 </p>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default PrawinChatbot;

// components/PrawinChatbot.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: string;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prawin-portfolio.onrender.com/chat';

const PrawinChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Prawin's virtual assistant. I can tell you about his skills, projects, experience, and more. What would you like to know?",
            isBot: true,
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            isBot: false,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const botResponse = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse.text,
                isBot: true,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                isBot: true,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <div className="flex flex-col items-end space-y-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-90">
                        Ask about Prawin
                    </div>
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:scale-110"
                        size="icon"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)]">
                    <Card className="h-full shadow-2xl border-0 bg-white dark:bg-gray-900">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
                            <div className="flex items-center space-x-2">
                                <Bot className="h-5 w-5" />
                                <div>
                                    <h3 className="font-semibold">Know about Prawin</h3>
                                    <p className="text-xs text-blue-100">AI Assistant</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 text-white hover:bg-blue-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <CardContent className="p-0 flex flex-col h-[calc(100%-140px)]">
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${
                                                    message.isBot
                                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                                        : 'bg-blue-600 text-white'
                                                }`}
                                            >
                                                <div className="flex items-start space-x-2">
                                                    {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                                                    {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                                <div className="flex items-center space-x-2">
                                                    <Bot className="h-4 w-4" />
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div ref={messagesEndRef} />
                            </ScrollArea>

                            {/* Input Area */}
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <Input
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about Prawin's skills, projects..."
                                        className="flex-1"
                                        disabled={isTyping}
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!inputMessage.trim() || isTyping}
                                        size="icon"
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Powered by AI semantic search and Gemini
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
};

export default PrawinChatbot;
