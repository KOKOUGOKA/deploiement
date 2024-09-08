// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (update the URL with your database connection string)
mongoose.connect('mongodb://localhost:27017/admin_scolaire', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const attendanceRoutes = require('./routes/attendance');
const gradeRoutes = require('./routes/grades');

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// routes/users.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Create a new user
});

router.get('/:id', (req, res) => {
  // Get user by ID
});

router.put('/:id', (req, res) => {
  // Update user
});

router.delete('/:id', (req, res) => {
  // Delete user
});

module.exports = router;

// Similar route files would be created for courses, attendance, and grades

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add more fields as needed
});

module.exports = mongoose.model('User', userSchema);

// Similar model files would be created for Course, Attendance, and Grade
