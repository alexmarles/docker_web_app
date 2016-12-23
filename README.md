# store_server
Example of a store server app build in Node.js on Docker.
This app serves API endpoints for Products and Users management.

## Usage
To build the needed containers and images:
```
docker-compose build
```
To run the app (it runs on port 3000 by default):
```
docker-compose up
```
If you want to get into the container's bash console just run:
```
docker-compose run --rm store_server /bin/bash
```
