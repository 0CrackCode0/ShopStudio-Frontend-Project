# E-Commerce Web App (React.js)

A simple E-Commerce application built with React.js that allows users to browse products, manage their cart, authenticate accounts, and complete the checkout process. The project uses Redux for state management and JSON Server as a mock backend.

## Features

* Product listing and search
* Add to Cart and Remove from Cart
* User authentication (Login and Signup)
* Checkout functionality
* State management with Redux
* Responsive user interface
* Mock backend using JSON Server

## Tech Stack

* React.js
* Redux
* React Router
* JSON Server
* CSS / Tailwind CSS / Bootstrap

## Installation

### Install Dependencies

```bash
npm install
```

### Run Frontend

```bash
cd ecom
npm run dev
```

### Run Backend

```bash
cd server
json-server --watch server.json --port 8000
```

## Local Development

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:8000`

## Notes

* Product and user data are stored in `server/server.json`.
* JSON Server is used as a mock API for development purposes.

## Future Improvements

* Payment gateway integration
* Backend with Node.js and a database
* Order management and tracking
* Product reviews and ratings

## License

This project is open-source and available under the MIT License.

## Author
Abdul Ahad
0ab.ahad0@gmail.com
