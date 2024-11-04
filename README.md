## Docker Assignment - Agile Software Practice.

__Name:__ ....Jiacheng Pan .....

__Demo:__ .... [The link to your YouTube demonstration](https://youtu.be/HZSJwmEr_XQ) ....

This repository contains the containerization of the mukti-container application illustrated below.

![](./images/arch.png)

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
├── docker-compose.dev.yml # Development mode.
├── docker-compose.prod.yml # Production mode.
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

### Database Seeding.

The `seed.js` script automates the seeding of the application's MongoDB database as follows:
1. **Dependencies and Setup**:
   - The script uses `MongoClient` from the `mongodb` library to connect to the MongoDB instance.
   - It also uses the `fs` module to read data from a JSON file.
   - The connection details (`mongodb://admin:password@mongo:27017`) are configured to connect to a Docker container.
2. **Connection to Database**:
   - The script connects to the database named `'movies'` using the MongoDB client.
   - It establishes a connection using credentials specified in the Docker Compose setup, ensuring easy configuration and isolation of the development environment.
3. **Loading and Inserting Data**:
   - The script reads movie data from `seeding.json`, which contains records to be inserted into the database.
   - It then inserts this data into the `'movies'` collection in the database.

   To run the script, use:
```
node seed.js
```
Make sure MongoDB is running and `seeding.json` is available with valid data.

### M.ulti-Stack.

To support both development and production stack options, I created two separate Docker Compose files:
1. **`docker-compose.dev.yml` (Development Environment)**:
   - Includes services like **Mongo Express** for easy database management.
   - **Seed service** runs a script to automatically initialize the database with sample data, making development and testing more efficient.
   - This file allows developers to have a convenient environment for debugging and managing data.
2. **`docker-compose.prod.yml` (Production Environment)**:
   - **Does not include Mongo Express** or the seed service to enhance security and prevent accidental re-initialization of data in production.
   - Focuses only on essential services—**Movies API, MongoDB, and Redis**—ensuring a lightweight and secure setup.
These separate configurations help ensure that developers have the tools they need during development, while production remains streamlined, stable, and secure.

### Development Environment:
```sh
docker-compose -f docker-compose.dev.yml up --build
```
This starts Mongo Express and automatically initializes the database, making it convenient for debugging and development.

### Production Environment:
```sh
docker-compose -f docker-compose.prod.yml up --build
```
This version does not include Mongo Express and does not perform database initialization, ensuring security and stability in the production environment.

By using this approach, different environments have clear configuration distinctions, providing convenience during development while maintaining security and performance in production.

## Redis Caching and Rate Limiting Tests

1. **Cache test**.
   - Send the same request multiple times, the first time will fetch the data from MongoDB and subsequent requests will fetch it from the Redis cache.
2. **Rate Limit Test**: If the ‘Get All Movies’ request is too large, it will get the data from MongoDB the first time.
   - Redis will rate-limit the ‘get all movies’ requests if they are too frequent. Try sending multiple requests to see if rate limiting is in effect.

## Container Isolation

Each service runs in its own container, ensuring isolated environments that prevent conflicts between dependencies and configurations across services.

## Conclusion

This project provides a modular, containerised film information API that utilises Docker to achieve isolation and flexible deployment between components, and provides two environment configurations for development and production.
