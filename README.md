## Agile Software Practice - Assignment 1.
## Name: Jiacheng Pan Student Number:20108802

## Project overview

This project is a Movies API application containerised using Docker. It contains the following components:

- Movies API: an API that returns information about movies.
- MongoDB: used to store movie data.
- Redis: for caching API responses and rate limiting ‘get all movies’ requests.
- Mongo Express: a web application for managing the MongoDB database.

This project supports both development and production environments. The development environment automatically initialises the database data, while the production environment does not deploy Mongo Express and does not initialise the database.

## Project Structure
```
.
├── .dockerignore      # Specifies files to ignore during the Docker build process.
├── .env               # Environment variable configuration file for Docker containers.
├── .gitignore         # Specifies untracked files to ignore.
├── docker-compose.yml # The Docker Compose file that defines and configures the application services.
├── Dockerfile         # Instructions for building the application Docker image.
├── README.md          # Project documentation.
├── package.json       # Dependency definition file for Node.js applications.
├── package-lock.json  # Version information for all installed packages.
├── seed.js            # The script used to initialise the MongoDB database.
└── seeding.json       # Contains movie data for initialisation.
```

## Subassemblies

- doconnor/movies-api:1.0: The main API service.
- mongo:8.0-rc: MongoDB database.
- redis: Redis server.
- mongo-express:1.0-20-alpine3.19: MongoDB management interface.

## Environment configuration
 .env


## How to deploy
1. Clone the repository to your local machine.
```sh
$ git clone <repository-url>
```
2. Navigate to the project directory.
```sh
$ cd movies-api-project
```
3. Run the following command to start all services:
```sh
docker-compose up --build
```
4. Once the services are up and running, you can access:
   - Movies API at `http://localhost:9000/`
   - Mongo Express at `http://localhost:8081/`
5. Use the following command to stop and remove the container:
```sh
$ docker-compose down
```

## Database initialisation
The `seed.js` script is used to seed the MongoDB database with initial movie data. In the development environment, `seed.js` automatically imports the movie data from `seeding.json` into the MongoDB database when the service starts.

- Functionality: Connects to the `movies` database and inserts data from `seeding.json` into the `movies` collection.
- Usage: Run this script to initialize the database with sample movie data for development or testing.

To run the script, use:
```
node seed.js
```
Make sure MongoDB is running and `seeding.json` is available with valid data.

### Redis Caching and Rate Limiting Tests

1. **Cache test**.
   - Send the same request multiple times, the first time will fetch the data from MongoDB and subsequent requests will fetch it from the Redis cache.

2. **Rate Limit Test**: If the ‘Get All Movies’ request is too large, it will get the data from MongoDB the first time.
   - Redis will rate-limit the ‘get all movies’ requests if they are too frequent. Try sending multiple requests to see if rate limiting is in effect.

## Container Isolation
Each service runs in its own container, ensuring isolated environments that prevent conflicts between dependencies and configurations across services.

## Conclusion
This project provides a modular, containerised film information API that utilises Docker to achieve isolation and flexible deployment between components, and provides two environment configurations for development and production.
