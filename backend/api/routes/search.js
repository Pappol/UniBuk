import express from "express";
import { queryAll, queryUniversity} from '../controllers/search.js';
 
const router = express.Router();
router.get('/all/:query', queryAll);
router.get('/university/:kind/:university', queryUniversity)
export default router;