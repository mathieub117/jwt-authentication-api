# node-jwt-authentication-api

NodeJS JWT Authentication API
Based from https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport 

Check here to find the image: https://hub.docker.com/r/c5dczjq8fyibummbmjzs/jwt-authentication-api-server

## Run Locally
It Uses the official node:latest and mongo:latest to create an image with 2 containers

```cd ./login_server```

```docker-compose pull```

```docker-compose up```

## Add .env file
You will need to add an .env file that contains the following:
```
MONGO_URL=mongodb://mongodb:27017/data
SCHEME=http://
PORT=3000
CLIENT_DOMAIN=ec2-3-138-156-152.us-east-2.compute.amazonaws.com
MAIL_NAME=.
MAIL_PASSWORD=.
```
Replace domain and mail values accordingly

## Setup with Amazon Web Services
In the project repository, build/push Docker Image 

```docker-compose build```
 
 ```docker-compose push```

Create a new EC2 instance, with port 22 and 3000 allowing everything

connect to EC2 instance: ```ssh -i jwt-authetication-token-keypair.pem ec2-user@ec2-3-138-156-152.us-east-2.compute.amazonaws.com```

Follow this to install docker compose: https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9

copy docker-compose.yml from local to EC2: scp -i /directory/to/abc.pem /your/local/file/to/copy user@ec2-xx-xx-xxx-xxx.compute-1.amazonaws.com:path/to/file
Example: ```scp -i jwt-authetication-token-keypair.pem C:\Users\Mathieu\Documents\GitHub\jwt-authentication-api\docker-compose.yml ec2-user@ec2-3-138-156-152.us-east-2.compute.amazonaws.com:~/```

Dans Instance EC2: 

```docker-compose pull```

 ```docker-compose up```

Enable gmail send: https://accounts.google.com/b/1/DisplayUnlockCaptcha

Change .env file for the EC2 URL

### Delete data (mongoDB volume)

```sudo rm -rf data```

### Delete unused docker image

```docker image prune --filter="dangling=true"```

## Test routes with curl (Use Git bash / Cygwin on windows) Or Postman
Postman: https://web.postman.co/workspace/My-Workspace~ac8e39e3-5926-41b8-862e-fded6304a8cb/request/15214720-94d82b69-41b2-4ae3-99ac-1d98d1d3657e

### Signup
```curl -g -X POST http://localhost:3000/user/signup -H 'Origin: http://localhost:5000' -H 'Content-Type: application/json' -d '{"email":"example@example.com", "password":"password"}'```

### Login
```curl -g -X POST http://localhost:3000/user/login -H "Content-Type: application/json" -d '{"email":"example@example.com", "password":"password"}'```

### Validate token (replace CLIENT_TOKEN with token value)
```curl -X GET http://localhost:3000/validate?secret_token=CLIENT_TOKEN```

### Upload avatar image to an already created user (can't really curl this...)
```curl --form 'email=example@example.com' --form 'file=@resource/kappa.jpg' http://localhost:3000/user/image```

### Fetch avatar image of a user
```curl -X GET http://localhost:3000/user/image?email=example@example.com```