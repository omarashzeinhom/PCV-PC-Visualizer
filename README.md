
# PC Builder Project

This project is a full-stack application with an Ionic frontend and a TypeScript backend. The frontend allows users to visualize and build their own custom PCs, while the backend handles storing and retrieving PC builds for users.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or later)
- [Ionic CLI](https://ionicframework.com/docs/cli) (for the client)
- [TypeScript](https://www.typescriptlang.org/) (for the backend)
- [ts-node](https://www.npmjs.com/package/ts-node) (to run TypeScript directly in Node)

### 1. Client Setup (Frontend - Ionic)

The client is an Ionic application built using TypeScript. It follows the MVC architecture:

1. **Model**: Defines the data structure (e.g., PC build components).
2. **View**: The user interface built with Ionic, including pages and components.
3. **Controller**: Handles user interactions, makes API calls to the backend, and updates the view.

To get started with the client:

1. Navigate to the `client` directory:

    ```bash
    cd ./client
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the Ionic development server:

    ```bash
    ionic serve
    ```

   This will start the frontend application on [http://localhost:8100](http://localhost:8100). You can access the app in your browser to begin working with the PC Builder interface.

### 2. Backend Setup (Server - TypeScript with Express)

The backend is built using TypeScript and Express.js, following the MVC architecture:

1. **Model**: Defines the data structure (e.g., Mongoose models for users and builds).
2. **View**: Typically, no views are used in a REST API, but this can be customized.
3. **Controller**: Manages the business logic, such as handling requests to create and retrieve builds.

To set up and run the backend:

1. Navigate to the `backend` directory:

    ```bash
    cd ./backend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the backend using `ts-node` to start the server:

    ```bash
    npx ts-node src/app.ts
    ```

   The backend will start running on the port specified in the `app.ts` file (typically `http://localhost:3000` or similar).

### 3. Running Both Client and Backend

To run both the client and backend concurrently:

- Open one terminal window to run the frontend (Ionic):

    ```bash
    cd ./client
    ionic serve
    ```

- In another terminal window, run the backend:

    ```bash
    cd ./backend
    npx ts-node src/app.ts
    ```

Ensure both servers are running concurrently and communicate with each other as needed. You can now visit the client in your browser and interact with the PC Builder, while the backend will handle requests and store data.

## Project Features

- **Client (Frontend)**:
  - Built with Ionic for a mobile-friendly interface.
  - MVC structure with Models (data structures), Views (UI), and Controllers (business logic).
  
- **Backend**:
  - Built with Express.js and TypeScript to handle user builds and data storage.
  - MVC structure with Models (Mongoose schemas), Controllers (API logic), and optional Views (for rendering).
  
- **PC Build Creation**: Users can create and store custom PC builds.
- **User Builds**: Each user can have multiple builds stored in the backend.

## Folder Structure Breakdown

### Frontend (`/client`)

- **`models/`**: Data structures and services that define the properties of PC builds, components, etc.
- **`views/`**: The UI components and pages built using Ionic.
- **`controllers/`**: The logic behind handling user interactions and API requests.

### Backend (`/backend`)

- **`models/`**: Mongoose models that represent the structure of the data in the database (e.g., User, Build).
- **`controllers/`**: Handles the logic for managing users and their builds.
- **`views/`**: (Optional) Used for rendering views or HTML responses in some cases.
- **`routes/`**: Defines the routes for the API.
- **`services/`**: Contains logic for things like email notifications or background processing.

## Troubleshooting

- If you encounter issues with `ts-node`, make sure your TypeScript configuration (`tsconfig.json`) is correctly set up.
- If you experience problems with `ionic serve`, try clearing the Ionic cache:

    ```bash
    ionic cache clear
    ```

## License

This project is open-source and available under the [MIT License](LICENSE).
