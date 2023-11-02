// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
const router = Router();
import { eventData } from "../data/index.js";
import { attendeeData } from "../data/index.js";
import {
  isValidEmail,
  isValidDate,
  isValidTime,
  isValidState,
  isValidZip,
  checkId,
} from "../helpers.js";
router
  .route("/:eventId")
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.eventId = checkId(req.params.eventId, "Id URL Param");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const event = await eventData.get(req.params.eventId);
      res.json(event.attendees);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route("/attendee/:attendeeId")
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });

export default router;
