FROM node:argon

# Bundle app source
RUN mkdir -p /srv/www/store_server
WORKDIR /srv/www/store_server
COPY src/ .
