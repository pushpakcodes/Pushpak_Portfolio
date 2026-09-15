const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'pushpak123';

app.use(cors());
app.use(express.json());

const initialBlogs = [
  {
    "id": "1789472692669",
    "title": "Testing Bold & Thumbnail Features",
    "slug": "testing-bold-thumbnail-features",
    "excerpt": "This is a test summary for testing bold text and thumbnail options.",
    "content": "Here is an intro sentence. **bold text** and this is regular text.",
    "tags": ["Tech"],
    "date": "Sep 15, 2026",
    "readTime": "4 min read",
    "coverImage": "/project looks/sheetpilot.png",
    "createdAt": "2026-09-15T11:44:52.669Z"
  },
  {
    "id": "sheetpilot-cursor-for-excel",
    "title": "SheetPilot: How I Built Cursor for Excel Using LangChain & LLMs",
    "slug": "sheetpilot-cursor-for-excel",
    "excerpt": "Automating spreadsheet workflows using natural language orchestration, LLM function calling, and real-time ExcelJS formula generation.",
    "content": "Spreadsheets run the corporate world, yet billions of hours are wasted manually constructing complex VLOOKUPs, pivot tables, and data transformations.\n\n### The Problem\nTraditional spreadsheet tools require manual formulas, nested conditionals, and constant manual data cleaning. Non-technical users struggle with complex Excel formulas, while power users waste repetitive time.\n\n### The Architecture\nSheetPilot bridges the gap between natural human intent and deterministic spreadsheet execution:\n1. **Natural Language Parser**: Takes plain text commands like 'Filter rows where revenue > 50k and calculate 15% bonus'.\n2. **LangChain Agent**: Deconstructs the prompt into actionable spreadsheet operations.\n3. **ExcelJS Orchestrator**: Generates clean, formulaic spreadsheet output in real-time.\n\n### Key Takeaways\nCombining modern LLMs with strict schema validation ensures that generated spreadsheets are non-hallucinatory and production-ready.",
    "tags": ["AI", "LangChain", "Node.js", "React"],
    "date": "Sep 10, 2026",
    "readTime": "5 min read",
    "coverImage": "/project looks/sheetpilot.png",
    "createdAt": "2026-09-10T10:00:00.000Z"
  },
  {
    "id": "mastering-competitive-programming",
    "title": "Mastering Competitive Programming: Lessons from 1867 LeetCode Knight",
    "slug": "mastering-competitive-programming",
    "excerpt": "Core data structures, problem-solving strategies, and mental models for mastering algorithmic coding contests and interviews.",
    "content": "Competitive programming is not just about writing code fast—it is about pattern recognition, memory optimization, and structured problem solving.\n\n### Key Strategies\n- **Master the Fundamentals**: Focus heavily on Graphs (BFS/DFS), Dynamic Programming, Segment Trees, and Disjoint Set Union (DSU).\n- **Time & Space Complexity Instincts**: Always analyze constraints ($N \\le 10^5$ implies $O(N \\log N)$ solution).\n- **Consistent Practice**: Quality over quantity. Analyze missed test cases deeply after every contest.\n\nBuilding algorithmic intuition takes time, but structured practice yields exponential results.",
    "tags": ["C++", "Algorithms", "Competitive Programming"],
    "date": "Aug 28, 2026",
    "readTime": "7 min read",
    "coverImage": "/about-bg.jpg",
    "createdAt": "2026-08-28T10:00:00.000Z"
  },
  {
    "id": "designing-modern-portfolios",
    "title": "Designing Modern Developer Portfolios with Glassmorphism & Framer Motion",
    "slug": "designing-modern-portfolios",
    "excerpt": "A breakdown of 3D tilt effects, parallax starfields, and dark-mode micro-animations for high-impact web applications.",
    "content": "Your portfolio is your digital storefront. Standard, flat templates fail to capture attention. Here is how modern visual aesthetics elevate user engagement:\n\n### Modern UI Aesthetics\n1. **3D Interactive Cards**: Utilizing CSS `preserve-3d` and Framer Motion hover transforms creates depth.\n2. **Dynamic Glassmorphism**: Combining low-opacity background fills with `backdrop-blur-md` creates an ultra-sleek, premium feel.\n3. **Parallax Starfields**: Floating ambient dots moving relative to mouse position bring pages to life.",
    "tags": ["React", "Framer Motion", "Tailwind CSS", "UI/UX"],
    "date": "Aug 14, 2026",
    "readTime": "4 min read",
    "coverImage": "/project looks/mrugakshi.png",
    "createdAt": "2026-08-14T10:00:00.000Z"
  }
];

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  date: { type: String },
  readTime: { type: String },
  coverImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

let isConnected = false;
async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      const count = await Blog.countDocuments();
      if (count === 0 && initialBlogs.length > 0) {
        await Blog.insertMany(initialBlogs);
      }
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const verifyAdmin = (req, res, next) => {
  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ message: 'Unauthorized: Invalid Admin Secret Key' });
  }
  next();
};

const blogRouter = express.Router();

blogRouter.post('/verify-pin', (req, res) => {
  const { pin } = req.body;
  if (pin === ADMIN_SECRET) {
    return res.status(200).json({ success: true, message: 'Admin verified successfully' });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin Secret Key' });
});

blogRouter.get('/', async (req, res) => {
  try {
    if (isConnected) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    } else {
      return res.status(200).json(initialBlogs);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

blogRouter.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (isConnected) {
      const blog = await Blog.findOne({ $or: [{ slug: slug }, { _id: mongoose.isValidObjectId(slug) ? slug : null }] });
      if (!blog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json(blog);
    } else {
      const blog = initialBlogs.find(b => b.slug === slug || b.id === slug);
      if (!blog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json(blog);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
});

blogRouter.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, slug, excerpt, content, tags, date, readTime, coverImage } = req.body;
    const formattedSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newBlogData = {
      title,
      slug: formattedSlug,
      excerpt,
      content,
      tags: tags || [],
      date: date || formattedDate,
      readTime: readTime || '4 min read',
      coverImage: coverImage || '/about-bg.jpg',
      createdAt: new Date()
    };

    if (isConnected) {
      const newBlog = new Blog(newBlogData);
      await newBlog.save();
      return res.status(201).json(newBlog);
    } else {
      initialBlogs.unshift({ ...newBlogData, id: Date.now().toString() });
      return res.status(201).json(newBlogData);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog post' });
  }
});

blogRouter.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (isConnected) {
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedBlog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json(updatedBlog);
    } else {
      const index = initialBlogs.findIndex(b => b.id === id || b.slug === id);
      if (index === -1) return res.status(404).json({ message: 'Blog post not found' });
      initialBlogs[index] = { ...initialBlogs[index], ...req.body };
      return res.status(200).json(initialBlogs[index]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog post' });
  }
});

blogRouter.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (isConnected) {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json({ message: 'Blog post deleted successfully' });
    } else {
      const newBlogs = initialBlogs.filter(b => b.id !== id && b.slug !== id && b._id !== id);
      return res.status(200).json({ message: 'Blog post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
});

app.use('/api/blogs', blogRouter);
app.use('/blogs', blogRouter);

app.get('/api', (req, res) => res.send('API is running...'));
app.get('/', (req, res) => res.send('API is running...'));

module.exports = app;
