import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogDetail = ({ blogs }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to find from props
    const found = blogs?.find(b => b.slug === slug || b.id === slug || b._id === slug);
    if (found) {
      setBlog(found);
      setLoading(false);
      return;
    }

    // If not in props, fetch directly from API
    const API_BASE = import.meta.env.VITE_API_URL !== undefined
      ? import.meta.env.VITE_API_URL
      : (import.meta.env.DEV ? 'http://localhost:5000' : '');

    const fetchBlog = async () => {
      try {
        // Try fetching individual blog by slug
        const res = await fetch(`${API_BASE}/api/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
          setLoading(false);
          return;
        }

        // Fallback: fetch all blogs and find by slug
        const allRes = await fetch(`${API_BASE}/api/blogs`);
        if (allRes.ok) {
          const allBlogs = await allRes.json();
          const match = allBlogs.find(b => b.slug === slug || b.id === slug || b._id === slug);
          if (match) {
            setBlog(match);
          }
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, blogs]);

  // Helper to render text with bold syntax (**bold**) formatted cleanly
  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#0F0F0F]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#0F0F0F] flex flex-col items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-black rounded-full animate-spin"></div>
        <p className="mt-4 text-stone-500 text-sm font-mono">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#0F0F0F] flex flex-col items-center justify-center pt-24">
        <h2 className="text-2xl font-bold font-serif mb-4 text-[#0F0F0F]">Blog Article Not Found</h2>
        <button
          onClick={() => navigate('/blogs')}
          className="px-5 py-2.5 bg-[#800020] text-white rounded-xl text-sm font-semibold hover:bg-[#6B1D2F] transition-colors flex items-center gap-2 shadow-md"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#FAF7F2] text-[#0F0F0F] pt-28 pb-20 px-4 selection:bg-[#800020]/20">
      {/* Off-White Ambient Dot Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D6CEC0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#800020]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#3E271D]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back to Articles Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="mb-8 px-4 py-2 bg-[#FFFFFF] border border-[#E5DFD5] rounded-full text-xs font-sans uppercase tracking-wider text-stone-700 hover:text-black hover:border-black/40 shadow-sm transition-all flex items-center gap-2 font-bold"
        >
          <ArrowLeft size={14} /> Back to All Articles
        </button>

        {/* Hero Article Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-3xl overflow-hidden p-6 md:p-10 mb-10 shadow-xl relative text-[#0F0F0F]"
        >
          {/* Header Metadata Pills (Date only, readTime removed) */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-600 mb-6">
            <span className="flex items-center gap-1.5 bg-[#F4F0E8] border border-[#DCD5CB] px-3.5 py-1.5 rounded-full font-semibold text-black">
              <Calendar size={13} className="text-black" />
              {blog.date}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-6 text-[#0F0F0F]">
            {blog.title}
          </h1>

          {/* Tag Pills (NO HASHTAG #) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#F4F0E8] border border-[#DCD5CB] text-stone-800 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Cover / Thumbnail Image View */}
          {blog.coverImage && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#E2DCD0] mb-8 bg-[#F5F2EB] shadow-md">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/about-bg.jpg'; }}
              />
            </div>
          )}

          {/* Excerpt Banner */}
          <div className="p-4 md:p-6 bg-black/5 border-l-4 border-black rounded-r-2xl mb-8 italic text-stone-800 text-sm md:text-base leading-relaxed">
            "{blog.excerpt}"
          </div>

          {/* Article Body Content */}
          <div className="prose max-w-none text-stone-800 text-base leading-relaxed space-y-6 font-sans">
            {blog.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-bold font-serif text-[#0F0F0F] pt-4 pb-2 border-b border-[#F0EBE1]">
                    {renderFormattedText(paragraph.replace('### ', ''))}
                  </h3>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-3xl font-bold font-serif text-[#0F0F0F] pt-6 pb-2 border-b border-[#E5DFD5]">
                    {renderFormattedText(paragraph.replace('## ', ''))}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="space-y-2 list-disc list-inside text-stone-800 pl-2">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{renderFormattedText(item.replace('- ', ''))}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-stone-800 leading-relaxed whitespace-pre-line">
                  {renderFormattedText(paragraph)}
                </p>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
