FROM node:latest

## Where images will be stored
RUN mkdir -p /uploads

## Copy project and install its dependency directly in the docker
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000

## /wait for MongoDB to start, preventing connection issues
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start