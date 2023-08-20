# react-json-grid

React Component that converts JSON to grid table

A simple react component to convert any nested JSON object or array into an grid table.

## Install

```bash
npm install @redheadphone/react-json-grid
```

## Usage

```jsx
import React, { Component } from 'react'

import { JSONGrid } from '@redheadphone/react-json-grid'

class Example extends Component {
  render () {
    const data = {
      "id": "0001",
      "type": "donut",
      "name": "Cake",
      "ppu": 0.55,
      "batters":
        {
          "batter":
            [
              { "id": "1001", "type": "Regular" },
              { "id": "1002", "type": "Chocolate" },
              { "id": "1003", "type": "Blueberry" },
              { "id": "1004", "type": "Devil's Food" }
            ]
        },
      "topping":
        [
          { "id": "5001", "type": "None" },
          { "id": "5002", "type": "Glazed" },
          { "id": "5005", "type": "Sugar" },
          { "id": "5007", "type": "Powdered Sugar" },
          { "id": "5006", "type": "Chocolate with Sprinkles" },
          { "id": "5003", "type": "Chocolate" },
          { "id": "5004", "type": "Maple" }
        ]
    }
    return (
      <JSONGrid data={data} tableClassName="table table-sm"/>
    )
  }
}
```

## Important Command

Run JSONGrid package in development mode
```shell
npm run dev
```

Run demo in development mode
```shell
cd demo && npm run dev
```