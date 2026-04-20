const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevOps Pro | Analytics Quiz System</title>
        <script src="https://jsdelivr.net"></script>
        <style>
            :root { --primary: #6366f1; --bg: #0f172a; --card: #1e293b; --success: #22c55e; --error: #ef4444; }
            body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: white; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .container { width: 95%; max-width: 700px; background: var(--card); padding: 2rem; border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid #334155; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #334155; }
            .timer-box { font-size: 1.2rem; font-weight: bold; color: #f59e0b; }
            .question-count { font-size: 0.9rem; color: #94a3b8; }
            .q-text { font-size: 1.4rem; margin-bottom: 1.5rem; line-height: 1.5; min-height: 80px; }
            .options-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
            .opt-btn { background: #334155; border: 1px solid #475569; color: white; padding: 15px; border-radius: 10px; cursor: pointer; transition: 0.3s; text-align: left; font-size: 1rem; }
            .opt-btn:hover { background: var(--primary); transform: translateX(5px); }
            #analytics { display: none; }
            .chart-container { max-width: 250px; margin: 20px auto; position: relative; }
            .stat-box { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
            .stat { background: #0f172a; padding: 15px; border-radius: 12px; border: 1px solid #334155; }
            .badge { background: var(--success); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <div id="quiz-ui">
                <div class="header">
                    <span class="badge">DOCKER CONTAINER ACTIVE</span>
                    <div class="timer-box" id="timer">Time: 60s</div>
                </div>
                <div class="question-count" id="q-count">Question 1 of 10</div>
                <div class="q-text" id="q-text">Initializing Quiz...</div>
                <div class="options-grid" id="options"></div>
            </div>

            <div id="analytics">
                <h1 style="color:var(--primary)">Project Performance</h1>
                <p>Metrics verified via GitHub Actions Pipeline</p>
                <div class="chart-container"><canvas id="resultChart"></canvas></div>
                <div class="stat-box">
                    <div class="stat"><h2 id="final-score" style="margin:0">0</h2><p style="color:#94a3b8; margin:5px 0 0 0">Correct</p></div>
                    <div class="stat"><h2 id="final-accuracy" style="margin:0">0%</h2><p style="color:#94a3b8; margin:5px 0 0 0">Accuracy</p></div>
                </div>
                <button onclick="location.reload()" style="margin-top:25px; padding:12px 30px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Run Pipeline Again</button>
            </div>
        </div>

        <script>
            let current = 0;
            let score = 0;
            let timeLeft = 60;
            const quizData = [
                { q: "Which tool is used for containerization?", o: ["Git", "Docker", "Jenkins", "ESLint"], a: "Docker" },
                { q: "What does CI stand for?", o: ["Cloud Info", "Core Integration", "Continuous Integration", "Control Input"], a: "Continuous Integration" },
                { q: "Which file is used to define GitHub Actions?", o: ["package.json", "Dockerfile", "main.yml", "index.js"], a: "main.yml" },
                { q: "What is the purpose of a .gitignore file?", o: ["Save code", "Exclude files from Git", "Run tests", "Deploy app"], a: "Exclude files from Git" },
                { q: "Which command builds a Docker image?", o: ["docker run", "docker push", "docker build", "npm start"], a: "docker build" },
                { q: "What is Jest used for in DevOps?", o: ["Containerization", "Automated Testing", "Hosting", "Styling"], a: "Automated Testing" },
                { q: "What tool performs Static Analysis?", o: ["ESLint", "Node.js", "Render", "Docker"], a: "ESLint" },
                { q: "What is the 'D' in CI/CD?", o: ["Design", "Database", "Deployment", "Deletion"], a: "Deployment" },
                { q: "Where is this app currently hosted?", o: ["Localhost", "GitHub", "Render", "Dockerfile"], a: "Render" },
                { q: "Which file handles project dependencies?", o: ["index.js", "package.json", "main.yml", ".gitignore"], a: "package.json" }
            ];

            const timerInterval = setInterval(() => {
                timeLeft--;
                document.getElementById('timer').innerText = "Time: " + timeLeft + "s";
                if(timeLeft <= 0) endQuiz();
            }, 1000);

            function loadQuestion() {
                if(current >= quizData.length) return endQuiz();
                
                document.getElementById('q-count').innerText = "Question " + (current + 1) + " of 10";
                document.getElementById('q-text').innerText = quizData[current].q;
                const optBox = document.getElementById('options');
                optBox.innerHTML = '';
                
                quizData[current].o.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'opt-btn';
                    btn.innerText = opt;
                    btn.onclick = () => {
                        if(opt === quizData[current].a) score++;
                        current++;
                        loadQuestion();
                    };
                    optBox.appendChild(btn);
                });
            }

            function endQuiz() {
                clearInterval(timerInterval);
                document.getElementById('quiz-ui').style.display = 'none';
                document.getElementById('analytics').style.display = 'block';
                document.getElementById('final-score').innerText = score + " / " + quizData.length;
                document.getElementById('final-accuracy').innerText = Math.round((score/quizData.length)*100) + "%";
                
                const ctx = document.getElementById('resultChart').getContext('2d');
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Correct', 'Wrong'],
                        datasets: [{
                            data: [score, quizData.length - score],
                            backgroundColor: ['#22c55e', '#ef4444'],
                            borderWidth: 0
                        }]
                    },
                    options: { cutout: '80%', plugins: { legend: { display: false } } }
                });
            }
            loadQuestion();
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log("Professional Quiz running!"));
