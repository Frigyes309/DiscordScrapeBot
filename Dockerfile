# Use a newer Node.js runtime as a parent image
FROM node:20.3.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy files to the working directory
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY ./src ./src

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Setup volume for the app
#VOLUME /data

# Define the command to run the app
CMD ["npm", "start"]
