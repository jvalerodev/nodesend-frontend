import stream from 'stream';
import { promisify } from 'util';
import path from 'path';
import Link from '../models/Link';

const pipeline = promisify(stream.pipeline);

const downloadFile = handler => {
  return async (req, res) => {
    const { file } = req.query;
    const link = await Link.findOne({ filename: file });

    if (!link) {
      return res.redirect(process.env.FRONTEND_URL);
    }

    const fileDownload = path.resolve() + '/server/uploads/' + file;
    res.setHeader('Content-Type', `application/${file.substring(file.lastIndexOf('.'), file.length)}`);
    res.setHeader('Content-Disposition', `attachment; filename=${file}`);
    await pipeline(fileDownload, res);

    // Comprobar la cantidad de descargas restantes
    if (link.downloads === 1) {
      req.filename = link.filename; // Eliminar el archivo
      await link.deleteOne(); // Eliminar el enlace de la base de datos
      return handler(req, res);
    }

    link.downloads--;
    await link.save();
  };
};

export default downloadFile;