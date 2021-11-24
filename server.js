require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

//------------------------------MONGOOSE SETUP------------------------------
//creating mongoose Schema for stories
const StorySchema = new mongoose.Schema({
  relationalid: String,
  name: String,
  story: String,
  county: String,
  tag: Array,
});

//creating the initial connection to the database using url for mongoAtlas and .env secured password
mongoose.connect(
    "mongodb://localhost:27017/VT-Legal",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//initializing database using connection and storing in variable database
const database = mongoose.connection;

//setting up Stories model using the StorySchema and the collection
const Stories = mongoose.model("all-stories", StorySchema);

//binds error message to the connection variable to print if an error occurs with database connection
database.on("error", console.error.bind(console, "connection error"));

//-------------------------------ROUTES----------------------------------------
//---------CREATE-------------
app.post("/createnew", async (req, res) => {
  //NOTE: WILL NEED THE ADMIN PORTAL FORM TO HAVE EACH ONE OF THESE FIELDS, COULD BE TEXT BOX OR DROP DOWN FOR COUNTY
  //creation of a new story from admin portal
  const newStory = new Stories({
    relationalid: req.body.id,
    name: req.body.name,
    story: req.body.story,
    county: req.body.county,
    tag: req.body.tag,
  });

  //saving the new story
  await newStory.save();

  //res.redirect("back") -> would reload page
});

//---------READ---------------
//API endpoint for receiving all stories
app.get("/allstories", async (req, res) => {
  //setting up intermediate variable to store find result
  let allStories = await Stories.find({});
  //responding with a json of the find
  res.json(allStories);
});

//API endpoint to get the stories from a specific county
app.get("/allstories/:county", async (req, res) => {
  //setting up a intermediate variable for the county from the params
  let instanceCounty = req.params.county;

  //setting up variable to store res of .find with the instanceCounty being used as a filter
  let countyStories = await Stories.find({ county: instanceCounty });

  //sending messages for the specific county as json
  res.json(countyStories);
});

//API endpoint to get the stories from a specific tag
app.get("/allstories/:tags", async (req, res) => {
  //setting up an intermediate variable for the county from the params
  let instanceTags = req.params.tags;

  //setting up variable to store res of .find with the instanceTags being used as a filter
  let tagsStories = await Stories.find({ tag: instanceTags });

  //sending messages for the specific tags as json
  res.json(tagsStories);
});

//API endpoint to get the stories from a specific county and tag combination
app.get("/allstories/:county/:tags", async (req, res) => {
  //setting up an intermediate variable for the county from the params
  let instanceCounty = req.params.county;

  //setting up an intermediate variable for the tags from the params
  let instanceTags = req.params.tags;

  //setting up variable to store res of .find with the instanceTags being used as a filter
  let combinedStories = await Stories.find({
    county: instanceCounty,
    tag: instanceTags,
  });

  //sending messages for the specific tags as json
  res.json(combinedStories);
});

//-----------UPDATE-----------
//API endpoint to update a story
app.post("/update/:id", async (req, res) => {
  //grabbing the document id (mongo) received in params
  let storyId = req.params.id;

  //creating an empty object to hold any updated values
  let updatedStory = {};

  //series of if statements checking if values were received in the body of the request; assigning them to our updated object if they do exist
  if (req.body.relationalid) {
    updatedStory.relationalid = req.body.relationalid;
  }
  if (req.body.name) {
    updatedStory.name = req.body.name;
  }
  if (req.body.story) {
    updatedStory.story = req.body.story;
  }
  if (req.body.county) {
    updatedStory.county = req.body.county;
  }
  if (req.body.tag) {
    updatedStory.tag = req.body.tag;
  }

  //finding a document by its ID and then updating its key:value pairs dependant on whether or not they exist in the updated object
  await Stories.updateOne({ _id: storyId }, { $set: updatedStory });

  //res.redirect("back") -> would reload page
});

//-----------DELETE-----------
//API endpoint to delete a story
app.post("/delete/:id", async (req, res) => {
  //grabbing story id (mongo) from params
  let storyId = req.params.id;

  //deleting the story using its mongo ID as a filter
  await Stories.deleteOne({ _id: storyId });

  //res.redirect("back") -> would reload page
});

//routing * to handle any non-set routes to a 404 page
app.get("*", (req, res) => {
  res.send(`<h3>404: Whoops, something went wrong...</h3>`);
});

//listening on port 5000 and console logging a message to ensure it is listening
app.listen(port, () =>
  console.log(`VT Legal Medical Debt app listening port ${port}!`)
);
