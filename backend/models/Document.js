import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled' },
  content: { type: mongoose.Schema.Types.Mixed, default: [] }, // Array of blocks
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null, index: true },
  isArchived: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);
