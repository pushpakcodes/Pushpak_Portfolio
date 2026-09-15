import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Plus, Edit3, PenTool, Edit2, Trash2, Calendar, BookOpen, X, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogModal from './BlogModal';

const Blogs = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Admin PIN State
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState('');

  // Blog Create/Edit Modal State
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL !== undefined 
    ? import.meta.env.VITE_API_URL 
    : (import.meta.env.DEV ? 'http://localhost:5000' : '');
  const API_URL = `${API_BASE}/api/blogs`;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut listener Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowPinModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check URL query param for ?admin=true
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('admin') === 'true') {
      setShowPinModal(true);
    }
  }, []);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const calculateMovement = (factor) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  // Handle PIN verification
  const handleVerifyPin = async (e) => {
    e.preventDefault();
    setPinError('');
    try {
      const res = await fetch(`${API_URL}/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: adminPin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setShowPinModal(false);
        setAdminPin('');
      } else {
        setPinError(data.message || 'Incorrect Admin PIN');
      }
    } catch (err) {
      setPinError('Connection error to server');
    }
  };

  // Handle Save Blog (Create or Update)
  const handleSaveBlog = async (blogData) => {
    try {
      const method = editingBlog ? 'PUT' : 'POST';
      const endpoint = editingBlog ? `${API_URL}/${editingBlog._id || editingBlog.id}` : API_URL;

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminPin || 'pushpak123'
        },
        body: JSON.stringify(blogData)
      });

      if (res.ok) {
        setShowBlogModal(false);
        setEditingBlog(null);
        fetchBlogs();
      } else {
        alert('Failed to save blog post. Please verify Admin PIN.');
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      alert('Error saving blog post');
    }
  };

  // Handle Delete Blog
  const handleDeleteBlog = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-secret': adminPin || 'pushpak123'
        }
      });

      if (res.ok) {
        fetchBlogs();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  // Extract all unique existing tags/labels
  const existingLabels = Array.from(new Set(blogs.flatMap(b => b.tags || []))).filter(Boolean);
  const allTags = ['All', ...existingLabels];

  // Filtered blogs by Search Query and Tag Selection
  const filteredBlogs = blogs.filter(blog => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' ||
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      (blog.content && blog.content.toLowerCase().includes(query)) ||
      (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(query)));

    const matchesTag = selectedTag === 'All' || (blog.tags && blog.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#FAF7F2] text-[#0F0F0F] selection:bg-black selection:text-white">

      {/* Off-White Ambient Dot Grid */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#C8BFB0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Parallax Floating Dots */}
      <motion.div
        animate={calculateMovement(-0.05)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-stone-400 rounded-full opacity-30 pointer-events-none z-10"
      />
      <motion.div
        animate={calculateMovement(0.08)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/3 right-1/4 w-2 h-2 bg-stone-500 rounded-full opacity-30 pointer-events-none z-10"
      />

      {/* Main Content Container - Perfectly Proportioned */}
      <div className="relative z-20 container mx-auto px-4 pt-24 md:pt-28 pb-12">

        {/* Header Section */}
        <div className="text-center mb-8 space-y-3 relative max-w-4xl mx-auto">
          
          {/* Pen / Edit Symbol Unlock Trigger */}
          <button
            onClick={() => isAdmin ? setIsAdmin(false) : setShowPinModal(true)}
            className="absolute -top-3 right-0 p-2.5 rounded-full bg-[#FFFFFF] border border-[#E5DFD5] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white transition-all group shadow-sm z-30"
            title={isAdmin ? "Admin Mode Active (Click to Logout)" : "Admin Edit & Manage Articles"}
          >
            {isAdmin ? (
              <PenTool className="w-4 h-4 text-black group-hover:text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Edit3 className="w-4 h-4 text-stone-600 group-hover:text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
          
          {/* Header Title: BLOGS in Montserrat font */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-wider uppercase text-black leading-none my-2"
          >
            BLOGS
          </motion.h1>
          
          {/* Subtitle in Manrope Font - Enlarged & Elegant */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Manrope', sans-serif" }}
            className="text-stone-700 text-sm md:text-base lg:text-lg font-medium max-w-3xl mx-auto leading-relaxed pt-1"
          >
            "Pushpak dives deep into system design, dissects complex systems, and uncovers what makes them work under the hood and this are his Blogs !"
          </motion.p>

          {/* Admin Mode Status Banner */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-3 flex items-center justify-center gap-4"
            >
              <button
                onClick={() => { setEditingBlog(null); setShowBlogModal(true); }}
                className="px-5 py-2 bg-black hover:bg-stone-800 text-white rounded-full font-medium text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <Plus size={14} /> Create New Blog Post
              </button>
              <span className="text-[11px] font-mono text-black bg-stone-200/80 border border-stone-300 px-3 py-0.5 rounded-full font-semibold">
                Admin Mode Active
              </span>
            </motion.div>
          )}
        </div>

        {/* Search Bar & Tag Labeling Filter System */}
        <div className="max-w-5xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles by title, content or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-full pl-9 pr-4 py-2 text-xs text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Tag Label Filter Pills (NO HASHTAG # SYMBOL) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                    selectedTag === tag
                      ? 'bg-black text-white border-black shadow-sm font-semibold'
                      : 'bg-[#FFFFFF] text-stone-700 border-[#E5DFD5] hover:text-black hover:border-stone-400'
                  }`}
                >
                  {tag === 'All' ? 'All Articles' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blogs Clean Cards Grid (4 Columns per Row, 16:9 Widescreen Thumbnails) */}
        {loading ? (
          <div className="text-center py-16 text-stone-500 font-mono text-xs">
            Loading articles...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 text-stone-500 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
            <p className="text-base font-medium">No blog posts found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px] mx-auto mb-12">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id || blog.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.25, ease: "easeOut" }
                }}
                transition={{ delay: 0.05 * index }}
                onClick={() => navigate(`/blogs/${blog.slug || blog.id}`)}
                className="group relative bg-[#FFFFFF] border border-[#E5DFD5] rounded-2xl overflow-hidden hover:border-black/40 transition-all duration-300 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.12)] flex flex-col justify-between cursor-pointer"
              >
                {/* 16:9 Full-Width Thumbnail Banner */}
                <div className="relative w-full aspect-video overflow-hidden bg-[#F5F2EB]">
                  <img 
                    src={blog.coverImage || "/about-bg.jpg"} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = '/about-bg.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-[#0F0F0F]/5 group-hover:bg-transparent transition-colors"></div>

                  {/* Admin Action Badges */}
                  {isAdmin && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-[#FFFFFF]/95 backdrop-blur-md border border-stone-300 p-1.5 rounded-full z-30 shadow-md">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingBlog(blog);
                          setShowBlogModal(true);
                        }}
                        className="p-1.5 rounded-full bg-stone-100 hover:bg-black text-stone-700 hover:text-white transition-colors"
                        title="Edit Blog"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlog(blog._id || blog.id, blog.title);
                        }}
                        className="p-1.5 rounded-full bg-stone-100 hover:bg-red-600 text-stone-700 hover:text-white transition-colors"
                        title="Delete Blog"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-4.5 sm:p-5 space-y-3 bg-[#FFFFFF] flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500 font-semibold">
                      <Calendar size={11} className="text-black" />
                      <span>{blog.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0F0F0F] group-hover:text-black transition-colors line-clamp-2 leading-snug min-h-[48px]">
                      {blog.title}
                    </h3>
                    
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3 min-h-[52px]">
                      {blog.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-3 flex items-center justify-between border-t border-[#F0EBE1] mt-2">
                     {/* Labeling System Tag Pills */}
                     <div className="flex flex-wrap gap-1 max-w-[60%]">
                       {blog.tags?.slice(0, 2).map((tag, i) => (
                         <span
                           key={i} 
                           className="px-2 py-0.5 rounded-md bg-[#F4F0E8] border border-[#DCD5CB] text-[10px] font-sans text-stone-800 font-semibold"
                         >
                           {tag}
                         </span>
                       ))}
                     </div>
                     
                     {/* Read Article Action Button */}
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         navigate(`/blogs/${blog.slug || blog.id}`);
                       }}
                       className="px-3 py-1 bg-black/5 border border-black/20 rounded-lg flex items-center gap-1 text-xs font-semibold text-black hover:bg-black hover:text-white transition-all group/link hover:shadow-sm whitespace-nowrap"
                     >
                       Read
                       <span className="group-hover/link:translate-x-0.5 transition-transform">
                          <ExternalLink size={11} />
                       </span>
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Admin PIN Verification Modal */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl text-[#0F0F0F]"
            >
              <button
                onClick={() => setShowPinModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-200/60 hover:bg-stone-300 transition-colors text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-2xl bg-black/10 border border-black/20 text-black">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#0F0F0F]">Admin Verification</h3>
                  <p className="text-xs text-stone-500 font-medium">Portfolio Management</p>
                </div>
              </div>

              {/* Admin Prompt Request */}
              <div className="mb-6 p-4 bg-[#F4F0E8] border border-[#DCD5CB] rounded-2xl text-xs text-stone-700 leading-relaxed">
                <p>
                  If you want to publish your blog please enter PIN you received from admin else email them at{' '}
                  <a
                    href="mailto:pushpakzworkspace@gmail.com"
                    className="text-black font-bold underline hover:text-stone-700"
                  >
                    pushpakzworkspace@gmail.com
                  </a>{' '}
                  with your blog attached to receiver the PIN. Thank you !
                </p>
              </div>

              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Admin PIN..."
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    required
                    autoFocus
                    className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl px-4 py-3 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm"
                  />
                </div>

                {pinError && (
                  <p className="text-xs text-red-600 font-mono font-medium">{pinError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-black hover:bg-stone-800 text-sm font-semibold text-white shadow-md transition-all"
                >
                  Enter PIN
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Create/Edit Modal Component */}
      <BlogModal
        isOpen={showBlogModal}
        onClose={() => { setShowBlogModal(false); setEditingBlog(null); }}
        onSave={handleSaveBlog}
        editingBlog={editingBlog}
        existingLabels={existingLabels}
      />
    </div>
  );
};

export default Blogs;
