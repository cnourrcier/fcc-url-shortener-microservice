# URL Shortener Microservice

This project is a microservice built as part of the freeCodeCamp Back End Development and APIs Certification. It provides a simple URL shortening service where users can submit a URL and receive a shortened version of it.

## Installation

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.

## Usage

1. Start the server by running `node index.js` or `npm start`.
2. Access the application through a web browser or tools such as Thunder Client or Hoppscotch.io.
3. Navigate to the homepage (`/`) to access the HTML form for submitting URLs.
4. Enter a URL in the provided input field and submit the form.
5. The URL will first be checked for validation. If invalid, an Invalid URL response will be given. 
5. The server will generate a shortened URL and display it to the user.
6. Users can use the shortened URL to redirect to the original URL.

## Endpoints

- `GET /`: Serves the HTML form for submitting URLs.
- `POST /api/shorturl`: Accepts POST requests with a URL in the request body, checks for validation, generates a shortened URL, stores it in the database, and returns JSON data containing the original and shortened URLs.
- `GET /api/shorturl/:shorturl`: Redirects users to the original URL associated with the provided shortened URL.

## Dependencies

- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `express`: Web framework for Node.js.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- `mongodb`: MongoDB client library for Node.js.
- `dns`: Library for DNS resolution.

## Configuration

- The server listens on the port specified by the `PORT` environment variable, defaulting to port `3000` if not specified.
- MongoDB connection string should be provided in the `.env` file using the `CONN_STR` variable.

## Credits

This project is part of the Back End Development and APIs Certification from [freeCodeCamp](https://www.freecodecamp.org/).

## License

This project is licensed under the [BSD 3-Clause License](LICENSE).
