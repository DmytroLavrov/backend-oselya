import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  // const tokenCheck = req.headers;

  // console.log(tokenCheck);

  if (!token) {
    console.error('No token found');
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, 'simpleSecretKey123');
      // console.log(decoded);

      req.userId = decoded._id;
      // console.log(req.userId);

      next();
    } catch (err) {
      return res.status(403).json({
        message: 'Access denied.',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Access denіed.',
    });
  }
};
