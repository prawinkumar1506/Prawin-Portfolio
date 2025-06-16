// // app/api/chatbot/route.ts
// import { NextRequest, NextResponse } from 'next/server';
//
// interface ChatMessage {
//     message: string;
//     timestamp?: string;
// }
//
// interface ChatResponse {
//     response: string;
//     timestamp: string;
//     suggestions?: string[];
// }
//
// // Enhanced knowledge base with more detailed information
// const knowledgeBase = {
//     // Personal Information
//     name: "Prawin",
//     title: "Full-Stack Developer",
//     location: "Available for remote work",
//
//     // Technical Skills
//     skills: {
//         frontend: [
//             "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)",
//             "HTML5", "CSS3", "Tailwind CSS", "Responsive Design",
//             "React Hooks", "Context API", "Redux"
//         ],
//         backend: [
//             "Node.js", "Express.js", "Python", "Java",
//             "RESTful APIs", "GraphQL", "Microservices"
//         ],
//         databases: [
//             "MongoDB", "PostgreSQL", "MySQL", "Redis"
//         ],
//         cloud: [
//             "AWS (EC2, S3, Lambda)", "Google Cloud Platform",
//             "Docker", "Kubernetes", "Serverless Architecture"
//         ],
//         tools: [
//             "Git", "GitHub", "VS Code", "Postman",
//             "Jest", "Cypress", "Webpack", "Vite"
//         ]
//     },
//
//     // Projects
//     projects: [
//         {
//             name: "Portfolio Website",
//             description: "Modern, responsive portfolio built with Next.js, TypeScript, and Tailwind CSS featuring dark mode, animations, and this interactive chatbot.",
//             technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
//             features: ["Responsive Design", "Dark Mode", "Interactive Chatbot", "SEO Optimized"]
//         },
//         {
//             name: "E-commerce Platform",
//             description: "Full-stack shopping application with user authentication, product management, shopping cart, and payment integration.",
//             technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
//             features: ["User Authentication", "Product Catalog", "Shopping Cart", "Payment Processing", "Admin Dashboard"]
//         },
//         {
//             name: "Task Management System",
//             description: "Collaborative project management tool with real-time updates and team collaboration features.",
//             technologies: ["React", "Socket.io", "Express.js", "PostgreSQL"],
//             features: ["Real-time Updates", "Team Collaboration", "Project Tracking", "Deadline Management"]
//         },
//         {
//             name: "Weather Application",
//             description: "Real-time weather application with location-based forecasts and interactive maps.",
//             technologies: ["React", "Weather API", "Mapbox", "Chart.js"],
//             features: ["Location-based Weather", "7-day Forecast", "Interactive Maps", "Weather Charts"]
//         }
//     ],
//
//     // Experience & Background
//     experience: {
//         summary: "Passionate full-stack developer with hands-on experience building modern web applications. Strong foundation in both frontend and backend technologies with a focus on creating scalable, user-friendly solutions.",
//         strengths: [
//             "Problem-solving and analytical thinking",
//             "Clean, maintainable code practices",
//             "Strong communication and teamwork",
//             "Continuous learning mindset",
//             "Attention to detail and user experience"
//         ]
//     },
//
//     // Contact Information
//     contact: {
//         email: "prawin.dev@example.com", // Replace with actual email
//         linkedin: "linkedin.com/in/prawin-dev", // Replace with actual LinkedIn
//         github: "github.com/prawin-dev", // Replace with actual GitHub
//         portfolio: "prawin-portfolio.vercel.app" // Replace with actual portfolio URL
//     }
// };
//
// // Function to analyze user intent and generate appropriate response
// function analyzeUserIntent(message: string): string {
//     const lowerMessage = message.toLowerCase().trim();
//
//     // Greeting patterns
//     const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
//     if (greetings.some(greeting => lowerMessage.includes(greeting))) {
//         return generateGreetingResponse();
//     }
//
//     // Skills-related queries
//     const skillKeywords = ['skill', 'technology', 'tech stack', 'programming', 'language', 'framework'];
//     if (skillKeywords.some(keyword => lowerMessage.includes(keyword))) {
//         if (lowerMessage.includes('frontend') || lowerMessage.includes('front-end')) {
//             return generateSkillResponse('frontend');
//         } else if (lowerMessage.includes('backend') || lowerMessage.includes('back-end')) {
//             return generateSkillResponse('backend');
//         } else if (lowerMessage.includes('database')) {
//             return generateSkillResponse('databases');
//         } else if (lowerMessage.includes('cloud')) {
//             return generateSkillResponse('cloud');
//         } else {
//             return generateAllSkillsResponse();
//         }
//     }
//
//     // Project-related queries
//     const projectKeywords = ['project', 'work', 'portfolio', 'build', 'create', 'develop'];
//     if (projectKeywords.some(keyword => lowerMessage.includes(keyword))) {
//         return generateProjectResponse(lowerMessage);
//     }
//
//     // Experience-related queries
//     const experienceKeywords = ['experience', 'background', 'about', 'who', 'biography'];
//     if (experienceKeywords.some(keyword => lowerMessage.includes(keyword))) {
//         return generateExperienceResponse();
//     }
//
//     // Contact-related queries
//     const contactKeywords = ['contact', 'reach', 'email', 'linkedin', 'github', 'hire', 'collaborate'];
//     if (contactKeywords.some(keyword => lowerMessage.includes(keyword))) {
//         return generateContactResponse();
//     }
//
//     // Specific technology queries
//     const techQueries = {
//         'react': () => `Prawin is highly proficient in React.js and its ecosystem. He has extensive experience with:\n• React Hooks (useState, useEffect, useContext, custom hooks)\n• Component composition and reusable patterns\n• State management with Context API and Redux\n• Performance optimization techniques\n• Modern React patterns and best practices\n\nHe's built multiple React applications ranging from simple SPAs to complex enterprise-level applications.`,
//         'next': () => `Prawin specializes in Next.js for building full-stack React applications. His Next.js expertise includes:\n• Server-side rendering (SSR) and static site generation (SSG)\n• API routes for backend functionality\n• Dynamic routing and nested layouts\n• Performance optimization and SEO\n• Deployment on Vercel and other platforms\n\nThis very portfolio website is built with Next.js!`,
//         'node': () => `Prawin has solid backend experience with Node.js and Express.js:\n• Building RESTful APIs and GraphQL endpoints\n• Database integration and ORM/ODM usage\n• Authentication and authorization systems\n• Error handling and logging\n• Performance optimization and caching\n• Deployment and server management`,
//         'typescript': () => `Prawin is well-versed in TypeScript for both frontend and backend development:\n• Strong typing for better code quality\n• Interface and type definitions\n• Generic programming patterns\n• Integration with React and Node.js\n• Build tooling and configuration\n\nHe prefers TypeScript for larger projects due to its excellent developer experience and error prevention.`
//     };
//
//     for (const [tech, response] of Object.entries(techQueries)) {
//         if (lowerMessage.includes(tech)) {
//             return response();
//         }
//     }
//
//     // Default response for unmatched queries
//     return generateDefaultResponse();
// }
//
// function generateGreetingResponse(): string {
//     const greetings = [
//         "Hello! I'm Prawin's virtual assistant. I'm here to tell you all about his skills, projects, and experience. What would you like to know?",
//         "Hi there! Welcome to Prawin's portfolio. I can share information about his technical expertise, projects, and background. How can I help you today?",
//         "Hey! Great to meet you. I'm here to answer any questions about Prawin's development skills and experience. What interests you most?"
//     ];
//     return greetings[Math.floor(Math.random() * greetings.length)];
// }
//
// function generateAllSkillsResponse(): string {
//     return `Prawin has a comprehensive skill set across the full stack:
//
// 🎨 **Frontend Development:**
// ${knowledgeBase.skills.frontend.join(', ')}
//
// ⚙️ **Backend Development:**
// ${knowledgeBase.skills.backend.join(', ')}
//
// 🗄️ **Databases:**
// ${knowledgeBase.skills.databases.join(', ')}
//
// ☁️ **Cloud & DevOps:**
// ${knowledgeBase.skills.cloud.join(', ')}
//
// 🛠️ **Tools & Others:**
// ${knowledgeBase.skills.tools.join(', ')}
//
// Would you like me to elaborate on any specific technology or skill area?`;
// }
//
// function generateSkillResponse(category: keyof typeof knowledgeBase.skills): string {
//     const skills = knowledgeBase.skills[category];
//     const categoryNames = {
//         frontend: '🎨 Frontend Development',
//         backend: '⚙️ Backend Development',
//         databases: '🗄️ Database Technologies',
//         cloud: '☁️ Cloud & DevOps',
//         tools: '🛠️ Development Tools'
//     };
//
//     return `**${categoryNames[category]}:**\n${skills.join(', ')}\n\nPrawin has hands-on experience with these technologies and continuously stays updated with the latest developments in this area. Would you like to know more about any specific technology?`;
// }
//
// function generateProjectResponse(message: string): string {
//     // Check if asking about a specific project
//     const specificProject = knowledgeBase.projects.find(project =>
//         message.includes(project.name.toLowerCase())
//     );
//
//     if (specificProject) {
//         return `**${specificProject.name}:**\n\n${specificProject.description}\n\n**Technologies Used:** ${specificProject.technologies.join(', ')}\n\n**Key Features:**\n${specificProject.features.map(feature => `• ${feature}`).join('\n')}\n\nWould you like to know more about the technical implementation or see other projects?`;
//     }
//
//     return `Prawin has worked on several exciting projects:\n\n${knowledgeBase.projects.map(project =>
//         `**${project.name}:** ${project.description.substring(0, 100)}...`
//     ).join('\n\n')}\n\nWould you like details about any specific project? Just ask about the project name!`;
// }
//
// function generateExperienceResponse(): string {
//     return `**About Prawin:**
//
// ${knowledgeBase.experience.summary}
//
// **Key Strengths:**
// ${knowledgeBase.experience.strengths.map(strength => `• ${strength}`).join('\n')}
//
// Prawin is passionate about creating efficient, scalable solutions and enjoys tackling complex technical challenges. He's always eager to learn new technologies and contribute to innovative projects.
//
// Would you like to know more about his specific skills or projects?`;
// }
//
// function generateContactResponse(): string {
//     return `**Get in Touch with Prawin:**
//
// 📧 **Email:** ${knowledgeBase.contact.email}
// 💼 **LinkedIn:** ${knowledgeBase.contact.linkedin}
// 🔗 **GitHub:** ${knowledgeBase.contact.github}
// 🌐 **Portfolio:** ${knowledgeBase.contact.portfolio}
//
// Prawin is open to:
// • Full-time development opportunities
// • Freelance projects
// • Technical collaborations
// • Open source contributions
// • Mentoring and knowledge sharing
//
// For complex technical discussions or project collaborations, feel free to reach out directly via email or LinkedIn!`;
// }
//
// function generateDefaultResponse(): string {
//     const responses = [
//         "That's an interesting question! While I can share information about Prawin's skills, projects, and experience, for more specific details, I'd recommend reaching out to him directly. He'd be happy to discuss this with you personally!",
//         "I don't have specific information about that topic in my knowledge base. However, Prawin would love to answer your question directly! Feel free to contact him via email or LinkedIn for a detailed discussion.",
//         "Great question! For complex or specific inquiries like this, it's best to connect with Prawin directly. He can provide comprehensive answers tailored to your needs and discuss potential opportunities.",
//         "I'd love to help with that, but it's beyond my current knowledge scope. Prawin is always happy to engage in detailed technical discussions - reach out to him directly for the best response!"
//     ];
//
//     return responses[Math.floor(Math.random() * responses.length)];
// }
//
// function generateSuggestions(message: string): string[] {
//     const suggestions = [
//         "Tell me about Prawin's skills",
//         "What projects has he worked on?",
//         "How can I contact Prawin?",
//         "What's his experience with React?",
//         "Tell me about his backend skills",
//         "What technologies does he use?"
//     ];
//
//     // Return random 3 suggestions that don't match current query
//     return suggestions
//         .filter(suggestion => !message.toLowerCase().includes(suggestion.toLowerCase().split(' ')[3] || ''))
//         .sort(() => 0.5 - Math.random())
//         .slice(0, 3);
// }
//
// export async function POST(request: NextRequest) {
//     try {
//         const body: ChatMessage = await request.json();
//         const { message } = body;
//
//         if (!message || typeof message !== 'string') {
//             return NextResponse.json(
//                 { error: 'Message is required and must be a string' },
//                 { status: 400 }
//             );
//         }
//
//         // Generate response based on user message
//         const response = analyzeUserIntent(message);
//         const suggestions = generateSuggestions(message);
//
//         const chatResponse: ChatResponse = {
//             response,
//             timestamp: new Date().toISOString(),
//             suggestions
//         };
//
//         return NextResponse.json(chatResponse);
//
//     } catch (error) {
//         console.error('Chatbot API Error:', error);
//         return NextResponse.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }
//
// export async function GET() {
//     return NextResponse.json({
//         message: "Prawin's Chatbot API is running!",
//         endpoints: {
//             POST: "/api/chatbot - Send a message to the chatbot"
//         },
//         timestamp: new Date().toISOString()
//     });
// }