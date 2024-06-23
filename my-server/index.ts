// This file acts as the intermediary between frontend (web interface) and database. It defines routes that frontend can call to perform database operations (like adding a new chapter).

import express from 'express';
import path from 'path';
import { initializeDatabase, fetchChaptersByYear, addChapter } from './databaseSetup';

const app = express();
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded body parsing
const PORT = 3000;
const cors = require('cors');
app.use(cors()); // Enable CORS to allow cross-origin requests

// Initialize the database
initializeDatabase().then(() => {
    console.log('Database initialized');
}).catch(error => {
    console.error('Failed to initialize database:', error);
});

// Serve HTML form at the root for adding chapters
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// API endpoint to fetch chapters by year
app.get('/chapters/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    console.log(`Received request for year: ${year}`);
    try {
        const chapters = await fetchChaptersByYear(year);
        console.log(`Query result for year ${year}:`, chapters);
        res.json(chapters);
    } catch (error) {
        console.error(`Error fetching data for year ${year}:`, error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// API endpoint to add a new chapter
app.post('/chapters', async (req, res) => {
    console.log("Raw request body:", req.body);  // Gibt den gesamten Request Body aus
    const { chapterName, chapterIntro, year } = req.body;
    console.log("Extracted fields:", chapterName, chapterIntro, year);  // Detaillog der extrahierten Daten
    if (!chapterName || !chapterIntro || !year) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await addChapter(chapterName, chapterIntro, parseInt(year));
        res.status(201).send('Chapter added successfully');
    } catch (error) {
        console.error('Error adding chapter:', error);
        res.status(500).json({ error: 'Failed to add chapter' });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.227.38:${PORT}`);
});
