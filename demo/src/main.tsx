import React from "react";
import ReactDOM from "react-dom/client";
import JSONGrid from "@redheadphone/react-json-grid";

const App: React.FC = () => {
  const data = {
    squadName: "Super hero squad",
    homeTown: "Metro City",
    formed: 2016,
    secretBase: "Super tower",
    active: true,
    won: [2016, 2017, 2019],
    leader: {
      name: "Lela Ramos",
      leaderSince: 2017,
      motto: null,
    },
    members: [
      {
        isActive: false,
        age: 21,
        eyeColor: "blue",
        name: "Bentley Clayton",
        gender: "male",
        power: undefined,
      },
      {
        isActive: true,
        age: 23,
        eyeColor: "blue",
        name: "Lela Ramos",
        gender: "female",
        power: "super strength",
        superheroAlias: "Sky Queen",
      },
      {
        isActive: true,
        age: 38,
        eyeColor: "green",
        name: "Milagros Becker",
        gender: "female",
        power: "invisibility",
      },
      {
        isActive: true,
        age: 20,
        name: "Acosta Bird",
        gender: "male",
        power: undefined,
        superheroAlias: "Falcon Knight",
      },
    ],
  };

  const keyTree = { leader: true };

  return (
    <div className="demo-container">
      <JSONGrid
        data={data}
        searchText={"bird"}
        onSelect={(keyPath: any) => console.log(keyPath)}
        theme={"moonLight"}
        customTheme={{ tableIconColor: "#e4e4e4" }}
        defaultExpandKeyTree={keyTree}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
