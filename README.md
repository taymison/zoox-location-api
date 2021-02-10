<h1 align="center">
  Zoox Location API
</h1>

<p align="center">Unofficial Zoox REST API for registering and editing states and cities</p>

## Description

REST API developed in NESTJS and using MongoDB as a database for the Zoox Smart Data admission test.

This API has JSON data input and output, validations, error and exception handling, response cache, documentation and key protection.

## Features: Caching

The responses of all GET requests are cached with an in-memory cache strategy.

The TTL of the cache is 5s and after that time, it is invalidated and replaced by the result of the next request.

Redis could have been used to store the application cache, but as it is small and will not have many resources saved, it was not necessary.

However, replacing the in-memory strategy with the use of Redis would not be a very difficult task thanks to the use of NestJS.

## Features: Documentation

All routes and their parameters are documented in the OpenAPI (Swagger) format.

When accessing `http://localhost:3000/api` it is possible to read all the documentation and test the routes with different parameters through the Swagger UI.

Note: before executing the first execution, it is necessary to insert the X-Api-Key by clicking on the "Authorize" button. And between each request of the same route, it is necessary to click on the "Clean" button to clear the result, otherwise Swagger UI will repeat the result of the previous route.


## Features: Configuration

The application is configured through an .env file. Here is an example of the required keys:

```
API_KEY=

DB_STRING_CONN=

ENV=
```

The ENV key can be defined as dev or prod, if it is defined as dev, the security settings will be disabled and the API will accept requests from hosts without https.

Always use `dev` in a development environment.

The API_KEY key defines the value of the required X-Api-Key in the header of all requests.

The DB_STRING_CONN key defines the connection string to MongoDB. If you would like to use my database, please contact me.

## Features: Testing

The application uses as a test framework, the Jest library and some unit tests were created to exemplify its operation.

## Features: Security

To increase the security of the application, the use of a mandatory X-Api-Key in the header of each request was implemented.

This key is defined in the .env file.

## Requirements

* Node >= 10.13.0
* [NestJS CLI](https://docs.nestjs.com/cli/overview)

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Accessing the docs

After starting the application, access the documentation in your browser: `http://localhost:3000/api`

## Testing

```bash
$ npm run test
```
