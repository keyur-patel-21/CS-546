// This data file should export all functions using the ES6 standard as shown in the lecture code
import {events} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  if (!eventId || !firstName || !lastName || !emailAddress) {
    throw 'All fields must be provided with valid values';
  }

  if (
    typeof eventId !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof emailAddress !== 'string' ||
    !eventId.trim() ||
    !firstName.trim() ||
    !lastName.trim() ||
    !emailAddress.trim()
  ) {
    throw 'All fields must be non-empty strings';
  }

  if (!ObjectId.isValid(eventId)) {
    throw 'Invalid eventId';
  }

  const event = await events.getEventById(eventId);
  if (!event) {
    throw 'Event not found';
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(emailAddress)) {
    throw 'Invalid email address format';
  }

  if (event.attendees.length >= event.maxCapacity) {
    throw 'Event is already full';
  }

  const existingAttendee = event.attendees.find(
    (attendee) => attendee.emailAddress === emailAddress
  );
  if (existingAttendee) {
    throw 'An attendee with this email already exists';
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
  //Implement Code here
};

const getAttendee = async (attendeeId) => {
  //Implement Code here
};

const removeAttendee = async (attendeeId) => {
  //Implement Code here
};
