import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Database, Server, Triangle, Mail, Copy, Phone, Linkedin } from 'lucide-react';
import Globe from './Globe';

const BentoGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column Group (Spans 2 columns) */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          
          {/* Client Collaboration Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 min-h-[350px] relative overflow-hidden group flex flex-col justify-center"
          >
            <div className="relative z-10 max-w-[60%]">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                I prioritize client collaboration, fostering open communication
              </h3>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-[55%] h-full transition-transform duration-500 group-hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Collaboration" 
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
              />
              {/* Gradient overlay to blend with background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 to-[#0a0a0a]/60"></div>
            </div>
          </motion.div>

          {/* Middle Row: Time Zone & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Time Zone Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative overflow-hidden min-h-[500px] flex flex-col justify-between group"
            >
              <h3 className="text-xl font-bold relative z-10 mb-10">
                I'm Flexible for different time zone communication
              </h3>
              
              <Globe />
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-2xl font-bold mb-6 relative z-10">Let's work together on your next project</h3>
              
              <div className="flex flex-col gap-4 w-full max-w-[320px] z-10 relative">
                <div className="bg-[#0a0a0a]/30 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors group/copy w-full">
                  <Mail className="w-4 h-4 text-purple-300" />
                  <span className="text-sm font-medium text-purple-100">pushpakzowrkspace@gmail.com</span>
                  <Copy className="w-4 h-4 text-purple-300 opacity-0 group-hover/copy:opacity-100 transition-opacity absolute right-4" />
                </div>

                <div className="bg-[#0a0a0a]/30 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors group/copy w-full">
                  <Phone className="w-4 h-4 text-purple-300" />
                  <span className="text-sm font-medium text-purple-100">+91 9322805835</span>
                  <Copy className="w-4 h-4 text-purple-300 opacity-0 group-hover/copy:opacity-100 transition-opacity absolute right-4" />
                </div>

                <a href="https://www.linkedin.com/in/pushpak-jadhav" target="_blank" rel="noopener noreferrer" className="bg-[#0a0a0a]/30 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors group/copy w-full">
                  <Linkedin className="w-4 h-4 text-purple-300" />
                  <span className="text-sm font-medium text-purple-100">LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Inside Scoop Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#101010] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-gray-400 text-sm mb-2">The Inside Scoop</p>
              <h3 className="text-2xl font-bold mb-1">Currently building</h3>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Techformers - A Revolutionary Community</h3>
            </div>
            
            {/* Code Snippet Background */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
            <div className="absolute right-[-20px] top-0 bottom-0 w-2/3 opacity-20 font-mono text-xs p-4 overflow-hidden select-none">
              <div className="text-blue-400">import</div> <div className="text-green-400">React</div> <div className="text-white">from</div> <div className="text-orange-400">'react'</div>;
              <br/>
              <div className="text-purple-400">const</div> <div className="text-yellow-400">Techformers</div> = () ={'>'} {'{'}
              <br/>&nbsp;&nbsp;<div className="text-purple-400">const</div> <div className="text-white">mission</div> = <div className="text-orange-400">"Connect & Grow"</div>;
              <br/>&nbsp;&nbsp;<div className="text-purple-400">return</div> (
              <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<div className="text-green-400">Community</div>{' />'}
              <br/>&nbsp;&nbsp;);
              <br/>{'}'};
            </div>
          </motion.div>

        </div>

        {/* Right Column (Tech Stack) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-span-1 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col h-full min-h-[600px] relative overflow-hidden"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-8">
              Passionate about cutting-edge technologies
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'C++', icon: <div className="w-3 h-3 bg-blue-500 rounded-full"/> },
                { name: 'Python', icon: <div className="w-3 h-3 bg-yellow-500 rounded-full"/> },
                { name: 'JavaScript', icon: <div className="w-3 h-3 bg-yellow-400 rounded-full"/> },
                { name: 'SQL', icon: <Database className="w-3 h-3 text-gray-400" /> },
                { name: 'HTML', icon: <div className="w-3 h-3 bg-orange-500 rounded-full"/> },
                { name: 'CSS', icon: <div className="w-3 h-3 bg-blue-500 rounded-full"/> },
                { name: 'React.js', icon: <div className="w-3 h-3 bg-cyan-400 rounded-full"/> },
                { name: 'Node.js', icon: <Server className="w-3 h-3 text-green-600" /> },
                { name: 'Express.js', icon: <div className="w-3 h-3 bg-gray-500 rounded-full"/> },
                { name: 'Next.js', icon: <div className="w-3 h-3 bg-white rounded-full"/> },
                { name: 'Langchain', icon: <div className="w-3 h-3 bg-green-500 rounded-full"/> },
                { name: 'FastAPI', icon: <div className="w-3 h-3 bg-teal-500 rounded-full"/> },
                { name: 'Mongoose', icon: <Database className="w-3 h-3 text-red-500" /> },
                { name: 'Redis', icon: <Database className="w-3 h-3 text-red-600" /> },
                { name: 'Websockets', icon: <div className="w-3 h-3 bg-purple-500 rounded-full"/> },
                { name: 'RestAPI', icon: <div className="w-3 h-3 bg-blue-400 rounded-full"/> },
                { name: 'JWT', icon: <div className="w-3 h-3 bg-pink-500 rounded-full"/> },
                { name: 'Git', icon: <div className="w-3 h-3 bg-orange-600 rounded-full"/> },
                { name: 'GitHub', icon: <Github className="w-3 h-3" /> },
                { name: 'Docker', icon: <div className="w-3 h-3 bg-blue-600 rounded-full"/> },
                { name: 'Kubernetes', icon: <div className="w-3 h-3 bg-blue-700 rounded-full"/> },
                { name: 'Terraform', icon: <div className="w-3 h-3 bg-purple-600 rounded-full"/> },
                { name: 'Prometheus', icon: <div className="w-3 h-3 bg-orange-700 rounded-full"/> },
                { name: 'Grafana', icon: <div className="w-3 h-3 bg-orange-500 rounded-full"/> },
                { name: 'MongoDB', icon: <Database className="w-3 h-3 text-green-500" /> },
                { name: 'MySQL', icon: <Database className="w-3 h-3 text-blue-400" /> },
                { name: 'AWS', icon: <div className="w-3 h-3 bg-yellow-600 rounded-full"/> },
                { name: 'Graphql', icon: <div className="w-3 h-3 bg-pink-600 rounded-full"/> },
              ].map((tech, i) => (
                <div key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                  {tech.icon}
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto relative">
             <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-2">
                    👋 Wanna know who's this <br/>
                    <span className="text-white font-bold">"Big Mahan Insaan"</span> <br/>
                    behind all this madness?
                  </p>
                  <button 
                    onClick={() => navigate('/about')}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-lg transition-colors w-full"
                  >
                    Meet the Big Mahan Insaan 🤣
                  </button>
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BentoGrid;
