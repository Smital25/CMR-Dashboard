const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));  // ✅ Correct route
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const dealRoutes = require('./routes/dealRoutes');
app.use('/api/deals', dealRoutes);
