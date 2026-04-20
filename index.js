const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevOps Pro | Analytics Quiz System</title>
        <script src="https://jsdelivr.net"></script>
        <style>
            :root { --primary: #6366f1; --bg: #0f172a; --card: #1e293b; }
            body { font-family: 'Inter', sans-serif; background: var(--bg); color: white; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .container { width: 90%; max-width: 800px; background: var(--card); padding: 2.5rem; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid #334155; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #334155; padding-bottom: 1rem; }
            .progress-container { width: 100%; height: 8px; background: #334155; border-radius: 10px; margin-bottom: 2rem; overflow: hidden; }
            #progress-bar { width: 0%; height: 100%; background: var(--primary); transition: 0.4s; }
            .question-text { font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; line-height: 1.4; }
            .options-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
            .option-btn { background: #334155; border: 2px solid transparent; color: white; padding: 1rem; border-radius: 12px; cursor: pointer; text-align: left; transition: 0.2s; font-size: 1rem; }
            .option-btn:hover { background: #475569; border-color: var(--primary); }
            #analytics-section { display: none; text-align: center; }
            .chart-container { position: relative; height: 300px; width: 300px; margin: 0 auto; }
            .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
            .stat-card { background: #0f172a; padding: 1rem; border-radius: 10px; }
            .badge { background: #22c55e; padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; }
        </style>
    </head>
    <body>
        <div class="container" id="main-container">
            <div id="quiz-section">
                <div class="header">
                    <span class="badge">DEVOPS PIPELINE LIVE</span>
                    <div id="timer">Time: 00:30</div>
                </div>
                <div class="progress-container"><div id="progress-bar"></div></div>
                <div class="question-text" id="q-text">Loading high-level analytics...</div>
                <div class="options-grid" id="options-container"></div>
            </div>

            <div id="analytics-section">
                <h1>Performance Analytics</h1>
                <p>Quiz Completed Successfully via Containerized Deployment</p>
                <div class="chart-container"><canvas id="scoreChart"></canvas></div>
                <div class="stat-grid">
                    <div class="stat-card"><h2 id="final-score">0</h2><p>Correct Answers</p></div>
                    <div class="stat-card"><h2 id="accuracy">0%</h2><p>Accuracy Rate</p></div>
                </div>
                <button onclick="location.reload()" style="margin-top:2rem; background:var(--primary); color:white; border:none; padding:12px 24px; border-radius:8px; cursor:pointer;">Restart Pipeline Test</button>
            </div>
        </div>

        <script>
            let currentQ = 0;
            let score = 0;
            let quizData = [];

            async function initQuiz() {
                const res = await fetch('/quiz-data');
                quizData = await res.json();
                showQuestion();
            }

            function showQuestion() {
                if(currentQ >= quizData.length) return showAnalytics();
                const q = quizData[currentQ];
                document.getElementById('q-text').innerText = q.question;
                document.getElementById('progress-bar').style.width = \`\${((currentQ)/quizData.length)*100}%\`;
                
                const container = document.getElementById('options-container');
                container.innerHTML = '';
                q.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'option-btn';
                    btn.innerText = opt;
                    btn.onclick = () => handleAnswer(opt === q.answer);
                    container.appendChild(btn);
                });
            }

            function handleAnswer(isCorrect) {
                if(isCorrect) score++;
                currentQ++;
                showQuestion();
            }

            function showAnalytics() {
                document.getElementById('quiz-section').style.display = 'none';
                document.getElementById('analytics-section').style.display = 'block';
                document.getElementById('final-score').innerText = score;
                document.getElementById('accuracy').innerText = Math.round((score/quizData.length)*100) + '%';
                
                new Chart(document.getElementById('scoreChart'), {
                    type: 'doughnut',
                    data: {
                        labels: ['Correct', 'Incorrect'],
                        datasets: [{
                            data: [score, quizData.length - score],
                            backgroundColor: ['#22c55e', '#ef4444'],
                            borderWidth: 0
                        }]
                    },
                    options: { cutout: '80%', plugins: { legend: { display: false } } }
                });
            }
            initQuiz();
        </script>
    </body>
    </html>
    `);
});

app.get('/quiz-data', (req, res) => {
    res.json([
        { question: "Which tool is used for Containerization in DevOps?", options: ["Jenkins", "Docker", "Git", "Selenium"], answer: "Docker" },
        { question: "What does CI stand for in a CI/CD Pipeline?", options: ["Continuous Insurance", "Code Integration", "Continuous Integration", "Control Instance"], answer: "Continuous Integration" },
        { question: "Where is code analyzed for quality before deployment?", options: ["Staging", "Static Analysis Step", "Local Host", "Docker Hub"], answer: "Static Analysis Step" },
        { question: "What is the benefit of an automated pipeline?", options: ["Increases manual work", "Faster & Error-free delivery", "Requires more servers", "Deletes Git history"], answer: "Faster & Error-free delivery" }
    ]);
});

if (require.main === module) {
    app.listen(PORT, () => console.log('Pro Analytics Quiz Live!'));
}
module.exports = app;
