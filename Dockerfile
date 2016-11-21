FROM node:argon

# Bundle app source
WORKDIR /app
COPY app/ .
