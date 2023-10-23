import express from 'express';
import { loadData } from './data-access/load-data.js';

const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const data = loadData();
  res.end(`Data:\n${JSON.stringify(data, undefined, 2)}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
