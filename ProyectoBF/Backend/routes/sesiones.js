//Usarla cuando queremos validad si la sesi´pn está iniciada
function auth(req, res, next) {
    if (req.session.ingresado)
      return next();
    else
      return res.sendStatus(401);
  };

  module.exports = auth;