import React, {useState, useEffect} from 'react'
import CodeMirror from 'react-codemirror';

import {JSONToHTMLTable} from '@kevincobain2000/json-to-html-table'
import ReactDOMServer from "react-dom/server";

export const App = () => {
  const handleChangeData = (data) => {
    setData(data)
  }

  const [data, setData] = useState(`{
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
  }`)

  useEffect(() => {
  }, [])
  const renderTable = () => {
    try {
      return <JSONToHTMLTable data={JSON.parse(data)} tableClassName="table table-condensed table-sm" />
    } catch (error) {
      return <div>Error in JSON</div>
    }
  }

  const format = (html) => {
    var tab = '  ';
    var result = '';
    var indent= '';

    html.split(/>\s*</).forEach(function(element) {
        if (element.match( /^\/\w/ )) {
            indent = indent.substring(tab.length);
        }

        result += indent + '<' + element + '>\r\n';

        if (element.match( /^<?\w[^>]*[^\/]$/ )) {
            indent += tab;
        }
    });

    return result.substring(1, result.length-3);
  }

  const options = {
    height: "70px",
    width: "100%",
    theme: "ambiance",
    lineNumbers: true,
    styleActiveLine: true,
    textWrapping: true,
    mode: "javascript",
  }

  return (
    <div className="container">
        <h1 className="text-center">
        Nested JSON to HTML Table Converter - Online tool
      </h1>
      <p className="text-center">
          <a className="text-center" href="https://medium.com/web-developer/convert-nested-json-to-html-table-react-javascript-be6611fed718">
            Medium - Convert Nested JSON to HTML Table — React, Javascript
          </a>
      </p>
      <p className="text-center">
        <a className="text-md" href="https://github.com/kevincobain2000/json-to-html-table">
            <i className="fa fa-code"></i>
            Github
        </a>
      </p>
      <p>Enter JSON</p>
      <div className='pt-2 pb-2'>
        <CodeMirror value={data} onChange={handleChangeData} options={options} />
        <br/>
        <p>Raw HTML</p>
        <pre className="selectable">
          {format(ReactDOMServer.renderToString(renderTable()))}
        </pre>
        <p>HTML Table</p>
        {renderTable()}
      </div>
    </div>
  )
}
export default App;
