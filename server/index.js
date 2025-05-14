const express = require('express');
const connectToDatabase = require('./config/db');
const mainRouter = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', mainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({
    message: "Internal Server Error"
  });
});

const port = process.env.SERVER_PORT;

// Immediately Invoked Function Expression (IIFE)
(async () => {
  await connectToDatabase();
})();

app.listen(port, () => {
  console.log(`App is Active`);
});
