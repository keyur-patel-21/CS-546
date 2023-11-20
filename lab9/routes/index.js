//Here you will require route files and export them as used in previous labs.
import pelindromeCheckRoutes from './palindromeCheck.js';

const constructorMethod = (app) => {
  app.use('/', pelindromeCheckRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;