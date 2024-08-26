import React from "react";
import JSONGrid from "../src";
import '@testing-library/jest-dom';
import {cleanup, fireEvent, render} from "@testing-library/react";

afterEach(cleanup);

describe("JSONGrid data render", () => {

  it("should render data correctly", async () => {
    const {getByText, findByText} = render(<JSONGrid data={{
        "fruit": "Apple",
        "size": "Large",
        "color": "Red",
        "edible": true,
        "count": 7
    }} searchText={"ed"}/>)

    await findByText("Apple");

    expect(getByText("fruit")).toBeInTheDocument()
    
    expect(getByText("size").parentElement.parentElement).toContainElement(getByText("Large"))
    expect(getByText("size").parentElement.parentElement).not.toContainElement(getByText("Apple"))

    expect(getByText("Red")).toHaveClass("search-highlight")

    expect(getByText("true")).toHaveClass("boolean")

    expect(getByText("7")).toHaveClass("number")
  })
});

describe("JSONGrid click highlight", () => {

  it("should highlight correctly", async () => {
    const {getByText, findByText} = render(
    <div>
    <JSONGrid data={{
        "fruit": "Apple",
        "size": "Large",
        "color": "Red",
        "edible": true,
        "count": 7
    }} highlightSelected={true}/>
    <span>outside</span>
    </div>)

    await findByText("Apple");

    fireEvent.click(getByText("Apple"));

    expect(getByText("Apple").parentElement).toHaveClass("highlight");

    fireEvent.click(getByText("Large").parentElement);

    expect(getByText("Large").parentElement).toHaveClass("highlight");
    expect(getByText("Apple").parentElement).not.toHaveClass("highlight");

    fireEvent.click(getByText("outside"));

    expect(getByText("Large").parentElement).not.toHaveClass("highlight");
  })

  it("should highlight table row and column correctly", async () => {
    const {baseElement, getByText, findByText} = render(
    <JSONGrid data={[{
        "fruit": "Apple",
        "color": "Red"
    },{
      "fruit": "Banana",
      "color": "Yellow"
    }
  ]} highlightSelected={true}/>)

    await findByText("Apple");

    fireEvent.click(getByText("1"));

    expect(getByText("Apple").parentElement.parentElement).toHaveClass("highlight");

    fireEvent.click(getByText("fruit"));

    expect(baseElement.querySelector("colgroup col:nth-child(2)")).toHaveClass("highlight");

    fireEvent.click(getByText("Banana"));

    expect(getByText("Banana").parentElement).toHaveClass("highlight");
  })
});

describe("JSONGrid expand collapse", () => {

  it("should expand and collapse correctly", async () => {
    const {baseElement, getByText, findByText} = render(
    <JSONGrid data={{
        "fruit": "Apple",
        "color": "Red",
        "tree": {
          "height": 10,
          "layered": true
        }
    } }/>)

    await findByText("Apple");

    expect(baseElement.querySelector(".number")).toBeNull();

    fireEvent.click(getByText("[+]"));

    expect(baseElement.querySelector(".number")).not.toBeNull();
    expect(getByText("10")).toBeInTheDocument();

    fireEvent.click(getByText("[-]"));

    expect(baseElement.querySelector(".number")).toBeNull();

  })
});