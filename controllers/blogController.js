const Blog = require('../models/blog');

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('index', { blogs });
    } catch (err) {
        console.error('Error retrieving blogs:', err);
        res.status(500).send('Error retrieving blogs');
    }
};

// Get a specific blog
const getBlogById = async (req, res) => {
    const blogId = Number(req.params.id);
    try {
        const blog = await Blog.findOne({ id: blogId });
        if (blog) {
            const relatedBlogs = await Blog.find({ id: { $ne: blogId } }).limit(5);
            res.render('blog-detail', { blog, relatedBlogs });
        } else {
            res.status(404).send('Blog not found');
        }
    } catch (err) {
        console.error('Error retrieving blog:', err);
        res.status(500).send('Error retrieving blog');
    }
};

// Create a new blog
const createNewBlog = async (req, res) => {
    const { title, imgSrc, content } = req.body;
    const imageUpload = req.file ? `/uploads/${req.file.filename}` : imgSrc;
    try {
        const lastBlog = await Blog.findOne().sort({ id: -1 });
        const newBlog = new Blog({
            id: lastBlog ? lastBlog.id + 1 : 1,
            time: new Date().toLocaleDateString(),
            title,
            imgSrc: imageUpload,
            content
        });
        await newBlog.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving blog:', err);
        res.status(500).send('Error saving blog');
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createNewBlog
};
