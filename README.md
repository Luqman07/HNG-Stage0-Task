# HNG-BE-Task0

A simple Node.js Express API for gender classification using the Genderize.io service.

## Description

This project is a backend API that classifies names by gender using an external API. It's built as part of the HNG Internship backend task.

## Features

- Gender classification for names
- Confidence scoring
- CORS enabled for cross-origin requests
- Environment variable configuration

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd HNG-BE-Task0
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Usage

The server will start on the port specified in your `.env` file (default: 3000).

### API Endpoints

#### GET /
Returns a simple "Hello World!" message.

#### GET /api/classify
Classifies a name by gender.

**Query Parameters:**
- `name` (string, required): The name to classify

**Response:**
```json
{
  "name": "John",
  "gender": "male",
  "probability": 0.99,
  "sample_size": 1500,
  "is_confident": true,
  "processed_at": "2023-10-01T12:00:00.000Z"
}
```

**Error Responses:**
- 400: Bad Request (missing or empty name)
- 422: Unprocessable Entity (name is not a string)
- 502: Bad Gateway (external API failure)

## Environment Variables

- `PORT`: The port on which the server runs (default: 3000)

## Dependencies

- Express: Web framework
- CORS: Cross-origin resource sharing
- Dotenv: Environment variable management
- Morgan: HTTP request logger
- Nodemon: Development auto-restart

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon
- `npm test`: Run tests (currently not implemented)

## License

ISC