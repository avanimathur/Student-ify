import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse URL-encoded data (FormData)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(bodyParser.json());

const users = []; // Dummy user storage

app.post('/signup', (req, res) => {
    console.log('\nReceived data:', req.body);
    const { email, password, repeatPassword } = req.body;

    // Check if all fields are present
    if (!email || !password || !repeatPassword) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Password length check
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Password match check
    if (password !== repeatPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        console.log('\n'+email+' is already registered!');
        return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Add user to the users array
    users.push({ email, password });

    // Respond with success message
    res.status(201).json({ message: 'Account created successfully!' });
    console.log('\n'+email+' is registered successfully!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

