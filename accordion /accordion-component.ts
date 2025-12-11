import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Simple Accordion Web Component
 * @element accordion-component
 */
@customElement('accordion-component')
export class AccordionComponent extends LitElement {
  @property({ type: String }) title = 'Accordion Title';
  @state() private isOpen = false;

  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--accordion-border-color, #ddd);
      border-radius: var(--accordion-border-radius, 4px);
      margin-bottom: var(--accordion-spacing, 8px);
      font-family: var(--accordion-font-family, system-ui, sans-serif);
    }

    .accordion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--accordion-header-padding, 16px);
      background: var(--accordion-header-bg, #f5f5f5);
      cursor: pointer;
      user-select: none;
      transition: background 0.2s ease;
    }

    .accordion-header:hover {
      background: var(--accordion-header-hover-bg, #ebebeb);
    }

    .accordion-header:focus {
      outline: 2px solid var(--accordion-focus-color, #0066cc);
      outline-offset: -2px;
    }

    .accordion-title {
      margin: 0;
      font-size: var(--accordion-title-size, 16px);
      font-weight: var(--accordion-title-weight, 600);
      color: var(--accordion-title-color, #333);
    }

    .accordion-icon {
      transition: transform 0.3s ease;
      font-size: 20px;
      color: var(--accordion-icon-color, #666);
    }

    .accordion-icon.open {
      transform: rotate(180deg);
    }

    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .accordion-content.open {
      max-height: 500px;
    }

    .accordion-body {
      padding: var(--accordion-body-padding, 16px);
      color: var(--accordion-body-color, #555);
      line-height: 1.6;
    }
  `;

  private toggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggleAccordion();
    }
  }

  render() {
    return html`
      <div class="accordion">
        <div
          class="accordion-header"
          role="button"
          tabindex="0"
          aria-expanded="${this.isOpen}"
          aria-controls="accordion-content"
          @click="${this.toggleAccordion}"
          @keydown="${this.handleKeyDown}"
        >
          <h3 class="accordion-title">${this.title}</h3>
          <span class="accordion-icon ${this.isOpen ? 'open' : ''}" aria-hidden="true">
            ▼
          </span>
        </div>
        <div
          id="accordion-content"
          class="accordion-content ${this.isOpen ? 'open' : ''}"
          role="region"
          aria-labelledby="accordion-header"
        >
          <div class="accordion-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'accordion-component': AccordionComponent;
  }
}
