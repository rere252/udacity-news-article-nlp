import { BaseComponent } from './base-component';

export class TextInputComponent extends BaseComponent {
  public nativeElement: HTMLInputElement;

  constructor(private label: string, private type: string, private placeHolder: string, id: string) {
    super(id);
  }

  getTemplate(): string {
    return `
      <label for="${this.id}">${this.label}</label>
      <input type="${this.type}" name="${this.id}" id="${this.id}" 
        placeholder="${this.placeHolder}" required>
    `;
  }
}
