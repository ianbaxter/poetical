import React from "react";
import NewPost from "../../components/NewPost";
import { render, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("Inputing title text updates the state", () => {
  const { getByLabelText } = render(<NewPost />);

  expect(getByLabelText("Title:").textContent).toBe("");

  fireEvent.change(getByLabelText("Title:"), { target: { value: "Text" } });

  expect(getByLabelText("Title:").textContent).not.toBe("");
});

it("Inputing content text updates the state", () => {
  const { getByLabelText } = render(<NewPost />);

  expect(getByLabelText("Content:").textContent).toBe("");

  fireEvent.change(getByLabelText("Content:"), { target: { value: "Text" } });

  expect(getByLabelText("Content:").textContent).not.toBe("");
});

it("Inputing tags text updates the state", () => {
  const { getByLabelText } = render(<NewPost />);

  expect(getByLabelText("Tags:").textContent).toBe("");

  fireEvent.change(getByLabelText("Tags:"), { target: { value: "Text" } });

  expect(getByLabelText("Tags:").textContent).not.toBe("");
});
