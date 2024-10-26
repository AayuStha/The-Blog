const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    time: { type: String, required: true },
    title: { type: String, required: true },
    imgSrc: { type: String, required: true },
    content: { type: String, required: true }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
