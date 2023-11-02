// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
const router = Router();
import { eventData } from "../data/index.js";
import {
  isValidEmail,
  isValidDate,
  isValidTime,
  isValidState,
  isValidZip,
  checkId,
} from "../helpers.js";
// import validation from '../validation.js';

router
  .route("/")
  .get(async (req, res) => {
    try {
      const eventList = await eventData.getAll();
      res.json(eventList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    const eventData = req.body;
    //make sure there is something present in the req.body
    if (!eventData || Object.keys(eventData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    try {
      if (
        !eventData.eventName ||
        typeof eventData.eventName !== "string" ||
        eventData.eventName.trim().length < 5
      ) {
        throw "Invalid or missing eventName";
      }
      eventData.eventName = eventData.eventName.trim();

      if (
        !eventData.eventDescription ||
        typeof eventData.eventDescription !== "string" ||
        eventData.eventDescription.trim().length < 25
      ) {
        throw "Invalid or missing eventDescription";
      }
      eventData.eventDescription = eventData.eventDescription.trim();

      if (
        !eventData.contactEmail ||
        typeof eventData.contactEmail !== "string" ||
        !isValidEmail(eventData.contactEmail.trim())
      ) {
        throw "Invalid or missing contactEmail";
      }
      eventData.contactEmail = eventData.contactEmail.trim();

      if (
        !eventData.eventDate ||
        typeof eventData.eventDate !== "string" ||
        !isValidDate(eventData.eventDate)
      ) {
        throw "Invalid or missing eventDate";
      }
      eventData.eventDate = eventData.eventDate.trim();

      const eventDate = new Date(eventData.eventDate);

      if (eventDate <= new Date()) {
        throw "Event date must be in the future";
      }

      if (
        !eventData.startTime ||
        typeof eventData.startTime !== "string" ||
        !isValidTime(eventData.startTime)
      ) {
        throw "Invalid or missing startTime";
      }
      eventData.startTime = eventData.startTime.trim();

      if (
        !eventData.endTime ||
        typeof eventData.endTime !== "string" ||
        !isValidTime(eventData.endTime)
      ) {
        throw "Invalid or missing endTime";
      }
      eventData.endTime = eventData.endTime.trim();

      const startTime = new Date(`2000-01-01 ${eventData.startTime}`);
      const endTime = new Date(`2000-01-01 ${eventData.endTime}`);

      if (startTime >= endTime) {
        throw "Start time must be earlier than end time";
      }

      if (endTime - startTime < 30 * 60 * 1000) {
        throw "End time should be at least 30 minutes later than start time";
      }

      if (typeof eventData.publicEvent !== "boolean") {
        throw "Invalid or missing publicEvent";
      }

      if (
        eventData.maxCapacity === undefined ||
        typeof eventData.maxCapacity !== "number" ||
        eventData.maxCapacity <= 0
      ) {
        throw "Invalid or missing maxCapacity";
      }

      if (
        eventData.priceOfAdmission === undefined ||
        (typeof eventData.priceOfAdmission !== "number" &&
          typeof eventData.priceOfAdmission !== "string") ||
        parseFloat(eventData.priceOfAdmission) < 0
      ) {
        throw "Invalid or missing priceOfAdmission";
      }

      eventData.maxCapacity = parseInt(eventData.maxCapacity);

      if (typeof eventData.eventLocation !== "object") {
        throw "Invalid eventLocation";
      }

      if (
        typeof eventData.eventLocation.streetAddress !== "string" ||
        eventData.eventLocation.streetAddress.trim().length < 3 ||
        typeof eventData.eventLocation.city !== "string" ||
        eventData.eventLocation.city.trim().length < 3 ||
        typeof eventData.eventLocation.state !== "string" ||
        !isValidState(eventData.eventLocation.state) ||
        typeof eventData.eventLocation.zip !== "string" ||
        !isValidZip(eventData.eventLocation.zip)
      ) {
        throw "Invalid eventLocation properties";
      }
      eventData.eventLocation.streetAddress = eventData.eventLocation.streetAddress.trim();
      eventData.eventLocation.city = eventData.eventLocation.city.trim();
      eventData.eventLocation.state = eventData.eventLocation.state.trim();

    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const {
        eventName,
        eventDescription,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent,
      } = eventData;
      const newEvent = await eventData.create(
        eventName,
        eventDescription,
        eventLocation,
        contactEmail,
        maxCapacity,
        priceOfAdmission,
        eventDate,
        startTime,
        endTime,
        publicEvent
      );
      res.json(newEvent);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router
  .route("/:eventId")
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.id = checkId(req.params.id, "Id URL Param");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //try getting the event by ID
    try {
      const event = await eventData.get(req.params.id);
      res.json(event);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.id = checkId(req.params.id, "Id URL Param");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //try to delete Event
    try {
      let deletedEvent = await eventData.remove(req.params.id);
      res.json(deletedEvent);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
  });

export default router;
