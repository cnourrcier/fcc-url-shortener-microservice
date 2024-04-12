# URL Shortener Microservice

This is my URL Shortener Microservice Project for freecodecamp.org. I used the provided [boilerplate](https://github.com/freeCodeCamp/boilerplate-project-urlshortener/) to complete this challenge. The test requirements can be found [here](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/cnourrcier/fcc-url-shortener-microservice.git
```

2. Install dependencies:

```bash
cd fcc-url-shortener-microservice
npm install
```

## Usage

1. Start the server:

```bash
npm run dev
```

## API Endpoints

|   Endpoint    |  Description  |
| ------------- | ------------- |
| POST /api/shorturl | Retrieve given url from req.body and send a jason object with original url and short url |
| GET /api/shorturl/:shorturl  | Retrieve shorturl param and redirect to original url  |

## License

This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details. 

