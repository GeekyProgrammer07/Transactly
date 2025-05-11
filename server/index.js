const express = require('express')
const connectToDatabase = require('./config/db')
const mainRouter = require('./routes/index')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use('/api/v1',mainRouter);

const port = process.env.SERVER_PORT;

// Immediately Invoked Function Expression (IIFE) with async
(async() => {
  await connectToDatabase();
})();

app.listen(port, () => {
  console.log(`App is Active`)
})  