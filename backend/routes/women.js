const express = require('express');
const router = express.Router();
const Woman = require('../models/Woman');

// GET /api/women — Get all women with optional search & filter
router.get('/', async (req, res) => {
  try {
    const { search, field, page = 1, limit = 12, sort = '-createdAt' } = req.query;

    const query = {};

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Field filter
    if (field && field !== 'All') {
      query.field = field;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [women, total] = await Promise.all([
      Woman.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-biography -gallery'),
      Woman.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: women,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/women/featured — Get featured "Woman of the Day"
router.get('/featured', async (req, res) => {
  try {
    let featured = await Woman.findOne({ isFeatured: true });

    // Fallback: return a random one if none is explicitly featured
    if (!featured) {
      const count = await Woman.countDocuments();
      const random = Math.floor(Math.random() * count);
      featured = await Woman.findOne().skip(random);
    }

    res.json({ success: true, data: featured });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/women/:id — Get single woman by ID
router.get('/:id', async (req, res) => {
  try {
    const woman = await Woman.findById(req.params.id);
    if (!woman) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    res.json({ success: true, data: woman });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/women — Add a new inspiring woman
router.post('/', async (req, res) => {
  try {
    const {
      name,
      field,
      photoUrl,
      shortDescription,
      biography,
      achievements,
      quote,
      nationality,
      birthYear,
      tags,
    } = req.body;

    const woman = new Woman({
      name,
      field,
      photoUrl,
      shortDescription,
      biography,
      achievements: Array.isArray(achievements)
        ? achievements
        : achievements?.split('\n').filter(Boolean),
      quote,
      nationality,
      birthYear,
      tags: Array.isArray(tags) ? tags : tags?.split(',').map((t) => t.trim()).filter(Boolean),
    });

    const saved = await woman.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/women/:id/like — Increment like count
router.patch('/:id/like', async (req, res) => {
  try {
    const woman = await Woman.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true, select: 'likes name' }
    );

    if (!woman) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    res.json({ success: true, data: { likes: woman.likes, name: woman.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/women/:id — Update a story
router.put('/:id', async (req, res) => {
  try {
    const woman = await Woman.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!woman) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    res.json({ success: true, data: woman });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/women/:id — Delete a story
router.delete('/:id', async (req, res) => {
  try {
    const woman = await Woman.findByIdAndDelete(req.params.id);
    if (!woman) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    res.json({ success: true, message: 'Story deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
