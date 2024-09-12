# YourAPI

Build and Test your API locally without having to signup.

YourAPI is a simple and flexible API platform designed for quick data management and testing. It allows developers to easily add data to a local PostgreSQL database and explore various API routes for content retrieval.

## Key Features

- **Add Content to Your Local Database**: Use an intuitive form to insert content into your PostgreSQL database.
- **API Endpoints for Data Retrieval**: Access various routes to fetch all data, retrieve random items, or search for specific content.
- **Designed for Testing**: Ideal for developers wanting to test API interactions with a local database.

## Getting Started

To get started with YourAPI, follow these steps:

### 1. Set up Database (Postgres)

- **Instal Postgress Latest version (window/mac/Linux)** : <https://www.postgresql.org/download/windows/>
- **Instal pgAdmin or othe managment tool for pg** : <https://www.postgresql.org/download/windows/>
- Connect to your db locally
- Create a TABLE and name your rows accordingly

### 2. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository_url>
cd <repository_directory>
npm install
```

- Set up a PostgreSQL database and add your connection string in a .env file as:

```bash
DATABASE_URL=postgres://username:password@localhost:5432/databaseName
```

- Start the server

```bash
node index.js
```

- YourAPI will now be running on localhost:300

### 3. Add data/ Submit form

- You can easily add new content to your local database using the form on the homepage. Just fill in thefields (title, rating,
  and image URL) / You can have different label that has different
  values, and hit "POST."
- Open pgAdmin4 go to your db open schema/tabels and check if the data has been added.

### 4. Explore API routes

- YourAPI offers several useful routes to manage and retrieve
  data:

- GET all data

```bash
GET /content
```

- GET random data

```bash
 GET /content/random
```

- Search Data

```bash
GET /content/search?q=searchTerm

```

- All the data returned are in JSON format
- The application displays clear success and error messages for content addition. Green alerts indicate success, while red alerts indicate errors. Use the close button to dismiss these alerts.

## Project Structure

- **Frontend**: HTML forms with Bootstrap styling for user interaction.
- **Backend**: Node.js and Express.js handling API routes and database communication, dotenv for securing credentials.
- **Database**: PostgreSQL for storing and retrieving content.

## Why use yourAPI

- YourAPI is perfect for developers who:

- Want to explore API development with a PostgreSQL backend.
- Need a quick way to populate and query data for testing.
- Seek a simple platform for experimenting with API routes and content management.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Feel free to modify and extend this README to better fit your project's needs!

Just replace `<repository_url>` and `<repository_directory>` with your actual repository URL and directory name. If you have any additional sections or details you want to include, you can adjust this template accordingly.
