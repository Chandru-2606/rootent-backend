# Node.js MVC Backend

A Node.js backend application built with MVC (Model-View-Controller) architecture.

## Features

- Express.js framework
- MongoDB with Mongoose
- MVC architecture
- Environment configuration
- Error handling
- Security middleware (Helmet, CORS)
- Logging (Morgan)

## Project Structure

```
src/
├── controllers/     # Business logic
├── models/         # Database models
├── routes/         # API routes
└── app.js          # Application entry point
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nodejs-mvc
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## API Endpoints

### Users
- POST /api/users - Create a new user
- GET /api/users - Get all users
- GET /api/users/:id - Get a specific user

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request "# rootent-backend" 
