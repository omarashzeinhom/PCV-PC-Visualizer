# PC Builder API

A Node.js server for managing user authentication and saving PC builds, integrated with Cloudinary for image handling and background removal.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
- [To Do](#to-do)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (registration and login).
- Save and manage user information and PC builds.
- Upload images of PC components.
- Automatic background removal from images using Cloudinary.
- Import PC part lists from PCPartPicker in JSON format.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and PC builds.
- **Mongoose**: ODM library for MongoDB.
- **Bcrypt**: Library for hashing passwords.
- **JsonWebToken (JWT)**: For secure token-based authentication.
- **Cloudinary**: For image uploads and background removal.
- **TypeScript**: For adding static typing to JavaScript.

## Getting Started

To get started with the PC Builder API, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/pc-builder-api.git
   cd pc-builder-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   Create a `.env` file in the root of the project and add your MongoDB connection string and JWT secret:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run the Server**:
   Use the following command to start the server:

   ```bash
   npx ts-node src/app.ts
   ```

## API Endpoints

### Authentication

- **POST** `/api/auth/register`
  - Register a new user.
  - **Request Body**:

    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```

  - **Response**:
    - 201 Created on success.
    - 400 Bad Request on validation failure.

- **POST** `/api/auth/login`
  - Log in a user and receive a JWT token.
  - **Request Body**:

    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```

  - **Response**:
    - 200 OK with JWT token on success.
    - 401 Unauthorized on invalid credentials.

### To Do

- **Image Upload**:
  - Implement an endpoint for users to upload images of PC components.
  
- **Background Removal**:
  - Integrate Cloudinary to automatically remove backgrounds from uploaded images. This can be done during the upload or based on a selection made by the user.

- **User Info and PC Builds**:
  - Create routes to save and retrieve user info and PC builds.
  
- **Import JSON from PCPartPicker**:
  - Develop a feature to allow users to import a list of PC parts from PCPartPicker in JSON format.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
