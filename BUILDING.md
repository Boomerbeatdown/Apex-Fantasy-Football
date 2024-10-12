# Building Apex Fantasy Football Platform

## Overview

This guide walks you through the steps to build the Apex Fantasy Football platform from scratch, including setting up both the frontend and backend, managing dependencies, and configuring your development environment.

## Prerequisites

Before building the platform, ensure that the following tools are installed:

- **Node.js** (version 16+)
- **PNPM** (version 7+)
- **Python** (version 3.10+)
- **Poetry** (version 1.2+)
- **PostgreSQL** (version 13+)
- **Docker** (for containerization)
- **Git** (for version control)

## Frontend Setup

1. **Navigate to the `frontend` directory**:
   ```bash
   cd frontend

Install dependencies using PNPM:

bash
Copy code
pnpm install
Start the development server:

bash
Copy code
pnpm start
The app will be available at http://localhost:3000.

Build the frontend for production:

bash
Copy code
pnpm build
The production build files will be in the build/ directory.

Run frontend tests:

bash
Copy code
pnpm test
Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Create a virtual environment using Poetry:

bash
Copy code
poetry shell
Install backend dependencies:

bash
Copy code
poetry install
Set up the database: Make sure PostgreSQL is running, then run the following command to create the necessary tables:

bash
Copy code
python manage.py migrate
Start the Django development server:

bash
Copy code
python manage.py runserver
The backend will be available at http://localhost:8000.

Run backend tests:

bash
Copy code
poetry run pytest
Database Setup
Install PostgreSQL if not already installed:

On macOS:
bash
Copy code
brew install postgresql
On Ubuntu:
bash
Copy code
sudo apt update
sudo apt install postgresql postgresql-contrib
Create a PostgreSQL database:

bash
Copy code
createdb apex_fantasy_db
Configure your .env file with the following database settings:

env
Copy code
DATABASE_NAME=apex_fantasy_db
DATABASE_USER=your_postgres_user
DATABASE_PASSWORD=your_postgres_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
Docker Setup (Optional)
Build the Docker containers:

bash
Copy code
docker-compose build
Run the containers:

bash
Copy code
docker-compose up
This will spin up both the frontend and backend containers, along with the PostgreSQL database.

Testing & CI/CD
The platform uses GitHub Actions for automated testing and deployment. The .github/workflows directory contains the necessary configuration files for CI/CD pipelines.

Frontend Tests: Handled by Jest.
Backend Tests: Handled by Pytest.
Continuous Integration: Each push triggers tests for both the frontend and backend.
Deployment: Configured for Docker-based deployment on cloud platforms like AWS, Heroku, or DigitalOcean.
Building for Production
For production deployment, ensure that:

Docker is properly set up with docker-compose.
Environment variables are correctly configured in your .env files.
Frontend assets are built and served by a reverse proxy (e.g., Nginx).
Contributing
See the CONTRIBUTING.md file for detailed instructions on how to contribute to the project. Make sure to follow the coding standards and best practices outlined in that document.

