import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Image, Bold, Tag, ChevronDown } from 'lucide-react';

const BlogModal = ({ isOpen, onClose, onSave, editingBlog, existingLabels = [] }) => {
  const defaultCurrentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: defaultCurrentDate,
    excerpt: '',
    content: '',
    tags: '',
    coverImage: ''
  });

  const contentTextAreaRef = useRef(null);

  const presetImages = [
    { name: 'SheetPilot', url: '/project looks/sheetpilot.png' },
    { name: 'Mrugakshi', url: '/project looks/mrugakshi.png' },
    { name: 'HRIS', url: '/project looks/HRIS.png' },
    { name: 'MindEase', url: '/project looks/mindease.png' },
    { name: 'Mocktail', url: '/project looks/Mocktail_Maker.png' },
    { name: 'Default Cover', url: '/about-bg.jpg' }
  ];

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || '',
        slug: editingBlog.slug || '',
        date: editingBlog.date || defaultCurrentDate,
        excerpt: editingBlog.excerpt || '',
        content: editingBlog.content || '',
        tags: Array.isArray(editingBlog.tags) ? editingBlog.tags.join(', ') : editingBlog.tags || '',
        coverImage: editingBlog.coverImage || ''
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        date: defaultCurrentDate,
        excerpt: '',
        content: '',
        tags: '',
        coverImage: ''
      });
    }
  }, [editingBlog, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      const autoSlug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: autoSlug
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Toggle/Add Existing Label from dropdown or suggestion chip
  const handleAddExistingTag = (tagToToggle) => {
    if (!tagToToggle) return;
    const currentTags = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    let newTags;
    if (currentTags.includes(tagToToggle)) {
      newTags = currentTags.filter(t => t !== tagToToggle);
    } else {
      newTags = [...currentTags, tagToToggle];
    }

    setFormData(prev => ({ ...prev, tags: newTags.join(', ') }));
  };

  // Bold Text Formatting Helper
  const handleInsertBold = () => {
    const textarea = contentTextAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content;

    const selectedText = text.substring(start, end);
    const replacement = selectedText ? `**${selectedText}**` : '**bold text**';

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = selectedText ? start + replacement.length : start + 2;
      textarea.setSelectionRange(newCursorPos, selectedText ? newCursorPos : newCursorPos + 9);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : ['Tech'];

    const finalSlug = (formData.slug || formData.title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    onSave({
      ...formData,
      slug: finalSlug,
      tags: tagsArray
    });
  };

  const activeTagList = formData.tags
    ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-3xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl my-8 text-[#0F0F0F]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-200/60 hover:bg-stone-300 transition-colors text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-black/10 border border-black/20 text-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif text-[#0F0F0F]">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <p className="text-xs text-stone-500 font-semibold">Admin Mode Active</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Building Scalable Web Apps with MERN"
              required
              className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl px-4 py-2.5 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
            />
          </div>

          {/* Slug & Custom Publish Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
                Slug (Optional Custom URL)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="auto-generated-if-empty"
                className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl px-4 py-2.5 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold mb-1.5 flex items-center justify-between">
                <span>Publish Date *</span>
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g. Sep 15, 2026"
                required
                className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl px-4 py-2.5 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black transition-all shadow-sm font-sans"
              />
            </div>
          </div>

          {/* Label Selection Dropdown & Suggestions Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold">
                Labels / Tags
              </label>

              {/* Label Selection Dropdown Menu */}
              {existingLabels.length > 0 && (
                <div className="relative">
                  <select
                    onChange={(e) => {
                      handleAddExistingTag(e.target.value);
                      e.target.value = '';
                    }}
                    className="appearance-none bg-[#FFFFFF] border border-[#E5DFD5] rounded-lg px-3 py-1 pr-7 text-xs font-medium text-stone-800 focus:outline-none focus:border-black shadow-sm cursor-pointer"
                  >
                    <option value="">Select from existing labels...</option>
                    {existingLabels.map(label => (
                      <option key={label} value={label}>
                        {activeTagList.includes(label) ? `✓ ${label}` : `+ ${label}`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}
            </div>

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, LangChain, AI, Node.js"
              className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl px-4 py-2.5 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black transition-all shadow-sm"
            />

            {/* Suggestions displaying ONLY already present labels (NO HASHTAG #) */}
            {existingLabels.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-mono text-stone-600 font-semibold">Existing Label Suggestions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {existingLabels.map(label => {
                    const isSelected = activeTagList.includes(label);
                    return (
                      <button
                        type="button"
                        key={label}
                        onClick={() => handleAddExistingTag(label)}
                        className={`px-2.5 py-1 text-[11px] font-sans rounded-md transition-all border ${
                          isSelected
                            ? 'bg-black text-white border-black font-semibold shadow-sm'
                            : 'bg-[#FFFFFF] text-stone-800 border-[#E5DFD5] hover:border-black/40'
                        }`}
                      >
                        {label} {isSelected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Picture Option & Preview Section */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold">
              Thumbnail Cover Image URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="/project looks/sheetpilot.png or https://..."
                  className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Quick Pick Preset Images */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none">
              <span className="text-[11px] font-mono text-stone-500 font-semibold whitespace-nowrap">Presets:</span>
              {presetImages.map((preset, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: preset.url }))}
                  className="px-2.5 py-1 text-[10px] font-medium bg-[#FFFFFF] border border-[#E5DFD5] rounded-lg text-stone-700 hover:bg-black/10 hover:text-black hover:border-black/30 transition-all whitespace-nowrap shadow-sm"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Thumbnail Image Live Preview */}
            {formData.coverImage && (
              <div className="mt-2 p-2 bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl flex items-center gap-3">
                <div className="w-16 h-10 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 flex-shrink-0">
                  <img
                    src={formData.coverImage}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/about-bg.jpg'; }}
                  />
                </div>
                <div className="text-xs text-stone-600 truncate">
                  <span className="font-semibold text-black">Thumbnail Preview</span>
                  <p className="text-[11px] text-stone-400 truncate">{formData.coverImage}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold mb-1.5">
              Short Summary / Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              placeholder="Brief 1-2 sentence description of the blog post..."
              required
              className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl px-4 py-2.5 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black transition-all shadow-sm resize-none"
            />
          </div>

          {/* Blog Content Section with Bold Formatting Toolbar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 font-semibold">
                Blog Article Content *
              </label>

              {/* Toolbar Option for Bold Character Selection */}
              <div className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E5DFD5] px-2 py-1 rounded-lg shadow-sm">
                <button
                  type="button"
                  onClick={handleInsertBold}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-[#0F0F0F] hover:bg-black/10 hover:text-black transition-colors"
                  title="Make Selected Character/Text Bold (**bold**)"
                >
                  <Bold size={13} className="text-black" />
                  <span>Bold</span>
                </button>
                <span className="text-[10px] text-stone-400 font-mono">(`**bold**`)</span>
              </div>
            </div>

            <textarea
              ref={contentTextAreaRef}
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              placeholder="Write your article content here. Highlight any text and click 'Bold' above to format bold text..."
              required
              className="w-full bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl px-4 py-3 text-sm text-[#0F0F0F] placeholder-stone-400 focus:outline-none focus:border-black transition-all shadow-sm font-sans leading-relaxed"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[#E5DFD5]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium text-stone-600 hover:text-[#0F0F0F] hover:bg-stone-200/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-stone-800 text-sm font-semibold text-white shadow-md transition-all"
            >
              {editingBlog ? 'Save Changes' : 'Publish Article'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BlogModal;
