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
  .route("/events")
  .get(async (req, res) => {
    try {
      const eventList = await eventData.getAll();
      res.json(eventList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const eventData = req.body;

    // Ensure the request body is not empty
    if (!eventData || Object.keys(eventData).length === 0) {
      return res
        .status(400)
        .json({ error: "All fields need to have valid values" });
    }

    try {
      // Validate eventName
      if (
        !eventData.eventName ||
        typeof eventData.eventName !== "string" ||
        eventData.eventName.trim().length < 5
      ) {
        throw "Invalid or missing eventName";
      }

      // Validate description
      if (
        !eventData.description ||
        typeof eventData.description !== "string" ||
        eventData.description.trim().length < 25
      ) {
        throw "Invalid or missing description";
      }

      // Validate contactEmail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !eventData.contactEmail ||
        typeof eventData.contactEmail !== "string" ||
        !emailRegex.test(eventData.contactEmail.trim())
      ) {
        throw "Invalid or missing contactEmail";
      }

      // Validate eventDate
      if (
        !eventData.eventDate ||
        typeof eventData.eventDate !== "string" ||
        !isValidDate(eventData.eventDate)
      ) {
        throw "Invalid or missing eventDate";
      }

      // Convert eventDate to a Date object for comparison
      const eventDate = new Date(eventData.eventDate);

      // Check if eventDate is in the future
      if (eventDate <= new Date()) {
        throw "Event date must be in the future";
      }

      // Validate startTime
      const startTimeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;
      if (
        !eventData.startTime ||
        typeof eventData.startTime !== "string" ||
        !startTimeRegex.test(eventData.startTime)
      ) {
        throw "Invalid or missing startTime";
      }

      // Validate endTime
      const endTimeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;
      if (
        !eventData.endTime ||
        typeof eventData.endTime !== "string" ||
        !endTimeRegex.test(eventData.endTime)
      ) {
        throw "Invalid or missing endTime";
      }

      // Convert startTime and endTime to Date objects for comparison
      const startTime = new Date(`2000-01-01 ${eventData.startTime}`);
      const endTime = new Date(`2000-01-01 ${eventData.endTime}`);

      // Check if startTime is earlier than endTime
      if (startTime >= endTime) {
        throw "Start time must be earlier than end time";
      }

      // Check if endTime is at least 30 minutes later than startTime
      if (endTime - startTime < 30 * 60 * 1000) {
        throw "End time should be at least 30 minutes later than start time";
      }

      // Validate publicEvent
      if (typeof eventData.publicEvent !== "boolean") {
        throw "Invalid or missing publicEvent";
      }

      // Validate maxCapacity
      if (
        eventData.maxCapacity === undefined ||
        typeof eventData.maxCapacity !== "number" ||
        eventData.maxCapacity <= 0
      ) {
        throw "Invalid or missing maxCapacity";
      }

      // Validate priceOfAdmission
      if (
        eventData.priceOfAdmission === undefined ||
        (typeof eventData.priceOfAdmission !== "number" &&
          typeof eventData.priceOfAdmission !== "string") ||
        parseFloat(eventData.priceOfAdmission) < 0
      ) {
        throw "Invalid or missing priceOfAdmission";
      }

      // Convert maxCapacity to an integer
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

      // Create the event object
      const newEvent = {
        eventName: eventData.eventName,
        description: eventData.description,
        eventLocation: {
          streetAddress: eventData.eventLocation.streetAddress,
          city: eventData.eventLocation.city,
          state: eventData.eventLocation.state,
          zip: eventData.eventLocation.zip,
        },
        contactEmail: eventData.contactEmail.trim(),
        maxCapacity: eventData.maxCapacity,
        priceOfAdmission: parseFloat(eventData.priceOfAdmission),
        eventDate: eventData.eventDate,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        publicEvent: eventData.publicEvent,
        attendees: [],
        totalNumberOfAttendees: 0,
      };

      // Return the newly created event with a 200 status code
      res.status(200).json(newEvent);
    } catch (error) {
      // Handle validation errors with a 400 status code
      res.status(400).json({ error });
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
  })
  .put(async (req, res) => {
    //code here for PUT
  });
