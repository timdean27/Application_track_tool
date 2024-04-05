# Use Node.js as the base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript React project
RUN npm run build

# Use Nginx as the base image for serving the built files
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
