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
    fetchMathSubchapterContentBySubchapterId,
    fetchQuizByContentId,
    fetchMultipleChoiceOptionsByQuizId,
    fetchClozeTestOptionsByQuizId,
    fetchMathMiniQuizByContentId,
    searchSubchapters,
    fetchFlashcardTopicsBySubchapterId,
    fetchFlashcardsByTopic,
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

// Handle GET requests to fetch quiz by content ID
app.get('/quiz/:contentId', async (req, res) => {
    const contentId = parseInt(req.params.contentId);
    try {
        const quiz = await fetchQuizByContentId(contentId);
        res.json(quiz); // Always return 200 OK with the quiz data (even if empty)
    } catch (error) {
        console.error(`Error fetching quiz for contentId ${contentId}:`, error);
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
});


// Handle GET requests to fetch multiple-choice options by quiz ID
app.get('/multiplechoiceoptions/:quizId', async (req, res) => {
    const quizId = parseInt(req.params.quizId);
    try {
        const options = await fetchMultipleChoiceOptionsByQuizId(quizId);
        res.json(options);
    } catch (error) {
        console.error(`Error fetching multiple-choice options for quizId ${quizId}:`, error);
        res.status(500).json({ error: 'Failed to fetch multiple-choice options' });
    }
});

// Handle GET requests to fetch cloze test options by quiz ID
app.get('/clozetestoptions/:quizId', async (req, res) => {
    const quizId = parseInt(req.params.quizId);
    try {
        const options = await fetchClozeTestOptionsByQuizId(quizId);
        res.json(options);
    } catch (error) {
        console.error(`Error fetching cloze test options for quizId ${quizId}:`, error);
        res.status(500).json({ error: 'Failed to fetch cloze test options' });
    }
});

// Handle GET requests to fetch MathMiniQuiz by content ID
app.get('/mathminiquiz/:contentId', async (req, res) => {
    const contentId = parseInt(req.params.contentId);
    try {
        const mathMiniQuiz = await fetchMathMiniQuizByContentId(contentId);
        res.json(mathMiniQuiz);
    } catch (error) {
        console.error(`Error fetching MathMiniQuiz for contentId ${contentId}:`, error);
        res.status(500).json({ error: 'Failed to fetch MathMiniQuiz' });
    }
});


// Handle GET requests for search
app.get('/search/:query', async (req, res) => {
    const searchQuery = req.params.query;
    console.log(`Received search query: ${searchQuery}`);

    try {
        const searchResults = await searchSubchapters(searchQuery); // Use the DB function to search subchapters and content
        console.log('Search results:', searchResults);
        res.json(searchResults); // Return the search results to the client
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

// Handle GET requests to fetch flashcard topics by SubchapterId
app.get('/flashcards/topics/subchapter/:subchapterId', async (req, res) => {
    const subchapterId = parseInt(req.params.subchapterId);
    console.log(`Received request to fetch flashcard topics for subchapterId: ${subchapterId}`);
    
    try {
        const topics = await fetchFlashcardTopicsBySubchapterId(subchapterId);
        console.log(`Fetched flashcard topics for subchapterId ${subchapterId}:`, topics);
        res.json(topics);
    } catch (error) {
        console.error(`Error fetching flashcard topics for subchapterId ${subchapterId}:`, error);
        res.status(500).json({ error: 'Failed to fetch flashcard topics' });
    }
});

// Fetch flashcards (Question and Answer) by TopicName and SubchapterId
app.get('/flashcards/subchapter/:subchapterId/topic/:topicName', async (req, res) => {
    const subchapterId = parseInt(req.params.subchapterId);
    const topicName = req.params.topicName;
    console.log(`Received request to fetch flashcards for topic: ${topicName} and subchapterId: ${subchapterId}`);
    
    try {
        const flashcards = await fetchFlashcardsByTopic(subchapterId, topicName);
        console.log(`Fetched flashcards for topic ${topicName} and subchapterId ${subchapterId}:`, flashcards);
        res.json(flashcards);
    } catch (error) {
        console.error(`Error fetching flashcards for topic ${topicName} and subchapterId ${subchapterId}:`, error);
        res.status(500).json({ error: 'Failed to fetch flashcards' });
    }
});

// Start the server on the specified port and IP address
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.227.38:${PORT}`);
});


