import {BaseComponent} from './base-component';

export class TextInputComponent extends BaseComponent {
  constructor(
    label,
    type,
    placeHolder,
    matchPatternRegex,
    patternTip,
    id
  ) {
    super(id);
    this.label = label;
    this.type = type;
    this.placeHolder = placeHolder;
    this.patternTip = patternTip;
    // Remove leading and trailing '/'.
    this.matchPattern = String(matchPatternRegex).slice(1, -1);
  }

  getTemplate() {
    return `
      <label for="${this.id}">${this.label}</label>
      <input type="${this.type}" name="${this.id}" id="${this.id}" title="${this.patternTip}"
        placeholder="${this.placeHolder}" pattern="${this.matchPattern}" required>
    `;
  }
}
