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

// const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];

// const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];

// const labelData = greenData.map((d, idx) => ({
//   x: d.x,
//   y: Math.max(greenData[idx].y, blueData[idx].y)
// }));

// const data = [
//   {
//     name: "Addison",
//     stories: hash.Addison.length,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Bennington",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Caledonia",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Chittenden",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Franklin",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Grand Isle",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Lamoille",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Orange",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Orleans",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Rutland",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Washington",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Windham",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Windsor",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

function Graph(props) {
  const [allStories, setAllStories] = useState([]);
  const [data, setData] = useState([])
  const [fetchComplete, setFetchComplete] = useState(false)

  //useEffect to fetch all stories once on component render
  useEffect(() => {
    fetch("/allstories")
      .then((res) => res.json())
      .then((storiesArray) => {
        //setting all stories state variable to the response.json from the fetch
        setAllStories(groupBy(storiesArray, "County"));
        setFetchComplete(true)
      });
      
  }, []);

  useEffect(() => {
    if (fetchComplete === true) {
      setData([
        {
          name: "Addison",
          stories: allStories.Addison.length,
        },
        {
          name: "Bennington",
          stories: allStories.Bennington.length,
        },
        {
          name: "Caledonia",
          stories: allStories.Caledonia.length,
        },
        {
          name: "Chittenden",
          stories: allStories.Chittenden.length,
        },
        {
          name: "Franklin",
          stories: allStories.Franklin.length,
        },
        // {
        //   name: "Grand Isle",
        //   stories: ,
        // },
        {
          name: "Lamoille",
          stories: allStories.Lamoille.length,
        },
        {
          name: "Orange",
          stories: allStories.Orange.length,
        },
        {
          name: "Orleans",
          stories: allStories.Orleans.length,
        },
        {
          name: "Rutland",
          stories: allStories.Rutland.length,
        },
        {
          name: "Washington",
          stories: allStories.Washington.length,
        },
        {
          name: "Windham",
          stories: allStories.Windham.length,
        },
        {
          name: "Windsor",
          stories: allStories.Windsor.length,
        },
      ]);
      console.log("Updated Chart")
    }}
    , [fetchComplete])

  function groupBy(array, county) {
    let hash = {};
    for (let i = 0; i < array.length; i++) {
      if (!hash[array[i][county]]) hash[array[i][county]] = [];
      hash[array[i][county]].push(array[i]);
    }
    console.log(hash);
    return hash;
  }
  

  return (
    
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stories" fill="#8884d8" />
      </BarChart>
    
  );
}

export default Graph;