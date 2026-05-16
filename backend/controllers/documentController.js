import Document from '../models/Document.js';

export const getDocuments = async (req, res) => {
  try {
    // Fetch root documents for the authenticated user (parentId is null)
    const documents = await Document.find({ userId: req.user.id, parentId: null, isArchived: false }).sort({ updatedAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChildren = async (req, res) => {
  try {
    const documents = await Document.find({ parentId: req.params.id, userId: req.user.id, isArchived: false }).sort({ updatedAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const { title, parentId } = req.body;
    const document = await Document.create({
      title: title || 'Untitled',
      userId: req.user.id,
      parentId: parentId || null
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { title, content, isArchived, isPublished } = req.body;
    const document = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (title !== undefined) document.title = title;
    if (content !== undefined) document.content = content;
    if (isArchived !== undefined) document.isArchived = isArchived;
    if (isPublished !== undefined) document.isPublished = isPublished;

    const updatedDocument = await document.save();
    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    // Mark as archived instead of permanent deletion for safety, or implement actual recursive deletion
    document.isArchived = true;
    await document.save();
    res.json({ message: 'Document archived' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchDocuments = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const documents = await Document.find({
      userId: req.user.id,
      isArchived: false,
      title: { $regex: q, $options: 'i' }
    }).limit(10);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArchivedDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id, isArchived: true }).sort({ updatedAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const restoreDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!document) return res.status(404).json({ message: 'Document not found' });
    document.isArchived = false;
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
