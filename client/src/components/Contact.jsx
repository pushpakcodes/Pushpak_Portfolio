import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateMovement = (factor) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative pt-32 pb-20 px-4 md:px-8 flex items-center justify-center">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
      </div>

      {/* Parallax Dots (Matching Homepage/About) */}
      <motion.div animate={calculateMovement(-0.05)} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-50 pointer-events-none" />
      <motion.div animate={calculateMovement(0.08)} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-50 pointer-events-none" />
      <motion.div animate={calculateMovement(-0.1)} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30 pointer-events-none" />
      <motion.div animate={calculateMovement(0.06)} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute top-1/2 right-[10%] w-1 h-1 bg-white rounded-full opacity-20 pointer-events-none" />
      <motion.div animate={calculateMovement(-0.12)} transition={{ type: "spring", stiffness: 50, damping: 20 }} className="absolute bottom-1/3 right-[20%] w-2 h-2 bg-purple-400/20 rounded-full blur-[1px] pointer-events-none" />
      <motion.div animate={calculateMovement(0.15)} transition={{ type: "spring", stiffness: 40, damping: 15 }} className="absolute top-[15%] right-[35%] w-1 h-1 bg-blue-300/40 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.08)} transition={{ type: "spring", stiffness: 60, damping: 25 }} className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 bg-white/30 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.12)} transition={{ type: "spring", stiffness: 45, damping: 20 }} className="absolute top-[10%] left-[50%] w-1 h-1 bg-purple-300/40 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.15)} transition={{ type: "spring", stiffness: 55, damping: 15 }} className="absolute top-[80%] right-[45%] w-1 h-1 bg-white/20 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.2)} transition={{ type: "spring", stiffness: 40, damping: 20 }} className="absolute top-[20%] left-[10%] w-0.5 h-0.5 bg-blue-400/60 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.18)} transition={{ type: "spring", stiffness: 60, damping: 20 }} className="absolute bottom-[5%] right-[5%] w-1 h-1 bg-purple-300/40 rounded-full pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Column: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Let's <span className="font-serif italic text-purple-400">Connect</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Have a project in mind or just want to chat? I'm always open to new opportunities and creative collaborations.
            </p>
          </div>

          <div className="space-y-6">
            <a href="mailto:pushpakzworkspace@gmail.com" className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium group-hover:text-purple-300 transition-colors">pushpakzworkspace@gmail.com</p>
              </div>
            </a>

            <a href="tel:+919322805835" className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white font-medium group-hover:text-purple-300 transition-colors">+91 9322805835</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/pushpak-jadhav" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <FaLinkedinIn size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">LinkedIn</p>
                <p className="text-white font-medium group-hover:text-purple-300 transition-colors">Connect on LinkedIn</p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a 
              href="https://github.com/pushpakcodes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <FaGithub size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/in/pushpak-jadhav" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <FaLinkedinIn size={22} />
            </a>
            <a 
              href="mailto:pushpakzworkspace@gmail.com" 
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Mail size={22} />
            </a>
            <a 
              href="tel:+919322805835" 
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Phone size={22} />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl transform rotate-3 scale-105 opacity-50"></div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                  placeholder="How can I help you?"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={18} className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSubmitting ? 'hidden' : ''}`} />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col items-center justify-center text-center h-full min-h-[500px]"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30"
              >
                <Send size={40} className="text-white" />
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-white mb-4"
              >
                Thank You!
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 text-lg mb-8 max-w-xs"
              >
                Your message has been sent successfully.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10"
              >
                <p className="text-xl font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  I'll get back to you soon! ✨
                </p>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-sm text-gray-500 hover:text-white transition-colors"
              >
                Send another message
              </motion.button>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
