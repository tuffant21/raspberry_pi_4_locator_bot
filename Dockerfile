# docker build -t alert --platform linux/arm64/v8 .
FROM node:18.16-alpine as install
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    tzdata

FROM install as build
WORKDIR alert
COPY package.json .
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
RUN npm install

FROM build as src
# set timezone
ENV TZ=America/Denver
COPY app.js .

FROM src as final
EXPOSE 8080
CMD ["node", "app.js"]
