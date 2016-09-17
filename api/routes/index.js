
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' })
// };

module.exports = function(app,passport) {

  var reportController = require('../controllers/reports') (app);
  var userController = require('../controllers/users') (app);

  //Creating reports
 app.post('/api/reports'
  , passport.authenticate('jwt', { session: false})
  , reportController.create);
 //List all products
 app.get('/api/reports'
  , passport.authenticate('jwt', { session: false})
  , reportController.getReports);
 //List single product
 app.get('/api/reports/:id'
  , passport.authenticate('jwt', { session: false})
  , reportController.getReport);
 //update the product
 app.put('/api/reports/:id'
  , passport.authenticate('jwt', { session: false})
  , reportController.updateReport);
 //Delete the product
 app.delete('/api/reports/:id'
  , passport.authenticate('jwt', { session: false})
  , reportController.deleteReport);

 //Register User
 app.post('/register', userController.register);

 //Authenticate User
 app.post('/authenticate', userController.authenticate);

}