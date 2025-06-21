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
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prawin-portfolio.onrender.com';
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
//         {
//             id: '2',
//             text: "💡 Note: The first response might take a moment to generate as I'm initializing. Subsequent responses will be faster!",
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
//         try {
//             const response = await fetch(`${API_URL}/chat`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ message: inputMessage }),
//             });
//
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//
//             const botResponse = await response.json();
//
//             const botMessage: Message = {
//                 id: (Date.now() + 1).toString(),
//                 text: botResponse.text,
//                 isBot: true,
//                 timestamp: new Date(),
//             };
//
//             setMessages(prev => [...prev, botMessage]);
//         } catch (error) {
//             const errorMessage: Message = {
//                 id: (Date.now() + 1).toString(),
//                 text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
//                 isBot: true,
//                 timestamp: new Date(),
//             };
//             setMessages(prev => [...prev, errorMessage]);
//         } finally {
//             setIsTyping(false);
//         }
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
//                 <div className="flex flex-col items-end space-y-2">
//                     <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-90">
//                         Ask about Prawin
//                     </div>
//                     <Button
//                         onClick={() => setIsOpen(!isOpen)}
//                         className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:scale-110"
//                         size="icon"
//                     >
//                         {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
//                     </Button>
//                 </div>
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
//                                     <p className="text-xs text-blue-100">AI Assistant</p>
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
//                                     Powered by AI semantic search and Gemini
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prawin-portfolio.onrender.com';

const PrawinChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Prawin's virtual assistant. I can tell you about his skills, projects, experience, and more. What would you like to know?",
            isBot: true,
            timestamp: new Date(),
        },
        {
            id: '2',
            text: "💡 Note: The first response might take a moment to generate as I'm initializing. Subsequent responses will be faster!",
            isBot: true,
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isFirstMessage, setIsFirstMessage] = useState(true);
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

        // Add a longer delay for the first message
        const delay = isFirstMessage ? 3000 : 1000; // 3 seconds for first, 1 second for others

        try {
            // Show additional loading message for first response
            if (isFirstMessage) {
                setTimeout(() => {
                    if (isTyping) { // Only show if still typing
                        const loadingMessage: Message = {
                            id: `loading-${Date.now()}`,
                            text: "Just a moment, initializing the AI assistant...",
                            isBot: true,
                            timestamp: new Date(),
                        };
                        setMessages(prev => [...prev, loadingMessage]);
                    }
                }, 1500);
            }

            setTimeout(async () => {
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

                    // Remove loading message if it exists and add the actual response
                    setMessages(prev => {
                        const filtered = prev.filter(msg => !msg.id.startsWith('loading-'));
                        return [...filtered, botMessage];
                    });

                    // Mark that first message is done
                    setIsFirstMessage(false);
                    setIsTyping(false);
                } catch (error) {
                    const errorMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                        isBot: true,
                        timestamp: new Date(),
                    };

                    // Remove loading message and add error message
                    setMessages(prev => {
                        const filtered = prev.filter(msg => !msg.id.startsWith('loading-'));
                        return [...filtered, errorMessage];
                    });

                    setIsFirstMessage(false);
                    setIsTyping(false);
                }
            }, delay);

        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                isBot: true,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, errorMessage]);
            setIsFirstMessage(false);
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