import * as events from "./data/events.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

const db = await dbConnection();
await db.dropDatabase();

// 1. Create a event of your choice.
// 2. Log the newly created event. (Just that event, not all events)
try {
  const patrickBBQ = await events.create(
    "Keyur's Big End of Summer BBQ",
    "Come join us for our yearly end of summer bbq!",
    {
      streetAddress: "2 Castle Point Terrace",
      city: "Islein",
      state: "NJ",
      zip: "07030",
    },
    "kpatel@stevens.edu",
    30,
    0,
    "08/19/2024",
    "2:00PM",
    "8:00PM",
    false
  );
  console.log(patrickBBQ);
} catch (e) {
  console.log(e);
}
// 3. Create another event of your choice.
try {
  const patrickBBQ = await events.create(
    "John's Big End of Summer BBQ",
    "Come join us for our yearly end of summer bbq!",
    {
      streetAddress: "2 Castle Point Terrace",
      city: "Long Beach",
      state: "LA",
      zip: "07030",
    },
    "kpatel@stevens.edu",
    30,
    0,
    "08/19/2024",
    "2:00PM",
    "8:00PM",
    false
  );
} catch (e) {
  console.log(e);
}
// 4. Query all events, and log them all
try {
  const allEvents = await events.getAll();
  console.log(allEvents);
} catch (e) {
  console.log(e);
}
// 5. Create the 3rd event of your choice.
// 6. Log the newly created 3rd event. (Just that event, not all events)
try {
  const patrickBBQ = await events.create(
    "Thi is third added Event",
    "go join us for our yearly end of summer Sale!",
    {
      streetAddress: "3 Castle Point Terrace",
      city: "gopal",
      state: "GJ",
      zip: "07039",
    },
    "ddesai@stevens.edu",
    30,
    0,
    "08/19/2024",
    "2:00PM",
    "8:00PM",
    false
  );
  console.log(patrickBBQ);
} catch (e) {
  console.log(e);
}
// 7. Rename the first event
// 8. Log the first event with the updated name.
try {
  const renamedAidensbdayBash = await events.rename(
    "652b2495e47462d0aa84725b",
    "Aiden's 5th Birthday Bash"
  );
  console.log(renamedAidensbdayBash);
} catch (e) {
  console.log(e);
}
// 9. Remove the second event you created.
try {
  const removeAidensBDayBash = await events.remove("652b2495e47462d0aa84725a");
} catch (e) {
  console.log(e);
}
// 10. Query all events, and log them all
try {
  const allEvents = await events.getAll();
  console.log(allEvents);
} catch (e) {
  console.log(e);
}

// 11. Try to create an event with bad input parameters to make sure it throws errors.
try {
  const patrickBBQ = await events.create(
    "Keyur's Big End of Summer BBQ",
    "Come join us ",
    {
      streetAddress: "2 Castle Point Terrace",
      city: "Islein",
      state: "NJ",
      zip: "07030",
    },
    "kpatel@stevens.edu",
    30,
    0,
    "08/19/2024",
    "2:00PM",
    "8:00PM",
    false
  );
} catch (e) {
  console.log(e);
}

// 12. Try to remove an event that does not exist to make sure it throws errors.
try {
  const removeAidensBDayBash = await events.remove(
    "652b2495e47462d0aa84725aa2b"
  );
} catch (e) {
  console.log(e);
}
// 13. Try to rename an event that does not exist to make sure it throws errors.
try {
  const renamedAidensbdayBash = await events.rename(
    "652b2495e47462d0adf4a84725b",
    "Aiden's 5th Birthday Bash"
  );
} catch (e) {
  console.log(e);
}
// 14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
try {
  const patrickBBQ = await events.create(
    "Key",
    "Come join us for our yearly end of summer bbq!",
    {
      streetAddress: "2 Castle Point Terrace",
      city: "Islein",
      state: "NJ",
      zip: "07030",
    },
    "kpatel@stevens.edu",
    30,
    0,
    "08/19/2024",
    "2:00PM",
    "8:00PM",
    false
  );
  console.log(patrickBBQ);
} catch (e) {
  console.log(e);
}

// 15. Try getting an event by ID that does not exist to make sure it throws errors.
try {
  const patricksBBQ = await events.get("652b2495e47462d0aadgde84725b");
} catch (e) {
  console.log(e);
}

await closeConnection();
