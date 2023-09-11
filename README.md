# React JSON Grid

<p align="center">
  <img src="https://raw.githubusercontent.com/RedHeadphone/react-json-grid/master/assets/images/github-banner.png">
</p>

<p align="center">
  Interactive demos available below!<br>
  <a href="https://codepen.io/redheadphone/pen/rNoyrgW"><img alt="CodePen" src="https://img.shields.io/badge/CodePen-8A2BE2?logo=codepen"></a>
  <a href="https://codesandbox.io/s/react-json-grid-demo-7ymdg3"><img alt="CodeSandbox" src="https://img.shields.io/badge/CodeSandbox-4ea94b?logo=codesandbox"></a>
  <a href="https://stackblitz.com/edit/react-json-grid-7hyzqq"><img alt="Stackblitz" src="https://img.shields.io/badge/Stackblitz-blue?logo=stackblitz"></a>
</p>


The library react-json-grid provides the React component JSONGrid, which is a user-friendly and versatile tool that enables you to effortlessly transform nested JSON objects or arrays into visually appealing grid tables. Whether you're working on a data visualization project or simply need to present complex JSON data in an organized manner, this component has got you covered.

## Features

- **Ease of Integration**: Seamlessly incorporate the component into your React applications without any hassle.
- **Nested JSON Support**: Handle deeply nested JSON structures with ease, creating structured grid tables.
- **Highlight Magic**: Select and highlight specific cells, rows, or columns in the grid tables for better data exploration.
<!-- - **Customizable Styling**: Tailor the appearance of the grid to match your application's design using custom CSS. -->

## Install

Run either one in your React directory:
```bash
npm install @redheadphone/react-json-grid
```

```bash
yarn add @redheadphone/react-json-grid
```

## Usage

Here's an example of how to use the react-json-grid library:
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
      <JSONGrid data={data}/>
    )
  }
}
```

## Props

The JSONGrid component supports the following props:

| Name     | Type     | Description                                                        | Default     |
| -------- | -------- | ------------------------------------------------------------------ | ----------- |
| data     | object   | The JSON object or array to be transformed into a grid table.      | undefined   |


## Contributing

Please kindly follow [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## Acknowledgements

- [jsongrid.com](https://jsongrid.com/json-grid): Grid design and styles
- [kevincobain2000/json-to-html-table](https://github.com/kevincobain2000/json-to-html-table): React Component and project structure