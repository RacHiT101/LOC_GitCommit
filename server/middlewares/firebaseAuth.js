const { auth } = require("../firebase");

const firebaseAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    req.user = await auth.verifyIdToken(token);
    next();
  } catch (e) {
    res.status(401).json("Invalid JWT Token");
  }
};

const firebaseSocketAuth = async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    socket.user = await auth.verifyIdToken(token);
    next();
  } catch (e) {
    next(new Error("Invalid JWT Token"));
  }
};

module.exports = { firebaseAuth, firebaseSocketAuth };
