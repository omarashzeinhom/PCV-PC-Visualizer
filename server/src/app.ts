import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http:localhost:${PORT}`);
});


app.use(cors());
