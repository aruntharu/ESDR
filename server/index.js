const express = require('express');
const app = express();
const dbConnect = require('./src/db/connection');
const userRoute = require('./src/routes/user');
const newsRoute = require('./src/routes/news');
const messageRoute = require('./src/routes/message');
const committeeRoute = require('./src/routes/committee');
const esdrRoute = require('./src/routes/esdr');
const noticeRoute = require('./src/routes/notice');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

dbConnect();

app.use(cors());
require('dotenv').config();
app.use(express.json());

const folders = [
  'uploads/committeeImage',
  'uploads/esdrImage',
  'uploads/citizenship',
  'uploads/newsImage',
  'uploads/verification/front',
  'uploads/verification/back'
];

// Check and create folders if they do not exist
folders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

app.use(userRoute);
app.use(newsRoute);
app.use(messageRoute);
app.use(committeeRoute);
app.use(esdrRoute);
app.use(noticeRoute);
app.use('/uploads/committeeImage', express.static(path.join(__dirname, 'uploads/committeeImage')));
app.use('/uploads/esdrImage', express.static(path.join(__dirname, 'uploads/esdrImage')));
app.use('/uploads/citizenship', express.static(path.join(__dirname, 'uploads/citizenship')));
app.use('/news-image', express.static(path.join(__dirname, 'uploads/newsImage')));
app.use('/uploads/verification/front', express.static(path.join(__dirname, 'uploads/verification/front')));
app.use('/uploads/verification/back', express.static(path.join(__dirname, 'uploads/verification/back')));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});