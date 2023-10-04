import express from 'express';
import User from '../mongodb/schema.js';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const { username, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // User with this email already exists
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password, // You should hash the password before saving it in production
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
