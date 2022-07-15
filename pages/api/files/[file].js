import fs from 'fs';
import path from 'path';
import connectDB from '../../../server/config/db';
import downloadFile from '../../../server/middleware/downloadFile';

connectDB();

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        fs.unlinkSync(path.resolve() + `/server/uploads/${req.filename}`);
      } catch (error) {
        console.log(error);
      }
      return;

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }
};

export default downloadFile(handler);