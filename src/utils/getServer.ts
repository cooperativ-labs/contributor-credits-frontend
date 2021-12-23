const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://cooperativ.io' || 'https://www.cooperativ.io';
// const server = 'http://localhost:3000';
// const server = 'https://cooperativ.io';
export default server;
