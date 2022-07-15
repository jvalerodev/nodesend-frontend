import Link from '../models/Link';

const hasPassword = handler => {
  return async (req, res) => {
    const { url } = req.query;
    const { method } = req;

    const link = await Link.findOne({ url });

    if (!link) {
      return res.status(404).json({ msg: 'The link does not exist.' });
    }

    if (link.password && method === 'GET') {
      return res.json({ hasPassword: true, url: link.url, file: link.filename });
    }

    return handler(req, res);
  };
};

export default hasPassword;