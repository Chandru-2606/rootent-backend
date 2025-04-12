const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./src/config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/resumes', require('./src/routes/resumeRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
  });

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 