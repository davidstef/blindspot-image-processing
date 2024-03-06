# blindspot-image-processing

## Setup Steps:

1). Make sure you have the project source code on your local machine or clone it from the Git repository: `git clone`

2). Use npm to install all project dependencies: `npm install`

3). Config Redis Container:

 - Run: `docker pull redis`;
 - Run: `docker run --name redis-1 -p 6379:6379 -d redis`;

4). Start the server: `npm start`



## Interaction with the Service:


### Endpoint for Image Resizing: GET `/image/:name`

The image resizing endpoint accepts an image name and, optionally, a resolution specified by the query resolution parameter. E.g:

Display resized image with specified resolution:

**Example:** `http://localhost:4123/image/toa.jpg?resolution=300x300`

______

### Endpoint for Image Resizing: GET `/statistics`

- `totalOriginalImages` (integer): Total number of original images existing in the specified directory.

- `resizedImagesCount` (integer): Total number of successfully resized images.

- `cacheHits` (integer): Number of successful cache hits.

- `cacheMisses` (integer): Number of cache misses.

**Example:** `http://localhost:4123/upload-image`

## Testing:

Go inside the `tests` directory and use command: `npm test`


# Docker Configs

## 1. Building the Docker Image
Open the terminal in the project directory and run the command to build the Docker image using the Dockerfile:

`docker-compose build`
Wait until the build is complete.

## 2. Starting the Services
Run the command to start the containers:

`docker-compose up`
Your application will now be accessible at `http://localhost:4123`.

## 3. Shutdown and Cleanup
To stop the services, use the Ctrl + C key combination in the terminal. To clean up junk containers and images, run:

`docker-compose down`

