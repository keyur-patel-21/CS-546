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
    const neweventData = req.body;
    //make sure there is something present in the req.body
    if (!neweventData || Object.keys(neweventData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    try {
      if (
        !neweventData.eventName ||
        typeof neweventData.eventName !== "string" ||
        neweventData.eventName.trim().length < 5
      ) {
        throw "Invalid or missing eventName";
      }
      neweventData.eventName = neweventData.eventName.trim();

      if (
        !neweventData.eventDescription ||
        typeof neweventData.eventDescription !== "string" ||
        neweventData.eventDescription.trim().length < 25
      ) {
        throw "Invalid or missing eventDescription";
      }
      neweventData.eventDescription = neweventData.eventDescription.trim();

      if (
        !neweventData.contactEmail ||
        typeof neweventData.contactEmail !== "string" ||
        !isValidEmail(neweventData.contactEmail.trim())
      ) {
        throw "Invalid or missing contactEmail";
      }
      neweventData.contactEmail = neweventData.contactEmail.trim();

      if (
        !neweventData.eventDate ||
        typeof neweventData.eventDate !== "string" ||
        !isValidDate(neweventData.eventDate)
      ) {
        throw "Invalid or missing eventDate";
      }
      neweventData.eventDate = neweventData.eventDate.trim();

      const eventDate = new Date(neweventData.eventDate);

      if (eventDate <= new Date()) {
        throw "Event date must be in the future";
      }

      if (
        !neweventData.startTime ||
        typeof neweventData.startTime !== "string" ||
        !isValidTime(neweventData.startTime)
      ) {
        throw "Invalid or missing startTime";
      }
      neweventData.startTime = neweventData.startTime.trim();

      if (
        !neweventData.endTime ||
        typeof neweventData.endTime !== "string" ||
        !isValidTime(neweventData.endTime)
      ) {
        throw "Invalid or missing endTime";
      }
      neweventData.endTime = neweventData.endTime.trim();

      const startTime = new Date(`2000-01-01 ${neweventData.startTime}`);
      const endTime = new Date(`2000-01-01 ${neweventData.endTime}`);

      if (startTime >= endTime) {
        throw "Start time must be earlier than end time";
      }

      if (endTime - startTime < 30 * 60 * 1000) {
        throw "End time should be at least 30 minutes later than start time";
      }

      if (typeof neweventData.publicEvent !== "boolean") {
        throw "Invalid or missing publicEvent";
      }

      if (
        neweventData.maxCapacity === undefined ||
        typeof neweventData.maxCapacity !== "number" ||
        neweventData.maxCapacity <= 0
      ) {
        throw "Invalid or missing maxCapacity";
      }

      if (
        neweventData.priceOfAdmission === undefined ||
        typeof neweventData.priceOfAdmission !== "number" ||
        parseFloat(neweventData.priceOfAdmission) < 0
      ) {
        throw "Invalid or missing priceOfAdmission";
      }

      neweventData.maxCapacity = parseInt(neweventData.maxCapacity);

      if (typeof neweventData.eventLocation !== "object") {
        throw "Invalid eventLocation";
      }

      if (
        typeof neweventData.eventLocation.streetAddress !== "string" ||
        neweventData.eventLocation.streetAddress.trim().length < 3 ||
        typeof neweventData.eventLocation.city !== "string" ||
        neweventData.eventLocation.city.trim().length < 3 ||
        typeof neweventData.eventLocation.state !== "string" ||
        !isValidState(neweventData.eventLocation.state) ||
        typeof neweventData.eventLocation.zip !== "string" ||
        !isValidZip(neweventData.eventLocation.zip)
      ) {
        throw "Invalid eventLocation properties";
      }
      neweventData.eventLocation.streetAddress =
        neweventData.eventLocation.streetAddress.trim();
      neweventData.eventLocation.city = neweventData.eventLocation.city.trim();
      neweventData.eventLocation.state =
        neweventData.eventLocation.state.trim();
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
      } = neweventData;
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
      req.params.eventId = checkId(req.params.eventId, "Id URL Param");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //try getting the event by ID
    try {
      const event = await eventData.get(req.params.eventId);
      res.json(event);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.eventId = checkId(req.params.eventId, "Id URL Param");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //try to delete Event
    try {
      let deletedEvent = await eventData.remove(req.params.eventId);
      res.json(deletedEvent);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const updatedeventData = req.body;
    //make sure there is something present in the req.body
    if (!updatedeventData || Object.keys(updatedeventData).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    try {
      req.params.eventId = checkId(req.params.eventId, 'ID url param');
      if (
        !updatedeventData.eventName ||
        typeof updatedeventData.eventName !== "string" ||
        updatedeventData.eventName.trim().length < 5
      ) {
        throw "Invalid or missing eventName";
      }
      updatedeventData.eventName = updatedeventData.eventName.trim();

      if (
        !updatedeventData.eventDescription ||
        typeof updatedeventData.eventDescription !== "string" ||
        updatedeventData.eventDescription.trim().length < 25
      ) {
        throw "Invalid or missing eventDescription";
      }
      updatedeventData.eventDescription = updatedeventData.eventDescription.trim();

      if (
        !updatedeventData.contactEmail ||
        typeof updatedeventData.contactEmail !== "string" ||
        !isValidEmail(updatedeventData.contactEmail.trim())
      ) {
        throw "Invalid or missing contactEmail";
      }
      updatedeventData.contactEmail = updatedeventData.contactEmail.trim();

      if (
        !updatedeventData.eventDate ||
        typeof updatedeventData.eventDate !== "string" ||
        !isValidDate(updatedeventData.eventDate)
      ) {
        throw "Invalid or missing eventDate";
      }
      updatedeventData.eventDate = updatedeventData.eventDate.trim();

      const eventDate = new Date(updatedeventData.eventDate);

      if (eventDate <= new Date()) {
        throw "Event date must be in the future";
      }

      if (
        !updatedeventData.startTime ||
        typeof updatedeventData.startTime !== "string" ||
        !isValidTime(updatedeventData.startTime)
      ) {
        throw "Invalid or missing startTime";
      }
      updatedeventData.startTime = updatedeventData.startTime.trim();

      if (
        !updatedeventData.endTime ||
        typeof updatedeventData.endTime !== "string" ||
        !isValidTime(updatedeventData.endTime)
      ) {
        throw "Invalid or missing endTime";
      }
      updatedeventData.endTime = updatedeventData.endTime.trim();

      const startTime = new Date(`2000-01-01 ${updatedeventData.startTime}`);
      const endTime = new Date(`2000-01-01 ${updatedeventData.endTime}`);

      if (startTime >= endTime) {
        throw "Start time must be earlier than end time";
      }

      if (endTime - startTime < 30 * 60 * 1000) {
        throw "End time should be at least 30 minutes later than start time";
      }

      if (typeof updatedeventData.publicEvent !== "boolean") {
        throw "Invalid or missing publicEvent";
      }

      if (
        updatedeventData.maxCapacity === undefined ||
        typeof updatedeventData.maxCapacity !== "number" ||
        updatedeventData.maxCapacity <= 0
      ) {
        throw "Invalid or missing maxCapacity";
      }

      if (
        updatedeventData.priceOfAdmission === undefined ||
        (typeof updatedeventData.priceOfAdmission !== "number" &&
          typeof updatedeventData.priceOfAdmission !== "string") ||
        parseFloat(updatedeventData.priceOfAdmission) < 0
      ) {
        throw "Invalid or missing priceOfAdmission";
      }

      updatedeventData.maxCapacity = parseInt(updatedeventData.maxCapacity);

      if (typeof updatedeventData.eventLocation !== "object") {
        throw "Invalid eventLocation";
      }

      if (
        typeof updatedeventData.eventLocation.streetAddress !== "string" ||
        updatedeventData.eventLocation.streetAddress.trim().length < 3 ||
        typeof updatedeventData.eventLocation.city !== "string" ||
        updatedeventData.eventLocation.city.trim().length < 3 ||
        typeof updatedeventData.eventLocation.state !== "string" ||
        !isValidState(updatedeventData.eventLocation.state) ||
        typeof updatedeventData.eventLocation.zip !== "string" ||
        !isValidZip(updatedeventData.eventLocation.zip)
      ) {
        throw "Invalid eventLocation properties";
      }
      updatedeventData.eventLocation.streetAddress =
      updatedeventData.eventLocation.streetAddress.trim();
      updatedeventData.eventLocation.city = updatedeventData.eventLocation.city.trim();
      updatedeventData.eventLocation.state =
      updatedeventData.eventLocation.state.trim();
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      const updatedEvent = await eventData.update(
        req.params.eventId,
        updatedeventData
      );
      res.json(updatedEvent);
    } catch (e) {
      res.status(404).json({error: e.message});
    }

  });

export default router;
