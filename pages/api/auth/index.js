import connectDB from '../../../server/config/db';
import protect from '../../../server/middleware/protect';

connectDB();

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { user } = req;
      return res.status(200).json({ user });

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }
};

export default protect(handler);