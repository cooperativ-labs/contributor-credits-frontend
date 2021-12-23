import NextCors from 'nextjs-cors';
export default async function handler(req, res) {
  const data = require('@data/mock/projects.json');
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  res.end(`${JSON.stringify(data)}`);
}
