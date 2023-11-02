// This data file should export all functions using the ES6 standard as shown in the lecture code
import { events } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  isValidEmail,
  isValidDate,
  isValidTime,
  isValidState,
  isValidZip,
} from "../helpers.js";

const exportedMethods = {
  async create(
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
  ) {
    if (typeof eventName !== "string" || eventName.trim().length < 5) {
      throw "Invalid eventName";
    }

    if (
      typeof eventDescription !== "string" ||
      eventDescription.trim().length < 25
    ) {
      throw "Invalid eventDescription";
    }

    if (!isValidEmail(contactEmail)) {
      throw "Invalid contactEmail";
    }

    if (!isValidDate(eventDate)) {
      throw "Invalid eventDate";
    }

    if (!isValidTime(startTime)) {
      throw "Invalid startTime";
    }

    if (!isValidTime(endTime)) {
      throw "Invalid endTime";
    }

    const eventDateObj = new Date(eventDate);
    const startTimeObj = new Date(`01/01/2000 ${startTime}`);
    const endTimeObj = new Date(`01/01/2000 ${endTime}`);

    if (eventDateObj <= new Date()) {
      throw "EventDate must be in the future";
    }

    if (startTimeObj >= endTimeObj) {
      throw "Invalid time range";
    }

    const timeDifference = endTimeObj - startTimeObj;
    if (timeDifference < 30 * 60 * 1000) {
      throw "endTime should be at least 30 minutes later than startTime";
    }

    if (typeof publicEvent !== "boolean") {
      throw "Invalid publicEvent";
    }

    if (
      typeof maxCapacity !== "number" ||
      typeof priceOfAdmission !== "number" ||
      maxCapacity <= 0 ||
      priceOfAdmission < 0
    ) {
      throw "Invalid maxCapacity or priceOfAdmission";
    }

    if (typeof eventLocation !== "object") {
      throw "Invalid eventLocation";
    }

    if (
      typeof eventLocation.streetAddress !== "string" ||
      eventLocation.streetAddress.trim().length < 3 ||
      typeof eventLocation.city !== "string" ||
      eventLocation.city.trim().length < 3 ||
      typeof eventLocation.state !== "string" ||
      !isValidState(eventLocation.state) ||
      typeof eventLocation.zip !== "string" ||
      !isValidZip(eventLocation.zip)
    ) {
      throw "Invalid eventLocation properties";
    }

    const newEvent = {
      eventName: eventName,
      description: eventDescription,
      eventLocation: {
        streetAddress: eventLocation.streetAddress,
        city: eventLocation.city,
        state: eventLocation.state,
        zip: eventLocation.zip,
      },
      contactEmail: contactEmail,
      maxCapacity: maxCapacity,
      priceOfAdmission: priceOfAdmission,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      publicEvent: publicEvent,
      attendees: [],
      totalNumberOfAttendees: 0,
    };

    const eventCollection = await events();

    const insertInfo = await eventCollection.insertOne(newEvent);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add Event";
    const newId = insertInfo.insertedId.toString();

    const event = await this.get(newId);
    return event;
  },

  async getAll() {
    const eventCollection = await events();
    let eventList = await eventCollection.find({}).toArray();
    if (!eventList) throw "Could not get all Events";
    eventList = eventList.map((element) => ({
      _id: element._id.toString(),
      eventName: element.eventName,
    }));
    return eventList;
  },

  async get(eventId) {
    if (!eventId) throw "You must provide an id to search for";
    if (typeof eventId !== "string") throw "Id must be a string";
    if (eventId.trim().length === 0)
      throw "Id cannot be an empty string or just spaces";
    eventId = eventId.trim();
    if (!ObjectId.isValid(eventId)) throw "invalid object ID";
    const eventCollection = await events();
    const event = await eventCollection.findOne({ _id: new ObjectId(eventId) });
    if (event === null) throw "No event with that id";
    event._id = event._id.toString();
    return event;
  },

  async remove(eventId) {
    if (!eventId) throw "You must provide an id to search for";
    if (typeof eventId !== "string") throw "Id must be a string";
    if (eventId.trim().length === 0)
      throw "id cannot be an empty string or just spaces";
    eventId = eventId.trim();
    if (!ObjectId.isValid(eventId)) throw "invalid object ID";
    const eventCollection = await events();
    const deletionInfo = await eventCollection.findOneAndDelete({
      _id: new ObjectId(eventId),
    });

    if (!deletionInfo) {
      throw `Could not delete event with id of ${eventId}`;
    }

    return {
      eventName: deletionInfo.eventName,
      deleted: true,
    };
  },

  async update(
    eventId,
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
  ) {
    if (typeof eventName !== "string" || eventName.trim().length < 5) {
      throw "Invalid eventName";
    }

    if (
      typeof eventDescription !== "string" ||
      eventDescription.trim().length < 25
    ) {
      throw "Invalid eventDescription";
    }

    if (!isValidEmail(contactEmail)) {
      throw "Invalid contactEmail";
    }

    if (!isValidDate(eventDate)) {
      throw "Invalid eventDate";
    }

    if (!isValidTime(startTime)) {
      throw "Invalid startTime";
    }

    if (!isValidTime(endTime)) {
      throw "Invalid endTime";
    }

    const eventDateObj = new Date(eventDate);
    const startTimeObj = new Date(`01/01/2000 ${startTime}`);
    const endTimeObj = new Date(`01/01/2000 ${endTime}`);

    if (eventDateObj <= new Date()) {
      throw "EventDate must be in the future";
    }

    if (startTimeObj >= endTimeObj) {
      throw "Invalid time range";
    }

    const timeDifference = endTimeObj - startTimeObj;
    if (timeDifference < 30 * 60 * 1000) {
      throw "endTime should be at least 30 minutes later than startTime";
    }

    if (typeof publicEvent !== "boolean") {
      throw "Invalid publicEvent";
    }

    if (
      typeof maxCapacity !== "number" ||
      typeof priceOfAdmission !== "number" ||
      maxCapacity <= 0 ||
      priceOfAdmission < 0
    ) {
      throw "Invalid maxCapacity or priceOfAdmission";
    }

    if (typeof eventLocation !== "object") {
      throw "Invalid eventLocation";
    }

    if (
      typeof eventLocation.streetAddress !== "string" ||
      eventLocation.streetAddress.trim().length < 3 ||
      typeof eventLocation.city !== "string" ||
      eventLocation.city.trim().length < 3 ||
      typeof eventLocation.state !== "string" ||
      !isValidState(eventLocation.state) ||
      typeof eventLocation.zip !== "string" ||
      !isValidZip(eventLocation.zip)
    ) {
      throw "Invalid eventLocation properties";
    }

    const newEvent = {
      eventName: eventName,
      description: eventDescription,
      eventLocation: {
        streetAddress: eventLocation.streetAddress,
        city: eventLocation.city,
        state: eventLocation.state,
        zip: eventLocation.zip,
      },
      contactEmail: contactEmail,
      maxCapacity: maxCapacity,
      priceOfAdmission: priceOfAdmission,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      publicEvent: publicEvent,
    };

    const eventCollection = await events();

    const insertInfo = await eventCollection.insertOne(newEvent);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add Event";
    const newId = insertInfo.insertedId.toString();

    const event = await get(newId);
    return event;
  },
};

export default exportedMethods;
