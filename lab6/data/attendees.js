// This data file should export all functions using the ES6 standard as shown in the lecture code
import { events } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  if (!eventId || !firstName || !lastName || !emailAddress) {
    throw "All fields must be provided with valid values";
  }

  if (
    typeof eventId !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof emailAddress !== "string" ||
    !eventId.trim() ||
    !firstName.trim() ||
    !lastName.trim() ||
    !emailAddress.trim()
  ) {
    throw "All fields must be non-empty strings";
  }

  if (!ObjectId.isValid(eventId)) {
    throw "Invalid eventId";
  }

  const event = await events.getEventById(eventId);
  if (!event) {
    throw "Event not found";
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(emailAddress)) {
    throw "Invalid email address format";
  }

  if (event.attendees.length >= event.maxCapacity) {
    throw "Event is already full";
  }

  const existingAttendee = event.attendees.find(
    (attendee) => attendee.emailAddress === emailAddress
  );
  if (existingAttendee) {
    throw "An attendee with this email already exists";
  }

  const newAttendee = {
    _id: new ObjectId(),
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
  };

  event.attendees.push(newAttendee);

  event.totalNumberOfAttendees = event.attendees.length;

  await events.updateEvent(event);

  return newAttendee;
};

const getAllAttendees = async (eventId) => {
  if (!eventId) {
    throw "Event ID is required.";
  }

  if (typeof eventId !== "string" || eventId.trim() === "") {
    throw "Event ID must be a non-empty string.";
  }

  let eventObjectId;
  try {
    eventObjectId = new ObjectId(eventId);
  } catch (err) {
    throw "Invalid Event ID. It should be a valid ObjectId.";
  }

  const event = await events.findOne({ _id: eventObjectId });

  if (!event) {
    throw "Event not found with the provided Event ID.";
  }

  if (!Array.isArray(event.attendees)) {
    return [];
  }

  return event.attendees;
};

const getAttendee = async (attendeeId) => {
  if (!attendeeId) {
    throw "attendeeId is required";
  }

  attendeeId = attendeeId.trim();

  if (!ObjectId.isValid(attendeeId)) {
    throw "Invalid ObjectId format for attendeeId";
  }

  const attendee = await events.findOne({ _id: ObjectId(attendeeId) });

  if (!attendee) {
    throw "Attendee not found";
  }

  return attendee;
};

const removeAttendee = async (attendeeId) => {
  if (!attendeeId) {
    throw "attendeeId is required";
  }

  attendeeId = attendeeId.trim();

  if (!ObjectId.isValid(attendeeId)) {
    throw "Invalid ObjectId format for attendeeId";
  }

  const event = await events.findOne({ "attendees._id": ObjectId(attendeeId) });

  if (!event) {
    throw "Event not found for the specified attendeeId";
  }

  const attendeeIndex = event.attendees.findIndex((attendee) =>
    attendee._id.equals(ObjectId(attendeeId))
  );

  event.attendees.splice(attendeeIndex, 1);

  event.totalNumberOfAttendees = event.attendees.length;

  await events.updateOne({ _id: event._id }, { $set: event });

  return event;
};

export { createAttendee, getAllAttendees, getAttendee, removeAttendee };
