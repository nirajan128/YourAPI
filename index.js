import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config(); //setting up dotenv package

const app = express(); //setting up express
const port = 3000; //port number

//MiddleWare
app.use(bodyParser.urlencoded({ extended: true })); //parses form data

const db = new pg.Client({
  //setting up postgres db
  connectionString: process.env.DATABASE_URL, //Use environment variable for DB connection
});

// Connect to the database
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Error connecting to PostgreSQL", err.stack));

//Rendering HomePage
app.get("/", (req, res) => {
  res.render("index.ejs", {
    message: "",
  });
});

//adding content to database
app.post("/addContent", async (req, res) => {
  const { title, rating, imgURL } = req.body;
  try {
    const dbQuery = `INSERT INTO animeList (title, rating, image) VALUES ($1, $2, $3)`;
    await db.query(dbQuery, [title, rating, imgURL]);
    res.render("index.ejs", {
      message: "Content successfully added",
    });
  } catch (error) {
    res.render("index.ejs", {
      message: "Content upload Failed",
    });
    console.log(error);
  }
});

//API routes - JSON responses

//Get all data in db
app.get("/content", async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM animeList");
    const allData = data.rows;
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Gets random data in db
app.get("/content/random", async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM animeList");
    const allData = data.rows;
    let randomIndex = Math.floor(Math.random() * allData.length);
    res.json(allData[randomIndex]);
  } catch (error) {
    console.error("Error searching anime", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Search for data usin Query param, appended to URL as key-value pairs
app.get("/content/search", async (req, res) => {
  try {
    const searchTerm = req.query.q; //q is the query(key) which stores the search value

    //returns an error if search term is not provided
    if (!searchTerm) {
      res.status(400).json({ error: "Search term is required" });
    }

    // Query to search for anime titles using ILIKE (case-insensitive)
    const data = await db.query(
      `SELECT * FROM animeList WHERE title ILIKE $1`,
      [`%${searchTerm}%`]
    );
    const searchResult = data.rows;

    //if no data is found return error
    if (searchResult.length === 0) {
      res.status(404).json({ error: `No data found with query ${searchTerm}` });
    }

    //else returns the search result
    res.json(searchResult);
  } catch (error) {
    res.status(500).json({ error: "Search term is required" });
  }
});

//setting up server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
