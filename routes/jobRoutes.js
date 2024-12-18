import express from 'express';
import {getAllJobs, filterJobs, getJobById, markAsApplied, scrapAndSaveJobs} from '../controllers/jobController.js'

const router = express.Router();

// Route to fetch all jobs
router.get('/', getAllJobs);

// Route to filter jobs by title and location 
router.get('/filter', filterJobs);

// Route to fetch job by id
router.get('/:id', getJobById);

//  Route to mark a job as applied 
router.patch('/:id/apply', markAsApplied);

// Route to scrape and save jobs
router.post('/scrape', scrapAndSaveJobs);




export default router;