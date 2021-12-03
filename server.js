require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const port = process.env.PORT || 5001;
const app = express();

const staticDir = process.env.DEV ? "./client/public" : "./client/build";

app.use(express.urlencoded({ extended: true }));

//------------------------------MONGOOSE SETUP------------------------------
//creating mongoose Schema for stories
const StorySchema = new mongoose.Schema({
  RespId: Number,
  County: String,
  Insured: String,
  Age: String,
  QuoteTag_ImpactOnLife: Number,
  HowHasMedicalDebtImpactedYourLife: String,
  QuoteTag_Access: Number,
  HowHasMedicalDebtImpactedYourAccessToCare: String,
  QuoteTag_Cost: Number,
  WhatDoYouThinkOfTheCostOfMedicalCare: String,
  QuoteTag_SurpriseBill: Number,
  HaveYouBeenSurprisedByAMedicalBill: String,
  QuoteTag_Collections: Number,
  WhatIsYourExperienceWithMedicalDebtCollectors: String,
});

//creating the initial connection to the database using url for mongoAtlas and .env secured password
mongoose.connect("mongodb://localhost:27017/VT-Legal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

  let tagImpact;
  if (req.body.impactLife) {
    tagImpact = 1;
  } else {
    tagImpact = 0;
  }

  let tagAccess;
  if (req.body.impactCare) {
    tagAccess = 1;
  } else {
    tagAccess = 0;
  }

  let tagCost;
  if (req.body.costCare) {
    tagCost = 1;
  } else {
    tagCost = 0;
  }

  let tagSurprise;
  if (req.body.surpriseBill) {
    tagSurprise = 1;
  } else {
    tagSurprise = 0;
  }

  let tagCollections;
  if (req.body.collections) {
    tagCollections = 1;
  } else {
    tagCollections = 0;
  }

  console.log(req.body);
  const newStory = new Stories({
    RespId: req.body.id,
    County: req.body.county,
    Insured: req.body.insured,
    Age: req.body.age,

    QuoteTag_ImpactOnLife: tagImpact,
    HowHasMedicalDebtImpactedYourLife: req.body.impactLife,

    QuoteTag_Access: tagAccess,
    HowHasMedicalDebtImpactedYourAccessToCare: req.body.impactCare,

    QuoteTag_Cost: tagCost,
    WhatDoYouThinkOfTheCostOfMedicalCare: req.body.costCare,

    QuoteTag_SurpriseBill: tagSurprise,
    HaveYouBeenSurprisedByAMedicalBill: req.body.surpriseBill,

    QuoteTag_Collections: tagCollections,
    WhatIsYourExperienceWithMedicalDebtCollectors: req.body.collections,
  });

  //saving the new story
  await newStory.save();

  res.redirect("back");
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
  let countyStories = await Stories.find({ County: instanceCounty });
  //sending messages for the specific county as json
  res.json(countyStories);
});

//NOTE: FILTERS MAY NEED TO BE UPDATED ONCE TESTING IS SET-UP-----------------------------------------------------------------------------------------------------
//API endpoint to get the stories from a specific tag
app.get("/allstories/:tags", async (req, res) => {
  //setting up an intermediate variable for the county from the params
  let instanceTags = req.params.tags;

  //setting up variable to store res of .find with the instanceTags being used as a filter
  let tagsStories = await Stories.find({ instanceTags });

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
    instanceTags,
  });

  //sending messages for the specific tags as json
  res.json(combinedStories);
});

// Routing to API endpoint of directory with all counties
// app.get("/api", (req, res) => {
//   res.sendFile(__dirname + "/api/counties.json");
// });

// Routing to API endpoint matching ID of single county using parameters
// app.get("/api/:id", (req, res) => {
//   let filePath = path.join(countyDir, req.params.id + ".json");
//   res.sendFile(filePath);
// });

//-----------UPDATE-----------
//---------------------------NOTE: FIX BASED ON NEW SCHEMA-----------------------
//API endpoint to update a story
app.post("/update/:id", async (req, res) => {
  //grabbing the document id (mongo) received in params
  let storyId = req.params.id;

  //creating an empty object to hold any updated values
  let updatedStory = {};

  //series of if statements checking if values were received in the body of the request; assigning them to our updated object if they do exist
  if (req.body.id) {
    updatedStory.RespId = req.body.id;
  }
  if (req.body.county) {
    updatedStory.County = req.body.county;
  }
  if (req.body.insured) {
    updatedStory.Insured = req.body.insured;
  }
  if (req.body.age) {
    updatedStory.Age = req.body.age;
  }
  if (req.body.tagLife) {
    updatedStory.QuoteTag_ImpactOnLife = req.body.tagLife;
  }
  if (req.body.life) {
    updatedStory.HowHasMedicalDebtImpactedYourLife = req.body.life;
  }
  if (req.body.tagAccess) {
    updatedStory.QuoteTag_Access = req.body.tagAccess;
  }
  if (req.body.access) {
    updatedStory.HowHasMedicalDebtImpactedYourAccessToCare = req.body.access;
  }
  if (req.body.tagCost) {
    updatedStory.QuoteTag_Cost = req.body.tagCost;
  }
  if (req.body.cost) {
    updatedStory.WhatDoYouThinkOfTheCostOfMedicalCare = req.body.cost;
  }
  if (req.body.tagSurprise) {
    updatedStory.QuoteTag_SurpriseBill = req.body.tagSurprise;
  }
  if (req.body.surprise) {
    updatedStory.HaveYouBeenSurprisedByAMedicalBill = req.body.surprise;
  }
  if (req.body.tagDebt) {
    updatedStory.QuoteTag_Collections = req.body.tagDebt;
  }
  if (req.body.debt) {
    updatedStory.WhatIsYourExperienceWithMedicalDebtCollectors = req.body.debt;
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
