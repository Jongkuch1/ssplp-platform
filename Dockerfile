FROM node:20-alpine

WORKDIR /app

# Copy root package files (for postinstall script)
COPY package*.json ./

# Install root dependencies (triggers postinstall which installs backend deps)
RUN npm ci --production

# Copy entire repo
COPY . .

# Expose port (Vercel/Docker will map this)
ENV PORT=3000
EXPOSE 3000

# Start the backend server
CMD ["node", "backend/server.js"]
