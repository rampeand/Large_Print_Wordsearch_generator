# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application from a lightweight server
FROM nginx:stable-alpine AS final
WORKDIR /usr/share/nginx/html

# Remove default Nginx page
RUN rm -rf ./*

# Copy built assets from the 'builder' stage
COPY --from=builder /app/dist .

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
