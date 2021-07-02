const express = require('express');
const bodyParser = require('body-parser');

const testsRoutes = require('./routes/tests');

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to Database!');
}).catch(error => {
  console.error('Could not connect to Database! Error:');
  console.log(error);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api/tests', testsRoutes);

module.exports = app;
