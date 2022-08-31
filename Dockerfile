FROM node:16.7.0
ENV SECRET=${SECRET}
ENV SYSTEM_PORT=3000
WORKDIR /app
COPY ["package.json", "."]
RUN npm install --production
COPY . .
CMD ["node", "src/index.js"]