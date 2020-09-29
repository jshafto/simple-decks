const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const { jwtConfig: { secret, expiresIn } } = require('../../config');
const UserUtils = require('../../db/user-utils');

function generateToken(user) {
  const data = user.toSafeObject();
  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
}

function restoreUser(req, res, next) {
  const { token } = req.cookies;


  if (!token) {
    return next({ status: 401, message: 'no token' });
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      res.clearCookie('token');
      err.status = 401;
      return next(err);
    }

    const tokenId = payload.jti;

    try {
      req.user = await UserUtils.findByTokenId(tokenId);
    } catch (e) {
      res.clearCookie("token");
      return next({ status: 401, message: "user not found" });
    }

    if (!req.user.isValid()) {
      res.clearCookie("token");
      return next({ status: 401, message: 'session not found' });
    }

    next();
  });
}

// this function is for routes that need to have the user's
// id when they're logged in, but that can also be accessed publicly
// specifically, users can 'GET' their own decks, and users/guests can 'GET'
// anyone's public decks.
function restoreUserIfPossible(req, res, next) {
  const { token } = req.cookies;


  if (!token) {
    return next();
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      return next();
    }

    const tokenId = payload.jti;

    try {
      req.user = await UserUtils.findByTokenId(tokenId);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user.isValid()) {
      res.clearCookie("token");
      return next();
    }

    next();
  });
}

const authenticated = [restoreUser];
const userInfo = [restoreUserIfPossible]

module.exports = { generateToken, authenticated, userInfo};
