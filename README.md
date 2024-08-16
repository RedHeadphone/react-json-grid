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


The library react-json-grid provides the React component JSONGrid, which is a user-friendly and versatile tool that enables you to effortlessly transform nested JSON objects or arrays into structured nested grid tables. This component has got you covered when dealing with big and complex JSON data, allowing you to display it in an organized manner.

## Features

- **Ease of Integration**: Seamlessly incorporate the component into your React applications without any hassle and no dependencies.
- **Nested JSON Support**: Handle deeply nested JSON structures with ease, creating nested structured grid tables that are collapsible and expandible.
- **Highlight Magic**: Select and highlight specific cells, rows, or columns in the grid tables to enhance the user interface and facilitate interaction.
- **Search Spotlight**: Enhance the visibility of your JSON data with a search feature that effectively highlights cells matching with the search text.
- **Customizable Styling**: Tailor the appearance of the grid to match your application's design using custom theme.

## Install

Run either one in your React project directory:

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
import JSONGrid from '@redheadphone/react-json-grid'

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

| Name                  | Type     | Description                                                           | Default       |
| --------------------- | -------- | --------------------------------------------------------------------- | ------------- |
| data                  | object   | The JSON object or array to be transformed into a grid table.         | undefined     |
| defaultExpandDepth    | number   | The depth to which the grid is expanded by default.                   | 0             |
| defaultExpandKeyTree  | object   | Tree-like structure with all keys that needs to be expanded.          | undefined     |
| onSelect              | function | Event to obtain selected item's keyPath                               | (keyPath)=>{} |
| highlightSelected     | boolean  | Whether to highlight the selected item or not.                        | true          |
| searchText            | string   | The text that needs to be searched in the JSON data.                  | undefined     |
| theme                 | string   | The theme name that needs to be applied.                              | 'default'     |
| customTheme           | object   | The customTheme object which specify color code of each part of grid. | {}            |

## Themes

### Available Themes

- default
- radical
- cobalt
- dracula
- monokai
- solarizedLight
- solarizedDark
- materialDark
- oceanicNext
- panda
- gruvboxMaterial
- merko
- tokyoNight
- remedy
- minimal
- auroraX
- atlanticNight
- aTouchOfLilac
- glassUI
- fireflyPro
- reUI
- slime
- signedDarkPro
- ariakeDark
- snazzyLight
- spacegray
- celestial
- blueberryDark
- bear
- oneDarkPro
- nord
- palenight
- nightOwl
- andromeda
- horizon
- cobalt2
- atomOneLight
- ysgrifennwr
- notepadPlusPlusRemixed
- githubLight
- shadesOfPurple
- synthWave
- codeBlue
- cyberpunk
- laserWave
- hipster
- wildberry
- qiita
- softEra

Note: Pass one of above themes as a string in the theme prop. You can contribute your custom theme in [themes.js](src/themes.js)

### Custom Theme Object Format

```json
{
  "bgColor": "#222",
  "tableBorderColor": "#b5b5b5",
  "highlightBgColor": "#3b3b3b",
  "cellBorderColor": "#474747",
  "keyNameColor": "#ffffff",
  "indexColor": "#949494",
  "numberColor": "#6c99bb",
  "booleanColor": "#6c99bb",
  "stringColor": "#a5c261",
  "objectColor": "#ffffff",
  "tableHeaderBgColor": "#444",
  "tableHeaderColor": "#ffffff",
  "searchHighlightColor": "#565a36"
}
```

Note: All field values need to be strings that are accepted by CSS for color. All fields are not mandatory.

## Contributing

Please kindly follow [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## Acknowledgements

- [jsongrid.com](https://jsongrid.com/json-grid): Grid design and styles
- [kevincobain2000/json-to-html-table](https://github.com/kevincobain2000/json-to-html-table): React Component and project structure