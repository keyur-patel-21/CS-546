//Here you will require route files and export them as used in previous labs.
import pelindromeCheckRoutes from './palindromeCheck.js';

const constructorMethod = (app) => {
  app.use('/', pelindromeCheckRoutes);

  app.use('*', (req, res) => {
    res.redirect('/static/homepage');
  });
};

export default constructorMethod;