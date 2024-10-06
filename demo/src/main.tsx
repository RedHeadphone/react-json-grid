import React from "react";
import ReactDOM from "react-dom/client";
import JSONGrid from "@redheadphone/react-json-grid";

const App: React.FC = () => {
  const data = {
    "platformName": "E-Shop",
    "location": "Global",
    "established": 2023,
    "dailyActiveUsers": 50,
    "totalUsers": 1200,
    "lastUpdated": "2024-10-05",
    "supportEmail": "support@eshop.com",
    "active": true,
    "featuredYears": [2017, 2019, 2021],
    "admin": {
      "name": "Sarah Williams",
      "adminSince": "2023-05-06",
      "role": "Chief Operating Officer",
      "contact": null,
      "permissions": {
        "canManageUsers": true,
        "canManageOrders": true,
        "canEditContent": false,
        "canAccessFinancials": true
      }
    },
    "users": [
      {
        "isActive": true,
        "age": 28,
        "email": "alice.johnson@example.com",
        "name": "Alice Johnson",
        "gender": "female",
        "orders": [
          {
            "orderId": "ORD1001",
            "date": "2023-09-10",
            "totalAmount": 250.75,
            "items": [
              {
                "productName": "Laptop",
                "quantity": 1,
                "price": 1200.00
              },
              {
                "productName": "Mouse",
                "quantity": 2,
                "price": 25.00
              }
            ]
          }
        ]
      },
      {
        "isActive": false,
        "email": "bob.smith@example.com",
        "age": 35,
        "name": "Bob Smith",
        "gender": "male",
        "orders": [
          {
            "orderId": "ORD2001",
            "date": "2023-09-20",
            "totalAmount": 75.50,
            "items": [
              {
                "productName": "Smartphone Case",
                "quantity": 1,
                "price": 25.50
              },
              {
                "productName": "Wireless Charger",
                "quantity": 1,
                "price": 50.00
              }
            ]
          }
        ]
      },
      {
        "isActive": true,
        "name": "Claire Brown",
        "gender": "female",
        "age": 30,
        "orders": []
      },
      {
        "isActive": true,
        "age": 40,
        "email": "david.jones@example.com",
        "name": "David Jones",
        "gender": "male",
        "orders": []
      }
    ]
  };

  const keyTree = { admin: true };

  return (
    <div className="demo-container">
      <JSONGrid
        data={data}
        searchText={"Clair"}
        onSelect={(keyPath: any) => console.log(keyPath)}
        theme={"moonLight"}
        customTheme={{ tableIconColor: "#e4e4e4" }}
        defaultExpandKeyTree={keyTree}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
