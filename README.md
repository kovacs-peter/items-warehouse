# Interview Homework

## Description
A warehouse application that allows users to manage products, and create shipments from the items.

## Technologies
### Backend
The app is built as an `experessJS` app (as it was already scaffolded). 
The database for the assigment is a simple sqlite database, to keep things simple.

### Frontend
The frontend is an `Angular` application with simple custom styling. 
It uses `ngrx` for state management.

Code style is managed with ESlint with Prettier config.

## Getting Started
### Pre-requisites
- the project uses `nvm` for [node version management](https://github.com/nvm-sh/nvm)

### Installation
1. run 
    ```bash 
      nvm use
    ```
    to use the correct node version
2. run `npm install` to install dependencies in both `frontend` and `backend` folders
    ```bash
      cd frontend
      npm install
    ```
    ```bash
      cd ../backend
      npm install
    ```
3. in the `backend` folder, run
    ```bash
      npm run init:db
    ```
    to initialize the database
4. run `npm start` in `backend` and `fronend` folders

### Running tests
- run `npm test` in `backend` folder to run backend tests
- run `npm test` in `frontend` folder to run frontend tests


---
Congratulations on making it through our awesome Talent Acquisition Team! You seem like a great candidate to join our team. Before the next round of interviews, we’d like to see some of your coding skills in action.

## Backend

The `backend/` folder contains the generated structure of an Express application, along with instructions for the functional requirements inside its [README](./backend/README.md). Please showcase your skills by developing a REST API for a Warehouse application.

## Frontend

The `frontend/` folder contains the generated structure of an Angular application, along with instructions for the functional requirements inside its [README](./frontend/README.md). Please showcase your skills by developing a client-facing application for the Warehouse.

## Fullstack

If you applied for a fullstack position, complete the assessment tasks for listing, adding, editing, and removing products in both the backend and frontend.

In the end, we should be able to test the implemented functionality of the backend through the frontend. This means you should start both the backend and frontend locally and use the Warehouse application to ensure everything works seamlessly.

## Criteria

To be clear about what we’re looking for, , by sharing criterias, we are trying to help you prioritize your focus on what matters most for us.

We will evaluate your work based on the following criteria:

- **Code design and architecture** - Is the architecture of application clear? Does it use patterns that helps with maintainability and scalability?
- **Code quality**: Is the code clean, well-structured, and easy to understand?
- **Functionality**: Does the application work as expected?
- **Performance**: Does the application run effiecently?
- **Testing**: Are there unit and integration tests? Do they test the functionality?
- **Documentation**: Are we able to run project following instructions in README? Is the code documented?

If time prioritization is necessary, criteria should not be sacrificed; rather, completeness should be.

Good luck, and we look forward to seeing your work!
