# URL Shortner with NodeJS and MongoDB

This project is made using NodeJS and MongoDB.

## How it works
User enters a valid URL into the form. If the format is valid, the webpage will respond with a
JSON containing the original url and shortened url. If the URL is not valid or does not exist,
the api will respond with an error saying Invalid URL.

## How to use
* After cloning the repo:
```
- cd urlshortner-microservice
- npm install
```
* To protect database details, I used dotenv and a .env file. Please rename the .envExample to .env
and paste your database URI instead of the given example.

* Now run the server using ```npm start```

