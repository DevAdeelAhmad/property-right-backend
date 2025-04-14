# PropertyRight Backend

A NestJS backend application for the PropertyRight real estate platform.

## Description

This project is built with NestJS and provides a RESTful API for property management. The backend connects to a PostgreSQL database.

## Features

- Property management (create property)
- Health check endpoint
- Standardized API responses
- Swagger API documentation
- Docker support

## Installation

```bash
$ npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgres://neondb_owner:npg_A7d1ascWixJl@ep-icy-math-a1cy007o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-icy-math-a1cy007o-pooler.ap-southeast-1.aws.neon.tech
POSTGRES_PASSWORD=npg_A7d1ascWixJl
POSTGRES_DATABASE=neondb
PORT=3001
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

The application can be run in a Docker container:

```bash
# Build Docker image
$ npm run docker:build

# Run Docker container
$ npm run docker:run

# Use Docker Compose
$ npm run docker:up

# Stop Docker Compose
$ npm run docker:down
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### Properties

- `POST /api/properties` - Create a new property
  - Request body: `{ propertyName: string }`

### Health

- `GET /api/health` - Health check endpoint

## Documentation

Access the Swagger API documentation at [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

## Example API Usage

```typescript
// Creating a property
fetch('http://localhost:3001/api/properties', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ propertyName: "Oceanview Villa" }),
});
```

## License

This project is [MIT licensed](LICENSE).
