FROM node:20-alpine
WORKDIR /app

# Install Yarn 4.x to match local environment
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY package.json yarn.lock ./

RUN apk --no-cache --virtual build-dependencies add \
        git \
        python3 \
        make \
        g++ \
        libc-dev \
        linux-headers
RUN yarn install --immutable


EXPOSE 3000

CMD ["yarn", "dev"]
