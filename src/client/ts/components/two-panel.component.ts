import { BaseComponent } from './base-component';

export class TwoPanelComponent extends BaseComponent {
  constructor(private title: string, private leftPanel: BaseComponent, private rightPanel: BaseComponent) {
    super();
  }

  getChildren(): BaseComponent[] {
    return [this.leftPanel, this.rightPanel];
  }

  getTemplate(): string {
    return `
      <div class="two-panel">
        <div class="two-panel__left">
          <h1>${this.title}</h1>
          ${this.leftPanel?.getTemplate()}
        </div>
        <div id="${this.containerId(this.rightPanel)}" class="two-panel__right">
          ${this.rightPanel?.getTemplate()}
        </div>
      </div>
    `;
  }

  updateRightPanel(newPanel: BaseComponent): void {
    const rightPanelContainer = document.getElementById(this.containerId(this.rightPanel));
    rightPanelContainer.id = this.containerId(newPanel);
    rightPanelContainer.innerHTML = newPanel.getTemplate();
    this.rightPanel = newPanel;
    this.rightPanel.onAttached();
  }

  private containerId(comp: BaseComponent) {
    return `${comp.id}Container`;
  }
}
