import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  const {
    query: { pid },
  } = req;
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  const data = require(`@data/mock/${pid}/project.json`);
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  res.json(`${JSON.stringify(data)}`);
}
