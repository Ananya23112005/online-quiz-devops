const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the Online Quiz API", status: "Success" });
});

// A dummy route for a quiz question
app.get('/quiz', (req, res) => {
    res.status(200).json({
        question: "What does CI/CD stand for?",
        options: ["Continuous Integration", "Continuous Delivery", "Both"],
        answer: "Both"
    });
});

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
