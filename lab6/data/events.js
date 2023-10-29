// This data file should export all functions using the ES6 standard as shown in the lecture code

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
    startTime: startTime.match(/^(?:[1-9]|1[0-2]):[0-5][0-9] [AP]M$/)[0],
    endTime: endTime.match(/^(?:[1-9]|1[0-2]):[0-5][0-9] [AP]M$/)[0], 
    publicEvent: publicEvent,
    attendees: [],
    totalNumberOfAttendees: 0,
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
  //Implement Code here
};

const get = async (eventId) => {
  //Implement Code here
};

const remove = async (eventId) => {
  //Implement Code here
};

const update = async (
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
) => {
  //Implement Code here
};
