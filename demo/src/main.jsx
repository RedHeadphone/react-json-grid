import React from "react";
import ReactDOM from "react-dom/client";
import { JSONGrid } from "@redheadphone/react-json-grid";

function App() {
  const data = {
    squadName: "Super hero squad",
    homeTown: "Metro City",
    formed: 2016,
    secretBase: "Super tower",
    active: true,
    won: [2016, 2017, 2019],
    leader: {
      isActive: false,
      age: 23,
      eyeColor: "blue",
      name: "Lela Ramos",
      gender: "female",
      registered: "2014-02-24T03:13:50 +05:00"
    },
    members: [
      {
        index: 0,
        age: 21,
        eyeColor: "blue",
        name: "Bentley Clayton",
        gender: "male",
        registered: "2018-05-02T05:35:41 +04:00"
      },
      {
        index: 1,
        isActive: false,
        age: 23,
        eyeColor: "blue",
        name: "Lela Ramos",
        gender: "female",
        registered: "2014-02-24T03:13:50 +05:00"
      },
      {
        index: 2,
        isActive: true,
        age: 38,
        eyeColor: "green",
        name: "Milagros Becker",
        gender: "female",
        registered: "2016-10-22T12:18:50 +04:00"
      },
      {
        index: 3,
        isActive: false,
        age: 30,
        eyeColor: "brown",
        name: "Mccoy Barrera",
        gender: "male",
        registered: "2016-12-03T03:44:57 +05:00"
      },
      {
        index: 4,
        isActive: false,
        age: 35,
        eyeColor: "brown",
        name: "Morton Bennett",
        gender: "male",
        registered: "2015-10-06T09:48:03 +04:00"
      },
      {
        index: 5,
        isActive: true,
        age: 20,
        name: "Acosta Bird",
        gender: "male",
        registered: "2019-02-11T09:59:58 +05:00"
      }
    ]
  };

  return (
    <div className="json-grid-container">
      <JSONGrid data={data} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
