# our base image
FROM node:8.11.3-alpine

# define working directory for container (all commands after this are run inside of /src)
WORKDIR /src

# copy package files
ADD package*.json ./

# install dependencies & git (erros without git), then uninstall git
RUN apk add --no-cache --virtual .gyp \
  git \
  && npm i \
  && apk del .gyp

# copy over all other files
ADD . .

RUN npm run build

# hint port to dev **Does NOT actually open port from container to host
EXPOSE 3000

# starts server
CMD ["node", "/src/server/index.js"]