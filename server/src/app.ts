import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';


dotenv.config();
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;
//console.log('Environment Variables:', process.env); // Log all to see what’s loaded

//console.log('Environment Variables:', process.env.PORT, process.env.MONGODB_URI);
// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log('🚀 Server is up and running at http://localhost:' + PORT);
});



app.use(cors());
