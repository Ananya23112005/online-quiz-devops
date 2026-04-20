Problem Statement
Manual software deployment often leads to "it works on my machine" errors and inconsistent code quality. This project addresses these challenges by implementing a fully automated CI/CD pipeline. The goal is to ensure that every update to the Online Quiz API is automatically analyzed for style errors, tested for bugs, and packaged into a Docker container before being deployed to the cloud.

 DevOps Toolkit
Version Control: Git & GitHub (Branching and structured commits)
Static Analysis: ESLint (Automated code quality checks)
Automated Testing: Jest (Unit testing for API routes)
CI/CD Engine: GitHub Actions (Automated build and test workflows)
Containerization: Docker (Ensuring environment consistency)
Cloud Deployment: Render (Automated hosting)

Architecture Flow
Code Push ➔ GitHub ➔ GitHub Actions (Lint/Test/Build) ➔ Docker Image ➔ Render Cloud

API Features
Root Route: Status check of the API.
Quiz Route: Fetches a sample quiz question to verify logic.
