import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import connectDB from '../../../server/config/db';
import protect from '../../../server/middleware/protect';

connectDB();

const handler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      const multerConfig = {
        limits: { fileSize: req.user ? 20971520 : 1048576 },
        storage: multer.diskStorage({
          destination: (req, file, callback) => {
            callback(null, path.resolve() + '/server/uploads');
          },
          filename: (req, file, callback) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            callback(null, `${shortid.generate() + extension}`);
          }
        })
      };

      const upload = multer(multerConfig).single('file');

      upload(req, res, error => {
        if (error) {
          console.log(error);
          return res.status(400).json({ msg: 'Error uploading file' });
        }
        res.status(200).json({ file: req.file.filename });
      });
      return;

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  }
};

export default protect(handler);