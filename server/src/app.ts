import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to PC Visualizer API');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log('🚀 Server is up and running at http://localhost:' + PORT);
});
