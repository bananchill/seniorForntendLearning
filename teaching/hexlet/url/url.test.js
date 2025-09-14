// @ts-check

// eslint-disable-next-line
import {
  make,
  getProtocol,
  getHost,
  getPath,
  setProtocol,
  setHost,
  setPath,
  getQueryParam,
  setQueryParam,
  toString,
} from "./url.js";

describe("url", () => {
  it("make", () => {
    const url = make("https://hexlet.io/community?q=low");
    expect(toString(url)).toBe("https://hexlet.io/community?q=low");
  });

  it("getData", () => {
    const url = make("http://hexlet.io:8080/community?q=low");
    expect(getProtocol(url)).toBe("http:");
    expect(getHost(url)).toBe("hexlet.io:8080");
    expect(getPath(url)).toBe("/community");
  });

  it("setProtocol", () => {
    const url = make("http://hexlet.io/community?q=low");
    setProtocol(url, "https:");
    expect(toString(url)).toBe("https://hexlet.io/community?q=low");
  });

  it("setHost", () => {
    const url = make("https://hexlet.io/community?q=high");
    setHost(url, "code-basics.com");
    expect(toString(url)).toBe("https://code-basics.com/community?q=high");
  });

  it("setPath", () => {
    const url = make("https://hexlet.io/community?q=low");
    setPath(url, "/404");
    expect(toString(url)).toBe("https://hexlet.io/404?q=low");
  });

  it("getQueryParam", () => {
    const url = make("https://hexlet.io/community?q=low&user=guest");
    expect(getQueryParam(url, "q")).toBe("low");
    expect(getQueryParam(url, "user")).toBe("guest");
    expect(getQueryParam(url, "low", "user")).toBe("user");
    expect(getQueryParam(url, "b")).toBeNull();
  });

  it("setQueryParam", () => {
    const url = make("https://hexlet.io/community?q=low&user=guest");

    setQueryParam(url, "q", "high");
    expect(toString(url)).toBe("https://hexlet.io/community?q=high&user=guest");

    setQueryParam(url, "page", 5);
    expect(toString(url)).toBe(
      "https://hexlet.io/community?q=high&user=guest&page=5"
    );
  });

  it("urlWithEmptyParams", () => {
    const url = make("https://hexlet.io/community");
    expect(toString(url)).toBe("https://hexlet.io/community");
  });

  it("urlWithEmptyPath", () => {
    const url = make("https://hexlet.io/?q=high&page=5");
    expect(toString(url)).toBe("https://hexlet.io/?q=high&page=5");
  });
});
