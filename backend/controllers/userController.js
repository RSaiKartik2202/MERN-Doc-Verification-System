import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const { sign } = jwt;
const { hash, compare } = bcrypt;

// Register route
const registerUser = asyncHandler(
    async (req, res) => {
        const { name, email, password, role} = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword , role});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
);

// Login route
const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role:user.role } });
    }
);

export { registerUser, loginUser };