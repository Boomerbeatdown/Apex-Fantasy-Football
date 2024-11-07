# Backend Dockerfile

FROM python:3.9-slim

# Set up a non-root user
RUN useradd -m appuser

# Set the working directory
WORKDIR /app

# Install PostgreSQL client, upgrade pip, and install dependencies in one step
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    pip install --upgrade pip && \
    pip install psycopg-binary

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code and wait script
COPY . .

# Set permissions for wait-for-it.sh and wait_for_postgres.py
RUN chmod +x wait-for-it.sh wait_for_postgres.py

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 8000

# Start the application with the custom wait script
CMD ["python", "wait_for_postgres.py"]

