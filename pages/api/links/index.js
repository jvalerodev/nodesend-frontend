import connectDB from '../../../server/config/db';
import Link from '../../../server/models/Link';

connectDB();

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const links = await Link.find({}).select('url -_id');
        res.json({ links });
      } catch (error) {
        console.log(error);
      }
      return;

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }

};

export default handler;