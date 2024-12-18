import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import jobRoutes from './routes/jobRoutes.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware 
app.use(express.json());
app.use(cors());


// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Routes

app.use('/api/jobs', jobRoutes);


// Error Handling 
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || "An error occurred" });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;


