import express from "express";
import {
    uploadDocument,
    getDocuments,
    getDocument,
    deleteDocument,
    updateDocument,
} from "../controllers/documentController.js";

const router = express.Router();

//All routes are protected
router.use(protect);

router.post("/upload",upload.single("file"),uploadDocument);//upload.single->This is Multer middleware.
router.get("/",getDocuments);
router.get("/:id",getDocument);
router.delete("/:id",deleteDocument);
router.put("/:id",updateDocument);

export default router;