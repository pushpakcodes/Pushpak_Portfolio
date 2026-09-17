import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
          {/* Header Metadata Pills */}
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

          {/* Tag Pills */}
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
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#E2DCD0] mb-8 bg-[#F5F2EB] shadow-md clear-both">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { e.target.src = '/about-bg.jpg'; }}
              />
            </div>
          )}

          {/* Excerpt Banner */}
          <div className="p-4 md:p-6 bg-black/5 border-l-4 border-black rounded-r-2xl mb-8 italic text-stone-800 text-sm md:text-base leading-relaxed clear-both">
            "{blog.excerpt}"
          </div>

          {/* Banner Image View */}
          {blog.bannerImage && (
            <div className="w-full rounded-2xl overflow-hidden border border-[#E2DCD0] mb-8 bg-[#F5F2EB] shadow-md clear-both">
              <img
                src={blog.bannerImage}
                alt={`${blog.title} Banner`}
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Article Body Content (Markdown) */}
          <div className="prose max-w-none text-stone-800 text-base leading-relaxed space-y-6 font-sans clear-both">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold font-serif text-[#0F0F0F] pt-6 pb-2 border-b border-[#E5DFD5] clear-both" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold font-serif text-[#0F0F0F] pt-4 pb-2 border-b border-[#F0EBE1] clear-both" {...props} />,
                p: ({node, ...props}) => <p className="text-stone-800 leading-relaxed whitespace-pre-wrap" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-[#0F0F0F]" {...props} />,
                ul: ({node, ...props}) => <ul className="space-y-2 list-disc list-inside text-stone-800 pl-2" {...props} />,
                ol: ({node, ...props}) => <ol className="space-y-2 list-decimal list-inside text-stone-800 pl-2" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="p-4 md:p-6 bg-black/5 border-l-4 border-black rounded-r-2xl my-6 italic text-stone-800 text-sm md:text-base leading-relaxed clear-both">
                    {props.children}
                  </blockquote>
                ),
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <div className="clear-both my-6">
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl overflow-hidden shadow-lg text-sm"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-stone-200/60 text-black px-1.5 py-0.5 rounded-md font-mono text-sm" {...props}>
                      {children}
                    </code>
                  )
                },
                img: ({node, alt, src, ...props}) => {
                  let alignClass = 'my-8 max-w-[70%] mx-auto'; // Default center
                  let caption = alt || '';
                  
                  // Check if alt tag has positioning pipe, e.g. "left | My Caption"
                  if (alt && alt.includes('|')) {
                    const parts = alt.split('|').map(s => s.trim());
                    const pos = parts[0].toLowerCase();
                    caption = parts[1] || '';
                    
                    if (pos === 'left') alignClass = 'md:float-left md:w-[45%] md:mr-6 mb-4 mt-2 w-full';
                    else if (pos === 'right') alignClass = 'md:float-right md:w-[45%] md:ml-6 mb-4 mt-2 w-full';
                    else if (pos === 'full') alignClass = 'w-full my-8';
                    else alignClass = 'my-8 max-w-[70%] mx-auto block'; // default center
                  }

                  return (
                    <div className={`flex flex-col ${alignClass}`}>
                      <div className="w-full rounded-2xl overflow-hidden border border-[#E2DCD0] shadow-md bg-[#F5F2EB]">
                        <img 
                          src={src} 
                          alt={caption}
                          className="w-full h-auto object-cover" 
                          referrerPolicy="no-referrer"
                          {...props} 
                        />
                      </div>
                      {caption && (
                        <span className="text-center text-xs text-stone-500 italic mt-2 w-full block">
                          {caption}
                        </span>
                      )}
                    </div>
                  );
                }
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
