import { Router } from "express";
import { queryAll } from '../controllers/search.js';
 
const router = Router();
router.get('/:query', queryAll);

export default router;