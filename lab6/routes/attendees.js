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
      const attendee = await attendeeData.getAllAttendees(req.params.eventId);
      res.json(attendee);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const newattendeeData = req.body;
    //make sure there is something present in the req.body
    if (!newattendeeData || Object.keys(newattendeeData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    try {
      req.params.eventId = checkId(req.params.eventId, "ID url param");

      if (
        !newattendeeData.firstName ||
        typeof newattendeeData.firstName !== "string"
      ) {
        throw "Invalid or missing firstName";
      }
      newattendeeData.firstName = newattendeeData.firstName.trim();

      if (
        !newattendeeData.lastName ||
        typeof newattendeeData.lastName !== "string"
      ) {
        throw "Invalid or missing lastName";
      }
      newattendeeData.lastName = newattendeeData.lastName.trim();

      if (!isValidEmail(newattendeeData.emailAddress)) {
        throw "Invalid or missing emailAddress";
      }
      newattendeeData.emailAddress = newattendeeData.emailAddress.trim();
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e.message });
    }

    try {
      let eventId = req.params.eventId;
      const { firstName, lastName, emailAddress } = newattendeeData;
      const newAttendee = await attendeeData.createAttendee(
        eventId,
        firstName,
        lastName,
        emailAddress
      );
      res.json(newAttendee);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  });

router
  .route("/attendee/:attendeeId")
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.eventId = checkId(req.params.attendeeId, "Id URL Param");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const attendee = await attendeeData.getAttendee(req.params.attendeeId);
      res.json(attendee);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });

export default router;
