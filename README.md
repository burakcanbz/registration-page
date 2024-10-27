# MERN Stack Registration Page

## Description

This project is developed using the MERN (MongoDB, Express.js, React, Node.js) stack for user registration. The application allows users to register and implements Access and Refresh Token mechanisms for secure user login and session management.

## Getting Started

You can find the steps needed to run your project in this section.

### Requirements

- Node.js
- MongoDB
- NPM
- Axios (for making requests)

### Installation

1. **Clone this repository:**
   ```bash
   git clone https://github.com/burakcanz/registration-page.git

### Usage

## Navigate to the Project Directory:

```bash
cd repo-name

cd api
npm install

cd client
npm install
```

## Set Up Your MongoDB Connection Information:
- MONGODB_URI=mongodb+srv://<username>:<password>.@mern.1bues.mongodb.net/Registration?retryWrites=true&w=majority&appName=MERN
- JWT_ACCESS_SECRET=<your_access_token_secret>
- JWT_REFRESH_SECRET=<your_refresh_token_secret>

### Start the Backend:
```
   cd api
   npm start
```

### Start the Frontend
```
   cd client
   npm start
```

## Usage
Follow these steps for user registration:

1. Click the "Login" button on the homepage.
2. If you have no account, click Signup link and register 
3. After registering, you will redirect to login page
4. After successfully logging in, you will get access token and redirected to user page.
5. After redirection to user page, you will get refresh tokens.


### Access and Refresh Token Logic
- Access Token: Used to authenticate the user's identity. Typically has a short validity period.
- Refresh Token: Used to obtain a new access token when the access token expires. Usually has a longer validity period.

### API Endpoints
- Registration: /register/signup (POST)
- Login: /register/login (POST)
- Dummy User Page: /register/user (GET)
