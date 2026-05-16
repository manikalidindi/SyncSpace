import express from 'express';
import { getDocuments, getDocumentById, getChildren, createDocument, updateDocument, deleteDocument, searchDocuments, getArchivedDocuments, restoreDocument } from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All document routes are protected

router.route('/').get(getDocuments).post(createDocument);
router.get('/search', searchDocuments);
router.get('/trash', getArchivedDocuments);
router.put('/:id/restore', restoreDocument);
router.route('/:id').get(getDocumentById).put(updateDocument).delete(deleteDocument);
router.get('/:id/children', getChildren);

export default router;
