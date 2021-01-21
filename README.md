# node-jwt-authentication-api

NodeJS JWT Authentication API
Based from https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport 

## Run with docker
It Uses the official node:latest and mongo:latest to create an image with 2 containers
```cd ./login_server```
```docker-compose up --build --remove-orphans```

## Test routes with curl (Use Git bash / Cygwin on windows)
### Signup
```curl -g -X POST http://localhost:3000/signup -H "Content-Type: application/json" -d '{"email":"example@example.com", "password":"password"}'```

### Login
```curl -g -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email":"example@example.com", "password":"password"}'```

### Validate token (replace CLIENT_TOKEN with token value)
```curl -X GET http://localhost:3000/validate?secret_token=CLIENT_TOKEN```