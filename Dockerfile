FROM node:argon

# Bundle app source
WORKDIR /src
COPY src/ .
