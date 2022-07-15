import shortid from 'shortid';
import connectDB from '../../../server/config/db';
import Link from '../../../server/models/Link';
import protect from '../../../server/middleware/protect';
import validate from '../../../server/middleware/validate';
import linkSchema from '../../../server/validators/linkSchema';

connectDB();

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      // Crear un objeto del link
      const { originalName, filename } = req.body;
      const link = new Link();
      link.url = shortid.generate();
      link.filename = filename;
      link.original_name = originalName;

      // Si el usuario esta autenticado
      if (req.user) {
        const { password, downloads } = req.body;

        // Asignar al link el numero de descargas
        if (downloads) link.downloads = downloads;

        // Asignar password al link
        if (password) link.password = password;

        // Asignar el autor
        link.author = req.user._id;
      }

      // Guardar el enlace en la base de datos
      try {
        await link.save();
        res.json({ msg: `${link.url}` });
      } catch (error) {
        console.log(error);
      }
      return;

    default:
      res.status(500).json({ msg: 'Invalid request type' });
  }


};

export default protect(validate(linkSchema, handler));