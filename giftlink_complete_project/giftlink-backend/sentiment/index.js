const natural = require("natural");
console.log("Natural package loaded");
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressAsyncHandler = require('express-async-handler');
// Task 8 Requirement: Import the natural npm package
const natural = require('natural');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.post('/sentiment', expressAsyncHandler(async (req, res) => {
    const { sentence } = req.body;

    if (!sentence) {
        return res.status(400).json({ error: 'Sentence is required' });
    }

    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    // Perform sentiment analysis
    const result = analyzer.getSentiment(sentence.split(' '));

    let sentiment = 'neutral';
    if (result > 0) {
        sentiment = 'positive';
    } else if (result < 0) {
        sentiment = 'negative';
    }

    res.status(200).json({ sentiment, score: result });
}));

app.listen(port, () => {
    console.log(`Sentiment analysis service running on port ${port}`);
});
