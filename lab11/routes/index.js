//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

import routesApiRoutes from './routesApi.js';

const constructorMethod = (app) => {
  app.use('/', routesApiRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;