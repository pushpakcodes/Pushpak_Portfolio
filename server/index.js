const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'pushpak123';
const DATA_FILE = path.join(__dirname, 'data', 'blogs.json');

app.use(cors());
app.use(express.json());

const Blog = require('./models/Blog');

// MongoDB Connection attempt
let isMongoConnected = false;
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('MongoDB connected successfully');
      isMongoConnected = true;
      try {
        const count = await Blog.countDocuments();
        if (count === 0) {
          const initialBlogs = readBlogsFromFile();
          if (initialBlogs.length > 0) {
            await Blog.insertMany(initialBlogs);
            console.log('Seeded initial blogs into MongoDB');
          }
        }
      } catch (seedErr) {
        console.error('Error seeding initial blogs:', seedErr);
      }
    })
    .catch((err) => {
      console.log('MongoDB connection failed. Using JSON file storage fallback.', err.message);
      isMongoConnected = false;
    });
}

// Helper for JSON File fallback
const readBlogsFromFile = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading blogs.json:', err);
  }
  return [];
};

const writeBlogsToFile = (blogs) => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing blogs.json:', err);
  }
};

// Admin Protection Middleware
const verifyAdmin = (req, res, next) => {
  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ message: 'Unauthorized: Invalid Admin Secret Key' });
  }
  next();
};

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Admin PIN Verification Endpoint
app.post('/api/blogs/verify-pin', (req, res) => {
  const { pin } = req.body;
  if (pin === ADMIN_SECRET) {
    return res.status(200).json({ success: true, message: 'Admin verified successfully' });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin Secret Key' });
});

// GET all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    if (isMongoConnected) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    } else {
      const blogs = readBlogsFromFile();
      return res.status(200).json(blogs);
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

// GET single blog by slug or ID
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (isMongoConnected) {
      const blog = await Blog.findOne({ $or: [{ slug: slug }, { _id: mongoose.isValidObjectId(slug) ? slug : null }] });
      if (!blog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json(blog);
    } else {
      const blogs = readBlogsFromFile();
      const blog = blogs.find(b => b.slug === slug || b.id === slug);
      if (!blog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json(blog);
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
});

// POST create blog (Admin Protected)
app.post('/api/blogs', verifyAdmin, async (req, res) => {
  try {
    const { title, slug, excerpt, content, tags, date, readTime, coverImage, bannerImage } = req.body;
    
    const formattedSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newBlogData = {
      id: Date.now().toString(),
      title,
      slug: formattedSlug,
      excerpt,
      content,
      tags: tags || [],
      date: date || formattedDate,
      readTime: readTime || '4 min read',
      coverImage: coverImage || '/about-bg.jpg',
      bannerImage: bannerImage || '',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      const newBlog = new Blog({ ...newBlogData, createdAt: new Date() });
      await newBlog.save();
      return res.status(201).json(newBlog);
    } else {
      const blogs = readBlogsFromFile();
      blogs.unshift(newBlogData);
      writeBlogsToFile(blogs);
      return res.status(201).json(newBlogData);
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog post' });
  }
});

// PUT update blog (Admin Protected)
app.put('/api/blogs/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoConnected) {
      const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedBlog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json(updatedBlog);
    } else {
      let blogs = readBlogsFromFile();
      const index = blogs.findIndex(b => b.id === id || b.slug === id);
      if (index === -1) return res.status(404).json({ message: 'Blog post not found' });

      blogs[index] = { ...blogs[index], ...updateData };
      writeBlogsToFile(blogs);
      return res.status(200).json(blogs[index]);
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog post' });
  }
});

// DELETE blog (Admin Protected)
app.delete('/api/blogs/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) return res.status(404).json({ message: 'Blog post not found' });
      return res.status(200).json({ message: 'Blog post deleted successfully' });
    } else {
      let blogs = readBlogsFromFile();
      const newBlogs = blogs.filter(b => b.id !== id && b.slug !== id && b._id !== id);
      writeBlogsToFile(newBlogs);
      return res.status(200).json({ message: 'Blog post deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
});

// Email Route
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'pushpakzworkspace@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h3>New Message from Portfolio Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
