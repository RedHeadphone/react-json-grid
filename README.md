# json-to-html-table

Convert Nested JSON to HTML Table — React, Javascript.

A simple react component to convert any nested JSON object or array into an HTML table.

for more info see

https://medium.com/web-developer/convert-nested-json-to-html-table-react-javascript-be6611fed718

# Use it Online

Online tool https://kevincobain2000.github.io/json-to-html-table/

## Install

```bash
npm install --save @kevincobain2000/json-to-html-table
```

## Usage

```jsx
import React, { Component } from 'react'

import { JSONToHTMLTable } from '@kevincobain2000/json-to-html-table'

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
      <JSONToHTMLTable data={data} tableClassName="table table-sm"/>
    )
  }
}
```

## License

MIT
