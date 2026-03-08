const mongoose = require('mongoose');

const WomanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    field: {
      type: String,
      required: [true, 'Field is required'],
      enum: [
        'Science',
        'Technology',
        'Sports',
        'Leadership',
        'Arts',
        'Literature',
        'Activism',
        'Business',
        'Medicine',
        'Education',
        'Other',
      ],
    },
    photoUrl: {
      type: String,
      required: [true, 'Photo URL is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    biography: {
      type: String,
      required: [true, 'Biography is required'],
    },
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    quote: {
      type: String,
      maxlength: [500, 'Quote cannot exceed 500 characters'],
    },
    gallery: [
      {
        url: { type: String },
        caption: { type: String },
      },
    ],
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    nationality: {
      type: String,
      trim: true,
    },
    birthYear: {
      type: Number,
    },
    deathYear: {
      type: Number,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  }
);

// Text index for search functionality
WomanSchema.index({ name: 'text', shortDescription: 'text', biography: 'text' });

// Index for field filtering
WomanSchema.index({ field: 1 });

// Index for featured
WomanSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Woman', WomanSchema);
