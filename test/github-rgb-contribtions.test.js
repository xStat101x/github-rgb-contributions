import { html, fixture, expect } from '@open-wc/testing';
import "../github-rgb-contribtions.js";

describe("GithubRgbContribtions test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <github-rgb-contribtions
        title="title"
      ></github-rgb-contribtions>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
