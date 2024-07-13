# Z-Store E-Commerce Site

Welcome to Z-Store, an e-commerce platform implemented using the Fakestore API. This README file provides an overview of the project, the tools and libraries used, its features, and instructions on how to run it locally.

## Demo Link

https://e-commerce-app-fawn-alpha.vercel.app/

## Tools and Libraries

The following tools and libraries were used to build Z-Store:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **React Router DOM**: A library for routing in React applications.
- **react-hook-form**: A library for managing form state and validation in React.
- **Jest**: Unit testing.

## Features

Z-Store comes with a variety of features designed to provide a smooth and engaging shopping experience:

- **Login and Authorization**: Secure login functionality with token-based authorization.
- **Home Page with Popular Products**: Displays a selection of popular products.
- **Search**: Search your products from anywhere in the page.
- **Categorized Product Page**: View products categorized by type.
- **Filter and Sort Functionality**: Filter products by price, rating, and reviews; sort by name, price, rating, and reviews in both ascending and descending order.
- **Add/Delete Items to Cart**: Manage items in your shopping cart.
- **Cart Page**: View and manage items in your cart.
- **Checkout Page**: Complete your order by entering personal and shipping details.

## Future Works

- **Add more tests**
- **Implement actual infinite pagination**: Currently fakestoreapi does not support pagination based queries.
- **Implement payment**

## How to Run Locally

Follow these steps to run Z-Store on your local machine:

1. **Clone the project**:
   ```sh
   git clone https://github.com/Zishan3165/e-commerce-app.git
   ```
2. **Navigate to the project directory:**:
   ```sh
   cd e-commerce-app
   ```
3. **Install Dependencies:**:
   ```sh
   npm install
   ```
4. **Run the development server:**:
   ```sh
   npm run dev
   ```
5. **Open your browser and navigate to:**:
   ```sh
   http://localhost:5173
   ```
6. **For running tests:**:
   ```sh
   npm run test
   ```
