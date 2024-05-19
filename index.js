const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const entityRoutes = require('./routes/entityRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/headlessCMS', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', entityRoutes);

app.listen(8080, () => console.log('Server running on port 8080'));
