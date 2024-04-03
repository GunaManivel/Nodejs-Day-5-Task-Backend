## Introduction

This repository contains the code for the password reset flow task.

The code is written in React and Express, using Axios for making HTTP requests.

## Overview

The frontend of the portal is built with React and uses React Bootstrap for layout and styling. The main components of the frontend are:

- `User Login Component`: This is likely the component where users can log in to the application using their credentials. The component may include fields for the user's email and password, and a submit button to send the data to the server.
  
- `User Register Component`: This component is likely the one where new users can register to the application. The component may include fields for the user's email, name, password, and password confirmation, and a submit button to send the data to the server.
 
- `LoggedInPage`: This component is likely the one that is displayed after the user has successfully logged in. This component may contain the main functionality of your application, such as displaying the user's bookings, allowing the user to book new trips, or edit/delete existing bookings.

- `PasswordResetPage`: The password reset page, which contains the form for resetting the password.
  

The backend of the portal is built with Node.js and Express. The main endpoints of the backend are:

- `POST /users/password-reset`: Sends a password reset email to the user.
  
- `PUT /users/password-reset/:token`: Resets the user's password.
  
## Requirements

Node.js
npm

## Setup

1. Clone the repository.
2. Install the dependencies for the frontend and backend.
3. Set the required environment variables.
4. Start the API server.
5. Start the frontend server.

## Usage
Please refer to the context provided in the previous messages for the functions and methods used in this task.

## License

This project is licensed under the MIT License.



