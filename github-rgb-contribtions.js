/**
 * Copyright 2025 Rex Kenyon
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";

/**
 * `github-rgb-contribtions`
 * 
 * @demo index.html
 * @element github-rgb-contribtions
 */
export class GithubRgbContribtions extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rgb-contribtions";
  }

  constructor() {
    super();
    this.title = "";
    this.organization = "";
    this.repo = "";
    this.contributions = [];
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      organization: { type: String },
      repo: { type: String },
      contributions: { type: Array },
      limit: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .character {
        width: 200px;
        padding: var(--ddd-spacing-2);
      }
      .characters-wrapper {
        display: grid;
        grid-template-columns: repeat(5, auto);
        grid-templayte-rows: repeat(5, auto);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--github-rgb-contribtions-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
      <h3>${this.title}<a href="https://api.github.com/${this.organization}/${this.repo}/"></a></h3>
    </div>
    <div class="characters-wrapper">
      ${this.contributions.map((contribution) => html`
        <div class="character">
          <rpg-character
            seed="${contribution.login}"
          ></rpg-character>
          <h3>${contribution.login}</h3>
        </div>
      `)}
    </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("repos") || changedProperties.has("organization") || changedProperties.has("limit")) {
      this.fetchContributions();
    }
  }
  fetchContributions() {
    const url = `https://api.github.com/repos/${this.organization}/${this.repo}/contributors`;
    try {
      fetch(url).then(response => response.ok ? response.json() : {}).then(data => {
       
          if (data) {
            this.contributions = [];
            this.contributions.length = this.limit;
            for (let i = 0; i < this.limit; i++) {
              this.contributions[i] = data[i];
            };
            console.log("Contributions", this.contributions);
          }
        
      });
    } catch (error) {
      console.error("Something went bad", error);
    }
  }

}

globalThis.customElements.define(GithubRgbContribtions.tag, GithubRgbContribtions);