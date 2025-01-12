FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy only requirements.txt first to leverage Docker's caching
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 5000

# Use Flask's development server with hot-reloading
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
