import { verifyJWT } from '../utils/jwt.js';
import { UserModel } from '../models/User.js';

export const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { userId } = await verifyJWT({ token });

    const user = await UserModel.findOne({ _id: userId });

    if (!user) return res.status(401).json({ error: 'Invalid token' });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
