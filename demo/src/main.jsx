import React from 'react'
import ReactDOM from 'react-dom/client'
import { JSONGrid } from '@redheadphone/react-json-grid'

function App() {

  const data = {
    "squadName": "Super hero squad",
    "homeTown": "Metro City",
    "formed": 2016,
    "secretBase": "Super tower",
    "active": true,
    "won": [2016,2017,2019],
    "leader": {
      "isActive": true,
      "age": 20,
      "eyeColor": "blue",
      "name": "Acosta Bird",
      "gender": "male",
      "registered": "2019-02-11T09:59:58 +05:00"
    },
    "members": [
      {
        "index": 0,
        "isActive": false,
        "age": 21,
        "eyeColor": "blue",
        "name": "Bentley Clayton",
        "gender": "male",
        "registered": "2018-05-02T05:35:41 +04:00"
      },
      {
        "index": 1,
        "isActive": false,
        "age": 23,
        "eyeColor": "blue",
        "name": "Lela Ramos",
        "gender": "female",
        "registered": "2014-02-24T03:13:50 +05:00"
      },
      {
        "index": 2,
        "isActive": true,
        "age": 38,
        "eyeColor": "green",
        "name": "Milagros Becker",
        "gender": "female",
        "registered": "2016-10-22T12:18:50 +04:00"
      },
      {
        "index": 3,
        "isActive": false,
        "age": 30,
        "eyeColor": "brown",
        "name": "Mccoy Barrera",
        "gender": "male",
        "registered": "2016-12-03T03:44:57 +05:00"
      },
      {
        "index": 4,
        "isActive": false,
        "age": 35,
        "eyeColor": "brown",
        "name": "Morton Bennett",
        "gender": "male",
        "registered": "2015-10-06T09:48:03 +04:00"
      },
      {
        "index": 5,
        "isActive": true,
        "age": 20,
        "eyeColor": "blue",
        "name": "Acosta Bird",
        "gender": "male",
        "registered": "2019-02-11T09:59:58 +05:00"
      },
      {
        "index": 6,
        "isActive": false,
        "age": 35,
        "eyeColor": "blue",
        "name": "Mcleod Keith",
        "gender": "male",
        "registered": "2014-04-24T07:50:11 +04:00"
      },
      {
        "index": 7,
        "isActive": false,
        "age": 27,
        "eyeColor": "brown",
        "name": "Magdalena Burgess",
        "gender": "female",
        "registered": "2015-03-19T09:28:55 +04:00"
      },
      {
        "index": 8,
        "isActive": false,
        "age": 37,
        "eyeColor": "blue",
        "name": "Cline Castaneda",
        "gender": "male",
        "registered": "2016-02-29T09:49:37 +05:00"
      },
      {
        "index": 9,
        "isActive": false,
        "age": 39,
        "eyeColor": "green",
        "name": "Garcia Baker",
        "gender": "male",
        "registered": "2018-05-26T02:54:22 +04:00"
      },
      {
        "index": 10,
        "isActive": true,
        "age": 40,
        "eyeColor": "blue",
        "name": "Lenora Keller",
        "gender": "female",
        "registered": "2017-12-19T05:12:17 +05:00"
      },
      {
        "index": 11,
        "isActive": false,
        "age": 33,
        "eyeColor": "green",
        "name": "Kathryn Donovan",
        "gender": "female",
        "registered": "2014-03-21T12:33:36 +04:00"
      },
      {
        "index": 12,
        "isActive": true,
        "age": 40,
        "eyeColor": "blue",
        "name": "Opal Hinton",
        "gender": "female",
        "registered": "2014-05-03T02:14:25 +04:00"
      },
      {
        "index": 13,
        "isActive": false,
        "age": 25,
        "eyeColor": "green",
        "name": "Mayer Gray",
        "gender": "male",
        "registered": "2016-04-01T05:52:21 +04:00"
      },
      {
        "index": 14,
        "isActive": true,
        "age": 22,
        "eyeColor": "green",
        "name": "Josefina Quinn",
        "gender": "female",
        "registered": "2015-02-07T12:04:14 +05:00"
      }
    ]
  }

  return (
    <div className='json-grid-container'>
      <JSONGrid data={data} tableClassName="table table-sm"/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
