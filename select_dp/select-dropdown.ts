import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface DropdownOption {
  value: string;
  label: string;
}

@customElement('select-dropdown')
export class SelectDropdown extends LitElement {
  @property({ type: Array }) options: DropdownOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select an option';
  @property({ type: Boolean }) disabled = false;

  @state() private isOpen = false;
  @state() private focusedIndex = -1;

  static styles = css`
    :host {
      display: inline-block;
      width: var(--dropdown-width, 250px);
      position: relative;
    }

    .dropdown-button {
      width: 100%;
      padding: 10px 12px;
      background: var(--dropdown-bg, white);
      border: 1px solid var(--dropdown-border, #ccc);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }

    .dropdown-button:hover:not(:disabled) {
      border-color: #999;
    }

    .dropdown-button:focus {
      outline: 2px solid var(--dropdown-focus, #0066cc);
      outline-offset: 2px;
    }

    .dropdown-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .arrow {
      transition: transform 0.2s;
    }

    .arrow.open {
      transform: rotate(180deg);
    }

    .dropdown-list {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      max-height: 200px;
      overflow-y: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 1000;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .dropdown-option {
      padding: 10px 12px;
      cursor: pointer;
    }

    .dropdown-option:hover,
    .dropdown-option.focused {
      background: var(--dropdown-hover, #f0f0f0);
    }

    .dropdown-option.selected {
      background: var(--dropdown-selected, #e0f0ff);
      font-weight: 500;
    }
  `;

  private handleToggle() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      this.focusedIndex = this.isOpen ? this.getSelectedIndex() : -1;
    }
  }

  private handleSelect(option: DropdownOption) {
    this.value = option.value;
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: option.value, label: option.label },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.isOpen && this.focusedIndex >= 0) {
          this.handleSelect(this.options[this.focusedIndex]);
        } else {
          this.handleToggle();
        }
        break;
      case 'Escape':
        this.isOpen = false;
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
          this.focusedIndex = 0;
        } else {
          this.focusedIndex = Math.min(
            this.focusedIndex + 1,
            this.options.length - 1
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.isOpen) {
          this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        }
        break;
    }
  }

  private getSelectedIndex(): number {
    return this.options.findIndex((opt) => opt.value === this.value);
  }

  private getSelectedLabel(): string {
    const selected = this.options.find((opt) => opt.value === this.value);
    return selected ? selected.label : this.placeholder;
  }

  render() {
    const selectedLabel = this.getSelectedLabel();

    return html`
      <div class="dropdown">
        <button
          class="dropdown-button"
          @click=${this.handleToggle}
          @keydown=${this.handleKeyDown}
          ?disabled=${this.disabled}
          aria-haspopup="listbox"
          aria-expanded=${this.isOpen}
          aria-label="Select dropdown"
        >
          <span>${selectedLabel}</span>
          <span class="arrow ${this.isOpen ? 'open' : ''}">▼</span>
        </button>

        ${this.isOpen
          ? html`
              <ul class="dropdown-list" role="listbox">
                ${this.options.map(
                  (option, index) => html`
                    <li
                      class="dropdown-option ${this.value === option.value
                        ? 'selected'
                        : ''} ${index === this.focusedIndex ? 'focused' : ''}"
                      role="option"
                      aria-selected=${this.value === option.value}
                      @click=${() => this.handleSelect(option)}
                      @mouseenter=${() => (this.focusedIndex = index)}
                    >
                      ${option.label}
                    </li>
                  `
                )}
              </ul>
            `
          : ''}
      </div>
    `;
  }

  // Close dropdown when clicking outside
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.isOpen = false;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'select-dropdown': SelectDropdown;
  }
}
