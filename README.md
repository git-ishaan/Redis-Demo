

Redis Demo 

  This is a simple Node.js Express server that demonstrates the use of Redis for caching data. The server fetches data from the JSONPlaceholder API and caches the data in Redis for faster retrieval.   ## Prerequisites   - Node.js (version 12 or higher) - Redis (or Docker for running Redis in a container)   ## Installation   1. Clone the repository:  

 git clone  https://github.com/your-username/redis-demo.git`

2.  Navigate to the project directory:
    
 
    
    `cd redis-demo`
    
3.  Install the dependencies:
    
    
    
    `npm  install`
    

## Running the Application

### Option 1: Using Redis installed locally

If you have Redis installed locally, you can run the application directly:



`npm start`

### Option 2: Using Redis in a Docker container

If you don't have Redis installed locally, you can run it in a Docker container:

1.  Make sure you have Docker installed on your machine.
2.  Start the Redis container:
    

    
    `docker run -d --name redis-container -p 6379:6379 redis`
    
    This command starts a Redis container named `redis-container` and maps the container's port 6379 to the host's port 6379.
3.  Run the application:

    
    `npm start`
    

The server will start running on `http://localhost:3001`.

## Usage

The server provides the following endpoints:

-   `GET /`: Returns a simple message indicating that the server is up and running.
-   `GET /data`: Fetches data from the JSONPlaceholder API without caching.
-   `GET /data-cached`: Fetches data from the JSONPlaceholder API and caches the data in Redis for 1 hour.

## Redis Installation via Docker

To install Redis using Docker, follow these steps:

1.  Make sure you have Docker installed on your system.
2.  Open a terminal or command prompt.
3.  Run the following command to start a Redis container:
    
   
    
    `docker run -d --name redis-container -p 6379:6379 redis`
    
    This command pulls the latest Redis Docker image, creates a new container named `redis-container`, and maps the container's port 6379 to the host's port 6379.
4.  After the container starts, you can verify that Redis is running by executing the following command:
    
  
    
    `docker logs redis-container`
    
    You should see output similar to:
    

    
    `1:C 17 Jun 2023 12:34:56.123 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo 1:C 17 Jun 2023 12:34:56.123 # Redis version=7.0.11, bits=64, commit=00000000, ext=0, mode=standalone, ... ... 1:M 17 Jun 2023 12:34:56.127 * Ready to accept connections`
    

Now you have Redis running in a Docker container, and you can connect to it from your Node.js application using the `redis://localhost:6379` URL.

Remember to stop and remove the Redis container when you're done by running the following command:



`docker stop redis-container &&  docker  rm redis-container`
