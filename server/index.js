import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import router from './routes/routes.js';
import login from './routes/login.js'
import user from './routes/user.js'
import result from './routes/results.js';
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.get("/", (req, res) => { res.status(200).send("server started by rtr") });
app.use("/register", router);
app.use("/login", login);
app.use("/user", user);
app.use("/results", result);
app.listen(8000, () => {
    connectDB(process.env.MONGODB_URL);
    console.log('Server is running on port 8000');
});