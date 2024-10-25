# Registration Page

This project provides a simple and user-friendly registration page where users can sign up and login securely. User input validation and secure session management are handled, with Access and Refresh tokens used for secure session management.

## Requirements
- **Node.js** (version>12)
- **npm** or **yarn**

## Features
- Register with username, email, and password
- Login with email and password
- Input validation (e.g., email format check) with React Formik
- Trace your network activity if network offline, you cannot post login or signup form 
- Secure session management with Access and Refresh tokens with JWT
- Error messages for invalid inputs
- Redirect to the user upon successful registration
- Delete related tokens after Logout

## Access and Refresh Token Overview

**Access Token** and **Refresh Token** are security mechanisms to manage user sessions after login.

- **Access Token**: A short-lived token issued upon user authentication, allowing access to protected pages. This token typically expires in a short timeframe (usually between 15 minutes and 1 hour, in this app 30sec.).
  
- **Refresh Token**: A longer-lived token that allows the user to request a new Access Token without re-authenticating. When the Access Token expires, the Refresh Token can be used to obtain a new Access Token.

### Usage Scenario

1. After login, the server issues both an Access Token and a Refresh Token to the user.
2. The **Access Token** enables the user to access protected pages in the app.
3. When the Access Token expires, the user can use the **Refresh Token** to request a new Access Token.
4. If the Refresh Token also expires, the user must log in again to receive new tokens.

## Installation

1. Clone this repository:

   ```bash
   git clone (https://github.com/burakcanbz/registration-page.git)

2. Navigate to the API directory and install dependencies:
 
    ```
    cd api/
    npm install
    ```

3. Navigate to the client directory and install dependencies:
  
   ```
    cd client/
    npm install
    ```

## Usage

  ```
  cd api/ 
  npm start 
  cd client/
  npm start
  ```

***Note: To run API properly it needs MongoDB Configuration.***

## MongoDB Configuration

To connect to MongoDB database, you'll need to specify your MongoDB URI and password in your environment variables or configuration file.

- **MongoDB URI**: `mongodb://<username>:<password>@<host>:<port>/<database>`
- **Password**: Make sure to replace `<password>` with your actual MongoDB password.

### Example URI

```plaintext
mongodb://myUser:myPassword@localhost:27017/myDatabase
