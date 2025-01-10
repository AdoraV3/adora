# Use the latest LTS version of Node.js (with Alpine for a smaller image)
FROM node:lts-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if using pnpm)
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --prod

# Copy the rest of the application code
COPY . .

# Specify the command to run your app
CMD ["pnpm", "start"]

# Expose the port your app will run on
EXPOSE 3000
