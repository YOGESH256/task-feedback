const methods =   {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
        console.log("kkk")
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');
    }
  };
  
  const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(401)
      res.redirect('/dashboard');
      
    }
  }
  
  const ensureAuthenticated = methods.ensureAuthenticated
  const forwardAuthenticated = methods.forwardAuthenticated
  
  export  { forwardAuthenticated , ensureAuthenticated , admin};