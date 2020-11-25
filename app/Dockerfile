FROM node:15-alpine

# Using node user (created by alpine distro)
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

# Run commands as node user
USER node

RUN npm install && npm cache clean --force --loglevel=error
COPY --chown=node:node . .

CMD [ "npm", "start" ]