const clientMiddleware = (req, res, next) => {
  const clientId = req.headers["client-id"];
  if (!clientId) {
    return res.status(401).json({ message: "client-id header missing" });
  }
  req.clientId = clientId;
  next();
};

export default clientMiddleware;
