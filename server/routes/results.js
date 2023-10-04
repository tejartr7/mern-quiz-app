import express from "express";
import User from '../mongodb/schema.js';

const result = express();

result.get('/', async (req, res) => {
    try {
        const { token, win } = req.query;

        // Find the user by token (assuming token is user ID)
        const user = await User.findById(token);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's statistics
        user.totalGames += 1;
        //console.log(win);

        // Check if win is 'true' (as a string) to increase wins
        if (win === 'true') {
            user.won += 1;
        } else {
            user.lost += 1;
        }
        // Save the updated user
        console.log(user);
        await user.save();
        return res.status(200).json({ message: 'User statistics updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


export default result;
