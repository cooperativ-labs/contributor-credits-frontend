FROM node:14-alpine
WORKDIR /app

COPY package.json yarn.lock ./

RUN apk --no-cache --virtual build-dependencies add \
        git \
        python2 \
        make \
        g++
RUN yarn install --frozen-lockfile


EXPOSE 3000

CMD ["yarn", "dev"]
