// This file acts as the intermediary between frontend (web interface) and database. It defines routes that frontend can call to perform database operations (like adding a new chapter).

import express from 'express';
import path from 'path';
import cors from 'cors';
import {
    initializeDatabase,
    fetchChaptersByYear,
    addChapter,
    fetchSubchaptersByChapterId,
    fetchSubchapterContentBySubchapterId,
    fetchMathChapters,
    fetchMathSubchaptersByChapterId,
    fetchMathSubchapterContentBySubchapterId
} from './databaseSetup';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

initializeDatabase().then(() => {
    console.log('Database initialized');
}).catch(error => {
    console.error('Failed to initialize database:', error);
});

// Serve the form.html file when the '/form' URL is accessed
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle GET requests to fetch chapters by year
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

// Handle POST requests to add a new chapter
app.post('/chapters', async (req, res) => {
    console.log("Raw request body:", req.body);
    const { chapterName, chapterIntro, year } = req.body;
    console.log("Extracted fields:", chapterName, chapterIntro, year);
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

// Handle GET requests to fetch subchapters by chapter ID
app.get('/subchapters/:chapterId', async (req, res) => {
    const chapterId = parseInt(req.params.chapterId);
    console.log(`Received request for subchapters of chapterId: ${chapterId}`);
    try {
        const subchapters = await fetchSubchaptersByChapterId(chapterId);
        console.log(`Query result for chapterId ${chapterId}:`, subchapters);
        res.json(subchapters);
    } catch (error) {
        console.error(`Error fetching subchapters for chapterId ${chapterId}:`, error);
        res.status(500).json({ error: 'Failed to fetch subchapters' });
    }
});

// Handle GET requests to fetch content by subchapter ID
app.get('/subchaptercontent/:subchapterId', async (req, res) => {
    const subchapterId = parseInt(req.params.subchapterId);
    console.log(`Received request for content of subchapterId: ${subchapterId}`);
    try {
        const subchapterContent = await fetchSubchapterContentBySubchapterId(subchapterId);
        console.log(`Query result for subchapterId ${subchapterId}:`, subchapterContent);
        res.json(subchapterContent);
    } catch (error) {
        console.error(`Error fetching content for subchapterId ${subchapterId}:`, error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
});

// Handle GET requests to fetch math chapters
app.get('/mathchapters', async (req, res) => {
    try {
        const mathChapters = await fetchMathChapters();
        res.json(mathChapters);
    } catch (error) {
        console.error('Error fetching math chapters:', error);
        res.status(500).json({ error: 'Failed to fetch math chapters' });
    }
});

// Handle GET requests to fetch math subchapters by chapter ID
app.get('/mathsubchapters/:chapterId', async (req, res) => {
    const chapterId = parseInt(req.params.chapterId);
    try {
        const subchapters = await fetchMathSubchaptersByChapterId(chapterId);
        res.json(subchapters);
    } catch (error) {
        console.error(`Error fetching subchapters for chapterId ${chapterId}:`, error);
        res.status(500).json({ error: 'Failed to fetch subchapters' });
    }
});

// Handle GET requests to fetch math subchapter content by subchapter ID
app.get('/mathsubchaptercontent/:subchapterId', async (req, res) => {
    const subchapterId = parseInt(req.params.subchapterId);
    try {
        const subchapterContent = await fetchMathSubchapterContentBySubchapterId(subchapterId);
        res.json(subchapterContent);
    } catch (error) {
        console.error(`Error fetching content for subchapterId ${subchapterId}:`, error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
});

// Start the server on the specified port and IP address
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.227.38:${PORT}`);
});


