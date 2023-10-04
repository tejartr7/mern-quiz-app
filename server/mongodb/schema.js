import mongoose from 'mongoose';

// Define a schema for the user data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure that usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure that emails are unique
    },
    password: {
        type: String,
        required: true
    },
    totalGames: {
        type: Number,
        default: 0 // Default value for total games
    },
    won: {
        type: Number,
        default: 0 // Default value for good games percentage
    },
    lost: {
        type: Number,
        default: 0 // Default value for average games
    },
});

// Create a model based on the schema
const User = mongoose.model('user', userSchema);

export default User;
