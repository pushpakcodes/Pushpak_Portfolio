import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, LayoutGrid, X } from 'lucide-react';
import { FaReact, FaNodeJs, FaGitAlt, FaStripe, FaBrain, FaFileExcel, FaPython, FaDocker, FaAws, FaDatabase } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiFramer, SiMongodb, SiExpress, SiMongoose, SiOpenai, SiVercel, SiJsonwebtokens, SiJavascript, SiHtml5, SiCss3, SiGithub, SiPostman, SiCplusplus, SiFastapi, SiRedis, SiMysql, SiKubernetes, SiTerraform, SiPrometheus, SiGrafana, SiSocketdotio } from 'react-icons/si';
import { TbApi, TbSql } from 'react-icons/tb';

const Projects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { name: 'C++', icon: SiCplusplus, color: '#00599C' },
    { name: 'Python', icon: FaPython, color: '#3776AB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'SQL', icon: TbSql, color: '#003B57' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'LangChain', icon: FaBrain, color: '#F0F0F0' },
    { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Mongoose', icon: SiMongoose, color: '#880000' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { name: 'WebSockets', icon: SiSocketdotio, color: '#FFFFFF' },
    { name: 'REST APIs', icon: TbApi, color: '#FF5733' },
    { name: 'JWT', icon: SiJsonwebtokens, color: '#D63AFF' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
    { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
    { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C' },
    { name: 'Grafana', icon: SiGrafana, color: '#F46800' },
    { name: 'AWS', icon: FaAws, color: '#FF9900' },
  ];

  const calculateMovement = (factor) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  const getTechIcon = (tech) => {
    const iconMap = {
      'React': { icon: FaReact, color: '#61DAFB' },
      'MERN': { icon: FaReact, color: '#61DAFB' }, // Using React for MERN stack rep
      'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
      'Node.js': { icon: FaNodeJs, color: '#339933' },
      'Express': { icon: SiExpress, color: '#FFFFFF' },
      'Expressjs': { icon: SiExpress, color: '#FFFFFF' },
      'MongoDB': { icon: SiMongodb, color: '#47A248' },
      'Mongoose': { icon: SiMongoose, color: '#880000' },
      'Tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
      'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
      'TypeScript': { icon: SiTypescript, color: '#3178C6' },
      'Framer Motion': { icon: SiFramer, color: '#0055FF' },
      'LangChain': { icon: FaBrain, color: '#F0F0F0' }, // Fallback/Generic AI
      'ExcelJS': { icon: FaFileExcel, color: '#217346' },
      'JWT': { icon: SiJsonwebtokens, color: '#D63AFF' }, // Color approximation
      'REST APIs': { icon: TbApi, color: '#FF5733' },
      'LLM Integration': { icon: SiOpenai, color: '#412991' },
      'OpenAI API': { icon: SiOpenai, color: '#412991' },
      'Stripe': { icon: FaStripe, color: '#635BFF' },
      'Git': { icon: FaGitAlt, color: '#F05032' },
      'Vercel': { icon: SiVercel, color: '#FFFFFF' },
      'React Dashboards': { icon: FaReact, color: '#61DAFB' }
    };

    // Normalize tech string to match keys
    const normalizedTech = Object.keys(iconMap).find(key => 
      tech.toLowerCase().includes(key.toLowerCase()) || 
      key.toLowerCase().includes(tech.toLowerCase())
    );

    return iconMap[normalizedTech] || { icon: FaReact, color: '#888888' }; // Default fallback
  };

  const projects = [
    {
      title: "SheetPilot – Cursor for Excel",
      description: "SheetPilot is an AI-powered web platform that automates Excel workflows using natural language. Users generate formulas, pivots, and analytics without manual spreadsheets. LLM-driven orchestration powers a fast, AI-first productivity experience.",
      tags: ["MERN", "LangChain", "ExcelJS", "JWT", "REST APIs", "LLM Integration", "Framer Motion"],
      link: "#",
      image: "/project looks/sheetpilot.png"
    },
    {
      title: "HRIS Office Management System",
      description: "A full-stack HRIS platform built for role-based office and payroll management. It automates tasks, performance tracking, payroll processing, and internal communication. Designed to improve operational efficiency through centralized dashboards.",
      tags: ["MERN Stack", "ExcelJS", "JWT", "REST APIs", "MongoDB", "Node.js"],
      link: "#",
      image: "/project looks/HRIS.png"
    },
    {
      title: "MindEase – OCD Tracker & AI Companion",
      description: "MindEase is a privacy-first web app for OCD awareness and self-reflection. It features dashboards, journaling, ERP tools, and pattern tracking. An AI companion offers supportive, non-clinical guidance and insights.",
      tags: ["React", "Node.js", "Expressjs", "MongoDB", "Mongoose", "JWT", "OpenAI API", "Framer Motion"],
      link: "#",
      image: "/project looks/mindease.png"
    },
    {
      title: "Real-Time Banking & Investment Simulator",
      description: "A real-time finance simulator replicating banking and investment workflows. Users deposit funds, invest, take loans, and track outcomes via live dashboards. Built with secure transaction logic and analytics-driven visualizations.",
      tags: ["MERN", "Node.js", "Express", "MongoDB", "JWT", "React Dashboards"],
      link: "#",
      image: "/project looks/financialsimulator.png"
    },
    {
      title: "Mrugakshi Portfolio (Freelance Project)",
      description: "A custom portfolio website built for a Bollywood Art Director. Focused on showcasing artistic work through smooth animations and elegant layouts. Delivered end-to-end as a freelance project with design, development, and deployment.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Git", "Vercel"],
      link: "#",
      image: "/project looks/mrugakshi.png"
    },
    {
      title: "ChefKiss",
      description: "ChefKiss allows users to discover chefs and support them via secure Stripe payments. It features chef profiles, tipping history, leaderboards, and dashboards. A built-in social feed enables chefs to share culinary posts and updates.",
      tags: ["MERN", "Stripe", "Tailwind CSS"], // Inferred from description/context
      link: "#",
      image: "/project looks/chefskiss.png"
    }
  ];

  const experiences = [
    {
      company: "Mrugakshi-Portfolio",
      role: "Web Development- Freelance",
      period: "May 2025- June 2025",
      links: [
        { name: "Website", url: "#", icon: ExternalLink },
        { name: "GitHub", url: "https://github.com/pushpakcodes", icon: Github }
      ],
      description: [
        "Designed and developed a modern portfolio website for Bollywood Art Director Mrugakshi Nadkarni using React.js, Tailwind CSS, and Framer Motion, aligning with her artistic brand and style.",
        "Completed the project end-to-end as a freelance engagement, including UI design, client communication, feedback integration, Git-based collaboration, and deployment on Vercel with a custom Hostinger domain."
      ]
    },
    {
      company: "Namrata Groups",
      role: "Software Developer",
      period: "September 2025- December 2025",
      description: [
        "Built a Full-stack HRIS Office Management System for Namrata Group , (Single-handedly), using the MERN stack, enabling HR, Directors, and Employees to access role-based dashboards for task assignment, deadline tracking, and performance monitoring , improving task visibility by 80% across departments",
        "Automated payroll processing using ExcelJS, converting raw attendance data into final payroll sheets (leave balance, presence, delays, and deductions), reducing manual calculation effort by 85% and payroll processing time from 2-3 days to under 20-30 minutes.",
        "Designed & Developed custom email system with labels like leave/ASAP, optimizing message categorization and lifting processing efficiency by 40%"
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#050505] text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url("/about-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/90 to-[#050505] z-0" />

      {/* Parallax Dots */}
      <motion.div 
        animate={calculateMovement(-0.05)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-50 pointer-events-none z-10"
      />
      <motion.div 
        animate={calculateMovement(0.08)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-50 pointer-events-none z-10"
      />
      <motion.div 
        animate={calculateMovement(-0.1)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30 pointer-events-none z-10"
      />
      <motion.div 
        animate={calculateMovement(0.06)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/2 right-[10%] w-1 h-1 bg-white rounded-full opacity-20 pointer-events-none z-10"
      />
      <motion.div 
        animate={calculateMovement(-0.12)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute bottom-1/3 right-[20%] w-2 h-2 bg-purple-400/20 rounded-full blur-[1px] pointer-events-none z-10"
      />
      <motion.div 
        animate={calculateMovement(0.15)}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute top-[15%] right-[35%] w-1 h-1 bg-blue-300/40 rounded-full pointer-events-none z-10"
      />
      <motion.div 
        animate={calculateMovement(-0.08)}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
        className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 bg-white/30 rounded-full pointer-events-none z-10"
      />
      
      {/* High Density Starfield Dots */}
      <motion.div animate={calculateMovement(-0.03)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[8%] left-[8%] w-0.5 h-0.5 bg-white/40 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(0.05)} transition={{ type: "spring", stiffness: 50 }} className="absolute top-[12%] right-[12%] w-1 h-1 bg-blue-400/20 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(-0.07)} transition={{ type: "spring", stiffness: 45 }} className="absolute bottom-[8%] left-[8%] w-0.5 h-0.5 bg-purple-400/30 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(0.09)} transition={{ type: "spring", stiffness: 55 }} className="absolute bottom-[12%] right-[25%] w-1 h-1 bg-white/20 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(-0.04)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[45%] left-[2%] w-0.5 h-0.5 bg-white/30 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(0.06)} transition={{ type: "spring", stiffness: 50 }} className="absolute top-[55%] right-[2%] w-0.5 h-0.5 bg-blue-300/30 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(-0.08)} transition={{ type: "spring", stiffness: 45 }} className="absolute top-[2%] left-[40%] w-1 h-1 bg-purple-300/20 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(0.11)} transition={{ type: "spring", stiffness: 60 }} className="absolute bottom-[2%] right-[40%] w-0.5 h-0.5 bg-white/40 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(-0.05)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[25%] left-[15%] w-0.5 h-0.5 bg-blue-200/30 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(0.07)} transition={{ type: "spring", stiffness: 50 }} className="absolute top-[75%] right-[15%] w-1 h-1 bg-purple-200/20 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(-0.09)} transition={{ type: "spring", stiffness: 45 }} className="absolute top-[35%] left-[85%] w-0.5 h-0.5 bg-white/30 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(0.13)} transition={{ type: "spring", stiffness: 55 }} className="absolute bottom-[35%] left-[5%] w-1 h-1 bg-blue-400/20 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(-0.06)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[18%] right-[30%] w-0.5 h-0.5 bg-white/20 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(0.08)} transition={{ type: "spring", stiffness: 50 }} className="absolute bottom-[18%] left-[30%] w-0.5 h-0.5 bg-purple-300/30 rounded-full pointer-events-none z-10" />
      <motion.div animate={calculateMovement(-0.1)} transition={{ type: "spring", stiffness: 45 }} className="absolute top-[65%] left-[65%] w-1 h-1 bg-white/10 rounded-full pointer-events-none z-10" />

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 pt-32 pb-20">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 tracking-[0.2em] text-xs md:text-sm uppercase font-medium"
          >
            While Avoiding Real Life
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-bold tracking-tight"
          >
            I Built <span className="font-serif italic text-purple-400">Projects</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-xs md:text-sm tracking-widest uppercase font-mono mt-4 max-w-2xl mx-auto"
          >
            YOUR PROJECTS ARE NOT PROJECT ENOUGH IF THEY ARE NOT PRODUCT ENOUGH !
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16" style={{ perspective: '1000px' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                rotateX: 5,
                y: -5,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)]"
            >
              {/* Laptop Screen Mockup */}
              <div className="relative aspect-video w-full bg-[#111] p-6 group-hover:bg-[#151515] transition-colors flex items-end justify-center">
                <div className="w-[85%] relative z-10">
                  {/* Laptop Body */}
                  <div className="w-full aspect-[16/10] relative rounded-t-lg overflow-hidden border-[4px] border-[#2a2a2a] border-b-0 bg-[#000] shadow-2xl">
                    {/* Screen Content */}
                    <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  </div>
                  {/* Laptop Base */}
                  <div className="w-full h-3 bg-[#e2e2e2] rounded-b-md relative shadow-lg">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#a0a0a0] rounded-b-sm"></div>
                  </div>
                </div>
                
                {/* Glow behind laptop */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-purple-500/20 blur-[50px] -z-0 opacity-50 group-hover:opacity-80 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 bg-[#0a0a0a]">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {project.title.split('–')[0].trim()}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
                  {project.description}
                </p>
                
                <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-4">
                   <div className="flex -space-x-2">
                     {/* Tech Icons (Colorful & Original) */}
                     {project.tags.slice(0, 5).map((tag, i) => {
                       const { icon: Icon, color } = getTechIcon(tag);
                       return (
                         <div 
                            key={i} 
                            className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center relative z-0 hover:z-10 hover:scale-110 transition-transform hover:border-white/30"
                            title={tag}
                         >
                           <Icon size={16} style={{ color: color }} />
                         </div>
                       );
                     })}
                     {project.tags.length > 5 && (
                       <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400 relative z-0">
                         +{project.tags.length - 5}
                       </div>
                     )}
                   </div>
                   
                   <a 
                     href={project.link} 
                     className="px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-lg flex items-center gap-2 text-sm font-medium text-white hover:bg-purple-600/40 transition-all group/link hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                   >
                     Click to See Project 
                     <span className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform">
                        <ExternalLink size={14} />
                     </span>
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Marquee */}
        <div className="w-full py-10 overflow-hidden relative z-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12 relative flex flex-col items-center justify-center"
            >
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">Technical Skills</h2>
               <div className="w-24 h-1.5 bg-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
               
               <div 
                 className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer"
                 onClick={() => setShowAllSkills(true)}
               >
                 <button 
                   className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300"
                   title="View All Skills"
                 >
                   <LayoutGrid className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                 </button>
                 <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase group-hover:text-purple-400 transition-colors whitespace-nowrap">Click to see skills</span>
               </div>
            </motion.div>

            <div className="flex relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 30 
                    }}
                    className="flex gap-16 pr-16 whitespace-nowrap"
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <div key={index} className="flex flex-col items-center gap-4 group min-w-[80px]">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:border-purple-500/50 group-hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20">
                                <skill.icon className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }} />
                            </div>
                            <span className="text-gray-400 text-sm font-medium tracking-wide group-hover:text-white transition-colors">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* Experience Section */}
        <div className="max-w-4xl mx-auto relative mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Experience</h2>
            <div className="w-24 h-1.5 bg-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          </motion.div>

          <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                    <p className="text-purple-400 font-medium text-lg">{exp.role}</p>
                  </div>
                  <div className="text-right md:text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Links */}
                {exp.links && (
                  <div className="flex gap-4 mb-6">
                    {exp.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                      >
                        {link.icon && <link.icon size={14} className="group-hover:text-purple-400 transition-colors" />}
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}

                {/* Description Points */}
                <ul className="space-y-3">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed font-light text-sm md:text-base">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500/50 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showAllSkills && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowAllSkills(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-5xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={() => setShowAllSkills(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>

              <h3 className="text-3xl font-bold text-white mb-8 font-serif">All Skills</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-white/10 transition-all duration-300">
                      <skill.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }} />
                    </div>
                    <span className="text-gray-400 text-sm font-medium tracking-wide group-hover:text-white transition-colors text-center">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
