import { verify } from "jsonwebtoken";

//esta funcion autentica el usuario en cuestion mediante json web tokens
const autenticacionConJwt = (req, res, next) => {
  const authToken = req.query.t;
  const key = process.env.JWTKEY;

  if (authToken) {
    verify(authToken, key, (err, user) => {
      if (err) {
        return res.sendStatus(403);
        next(err);
      }
      req.user = user;
      next();
    });
  }
};

export default autenticacionConJwt
