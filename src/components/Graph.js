import React from "react";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Graph(props) {
  const [allStories, setAllStories] = useState([]);
  const [data, setData] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  //useEffect to fetch all stories once on component render
  useEffect(() => {
    fetch("/allstories")
      .then((res) => res.json())
      .then((storiesArray) => {
        //setting all stories state variable to the response.json from the fetch
        setAllStories(groupBy(storiesArray, "County"));
        setFetchComplete(true);
      });
  }, []);

  //function to create an array with keys for each county
  function groupBy(array, county) {
    let hash = {};
    for (let i = 0; i < array.length; i++) {
      if (!hash[array[i][county]]) hash[array[i][county]] = [];
      hash[array[i][county]].push(array[i]);
    }
    return hash;
  }

  //useEffect firing when fetchComplete state variable changes
  useEffect(() => {
    //checking to ensure that the initial fetch for the allStories state variable is complete
    if (fetchComplete === true) {
      //setting the data state variable based on the returns of the database fetch
      setData([
        {
          //name serves as the key
          name: "Addison",
          //stories is the y-axis and is the length of the array for that county. ternary is to protect against page erroring when trying to do .length on a undefined array
          stories: allStories.Addison ? allStories.Addison.length : 0,
        },
        {
          name: "Bennington",
          stories: allStories.Bennington ? allStories.Bennington.length : 0,
        },
        {
          name: "Caledonia",
          stories: allStories.Caledonia ? allStories.Caledonia.length : 0,
        },
        {
          name: "Chittenden",
          stories: allStories.Chittenden ? allStories.Chittenden.length : 0,
        },
        {
          name: "Essex",
          stories: allStories.Essex ? allStories.Essex.length : 0,
        },
        {
          name: "Franklin",
          stories: allStories.Franklin ? allStories.Franklin.length : 0,
        },
        {
          name: "Grand Isle",
          stories: allStories["Grand Isle"] ? allStories["Grand Isle"].length: 0,
        },
        {
          name: "Lamoille",
          stories: allStories.Lamoille ? allStories.Lamoille.length : 0,
        },
        {
          name: "Orange",
          stories: allStories.Orange ? allStories.Orange.length : 0,
        },
        {
          name: "Orleans",
          stories: allStories.Orleans ? allStories.Orleans.length : 0,
        },
        {
          name: "Rutland",
          stories: allStories.Rutland ? allStories.Rutland.length : 0,
        },
        {
          name: "Washington",
          stories: allStories.Washington ? allStories.Washington.length : 0,
        },
        {
          name: "Windham",
          stories: allStories.Windham ? allStories.Windham.length : 0,
        },
        {
          name: "Windsor",
          stories: allStories.Windsor ? allStories.Windsor.length : 0,
        },
      ]);
    }
  }, [fetchComplete]);

  return (
    // returning the bar chart element
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      {/* setting up the dashed display in the background of the chart area */}
      <CartesianGrid strokeDasharray="3 3" />
      {/* setting the x-axis to be the name field in the data array, and setting up the ticks to be at an angle that allows for all to be displayed */}
      <XAxis
        dataKey="name"
        height={75}
        scaleToFit="true"
        textAnchor="end"
        verticalAnchor="start"
        interval={0}
        angle="-40"
        label={{ value: "County", position: "insideBottom", offset: 0 }}
      />
      {/* setting the y-axis to have a label that is vertical */}
      <YAxis
        label={{
          value: "Number of Stories",
          angle: -90,
          position: "insideBottomLeft",
        }}
      />
      <Tooltip />
      <Bar dataKey="stories" fill="#5a203c" />
    </BarChart>
  );
}

export default Graph;
