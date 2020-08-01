import { BaseComponent } from './base-component';

export class SubmitButtonComponent extends BaseComponent {
  constructor(private buttonText: string) {
    super();
  }

  getTemplate(): string {
    return `<button class="submit-button" type="submit">${this.buttonText}</button>`;
  }
}
