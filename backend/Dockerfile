# Use an official Node.js runtime as a parent image
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port on which your Nest.js application will run
EXPOSE 5000

# Command to start the Nest.js application
CMD ["npm", "run", "start:dev"]
