import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const { token } = req.headers;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'simpleSecretKey123');

      if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.status(403).json({
          message: 'Access denied.',
        });
      }

      next();
    } catch (err) {
      return res.status(403).json({
        message: 'Access denied.',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Access denied.',
    });
  }
};
