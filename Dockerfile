FROM node:14-alpine3.11 AS build-stage

WORKDIR /react-app
COPY client/. .
ENV REACT_APP_BASE_URL=https://simple-decks.julietshafto.com
RUN npm install
RUN npm run build



FROM node:14-alpine3.11

ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_ENV=production
ENV NODE_MODULES_CACHE=true
ENV NODE_VERBOSE=false

ENV PORT=8000
EXPOSE 8000


WORKDIR /var/www
COPY . .
RUN npm install --production
COPY --from=build-stage /react-app/build/* client/build/
RUN mkdir client/build/static && \
    cp -r client/build/js client/build/static/js && \
    cp -r client/build/css client/build/static/css
CMD ["npm", "start"]
