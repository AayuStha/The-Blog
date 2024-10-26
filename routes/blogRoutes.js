const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllBlogs, getBlogById, createNewBlog } = require('../controllers/blogController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Define routes
router.get('/', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.get('/new-blog', (req, res) => {
    res.render('new-blog');
});
router.post('/new-blog', upload.single('imageUpload'), createNewBlog);

module.exports = router;
