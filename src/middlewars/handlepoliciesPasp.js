
const passport = require ("passport");
const UsersController = require ("../controllers/user.controllers");

const uControl = new UsersController();

// ? AUTH JWT BEARER - PASSPORT

 const handleAuth = (policies) => {
  // Policies => ['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']
  return async (req, res, next) => {
    try {
      passport.authenticate('jwt', {session: false}, async function (err, user, info) {
        if (err) next(err)
        if (user) {
          req.user = await uControl.getDataUserById(user.id)
        }
        if(policies[0] === 'PUBLIC') return next();

        if (!user) return res.sendUserUnAuthorized('Invalid token')

        if(user.role.toUpperCase() === 'ADMIN') return next();
        if(!policies.includes(user.role.toUpperCase())) return res.sendUserForbidden('User not authorized')
        next();
      })(req, res, next);      
    } catch (error) {
      next(error)
    }
  };
};
module.exports = {handleAuth , uControl}
