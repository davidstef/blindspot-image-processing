# Use node image
FROM node:18

# Set working directory in container
WORKDIR /usr/src/app

# Copy necessary packages and dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project in current container directory
COPY . .

# Export server port
EXPOSE 4123

# Command to run the server
CMD ["npm", "start"]
