import connectDB from '../../../server/config/db';
import Link from '../../../server/models/Link';
import hasPassword from '../../../server/middleware/hasPassword';
import validatePassword from '../../../server/middleware/validatePassword';

connectDB();

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
    case 'POST':
      const { url } = req.query;
      const link = await Link.findOne({ url });

      if (!link) {
        return res.status(404).json({ msg: 'The link does not exist.' });
      }

      return res.json({ file: link.filename, hasPassword: false });

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }
};

export default hasPassword(validatePassword(handler));