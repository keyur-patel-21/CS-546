// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {eventData} from '../data/index.js';
// import validation from '../validation.js';

router
  .route('/events')
  .get(async (req, res) => {
    try {
      const eventList = await eventData.getAll();
      res.json(eventList);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/:eventId')
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });
