// TODO: Export and implement the following functions in ES6 format
import { events } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  isValidEmail,
  isValidDate,
  isValidTime,
  isValidState,
  isValidZip,
} from "../helpers.js";

const create = async (
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
) => {
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
};

const getAll = async () => {
  const eventCollection = await events();
  let eventList = await eventCollection.find({}).toArray();
  if (!eventList) throw "Could not get all Events";
  eventList = eventList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return eventList;
};

const get = async (id) => {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "invalid object ID";
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: new ObjectId(id) });
  if (event === null) throw "No event with that id";
  event._id = event._id.toString();
  return event;
};

const remove = async (id) => {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "invalid object ID";
  const eventCollection = await events();
  const deletionInfo = await eventCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (!deletionInfo) {
    throw `Could not delete event with id of ${id}`;
  }

  return {
    eventName: deletionInfo.eventName,
    deleted: true,
  };
};

const rename = async (id, newEventName) => {
  if (!id) throw "You must provide an id to search for";
  id = id.trim();
  if (id.length === 0) throw "Id cannot be an empty string or just spaces";
  if (!ObjectId.isValid(id)) throw "Invalid object ID";

  if (!newEventName) throw "You must provide a name for your event";
  newEventName = newEventName.trim();
  if (newEventName.length === 0)
    throw "Name cannot be an empty string or string with just spaces";
  if (newEventName.length < 5) throw "Name must be at least 5 characters long";

  const updatedEvent = {
    eventName: newEventName,
  };

  const eventCollection = await events();

  const updatedInfo = await eventCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedEvent },
    { returnDocument: "after" }
  );

  if (!updatedInfo) {
    throw "Could not update event successfully";
  }

  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};

export { create, getAll, get, remove, rename };
