const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid password' });
  }

  next();
};

module.exports = authMiddleware;
