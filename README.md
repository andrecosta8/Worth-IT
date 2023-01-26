# Worth IT?

![GitHub Dependencies](https://img.shields.io/badge/axios-1.2.1-blue) ![GitHub Dependencies](https://img.shields.io/badge/json--server-0.17.1-red) ![GitHub Dependencies](https://img.shields.io/badge/swiper-8.4.6-green) ![GitHub Dependencies](https://img.shields.io/badge/%40mui-5.11.0-green)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About 

This application was build as a final project regarding Tech Academy from New Work.

Worth IT? is a application that allow the developers or tech lovers to comment dev products and give this opinion about. As Admin you can manage all the aplication content (users, products and comments). 

## Available Scripts

### First Step:

To install all depencies that you will need to run the application:

### `npm install`


In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Opens [http://localhost:3000](http://localhost:3000) to view it in your browser.

Also opens a json server [http://localhost:5000](http://localhost:5000) to serve data to this application.

### `npm run cy:open`

Runs intregations tests with cypress.

## Application:

### Routes:
 
 - User:

    * Homepage - "/"
    * Register - "/register"
    * Login - "/login"
    * Profile - "/profile"
    * Products - "/products"
    * Product Detail - "/productdetail"
    * 404 Page - "*"

- Admin:

    * Admin Homepage - "/admin"
    * Admin Products Management - "/admin/products"
    * Admin Users Management - "/admin/users"
    * Admin Comments Management - "admin/comments"

### Components:

- Alert.jsx
- BasicRating.jsx
- CommentBox.jsx
- CommentCard.jsx
- Footer.jsx
- Header.jsx
- PasswordForm.jsx
- ProductCard.jsx
- ProductForm.jsx
- ShowProducts.jsx

### Services:

- apiCalls.js
    * axios api calls setup

- utils.js
    * util functions

- validate.js
    * input validations and regex

### Back-end and Database:

- db.json
- json-server.json



    

