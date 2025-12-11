import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A simple toast notification component with accessibility and theming support
 * 
 * @fires toast-close - Dispatched when the toast is closed
 * 
 * @cssproperty --toast-bg - Background color of the toast
 * @cssproperty --toast-color - Text color of the toast
 * @cssproperty --toast-border-radius - Border radius of the toast
 */
@customElement('toast-component')
export class ToastComponent extends LitElement {
  /**
   * The message to display in the toast
   */
  @property({ type: String })
  message = '';

  /**
   * Type of toast: success, error, warning, info
   */
  @property({ type: String })
  type: 'success' | 'error' | 'warning' | 'info' = 'info';

  /**
   * Duration in milliseconds before auto-close (0 = no auto-close)
   */
  @property({ type: Number })
  duration = 3000;

  /**
   * Whether the toast is visible
   */
  @state()
  private visible = false;

  private autoCloseTimer?: number;

  connectedCallback() {
    super.connectedCallback();
    // Show toast when added to DOM
    setTimeout(() => {
      this.visible = true;
      this.startAutoClose();
    }, 100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAutoClose();
  }

  private startAutoClose() {
    if (this.duration > 0) {
      this.autoCloseTimer = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  private clearAutoClose() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = undefined;
    }
  }

  private close() {
    this.visible = false;
    this.dispatchEvent(new CustomEvent('toast-close', { bubbles: true, composed: true }));
    // Remove element after animation
    setTimeout(() => this.remove(), 300);
  }

  private handleClose() {
    this.clearAutoClose();
    this.close();
  }

  
  render() {
    return html`
      <div 
        class="toast ${this.type} ${this.visible ? 'visible' : ''}"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <span class="message">${this.message}</span>
        <button 
          class="close-btn"
          @click=${this.handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      background: var(--toast-bg, #333);
      color: var(--toast-color, #fff);
      border-radius: var(--toast-border-radius, 8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-width: 250px;
      max-width: 400px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    }

    .toast.visible {
      opacity: 1;
      transform: translateX(0);
    }

    .toast.success {
      background: var(--toast-bg, #10b981);
    }

    .toast.error {
      background: var(--toast-bg, #ef4444);
    }

    .toast.warning {
      background: var(--toast-bg, #f59e0b);
    }

    .toast.info {
      background: var(--toast-bg, #3b82f6);
    }

    .message {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: inherit;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 1;
    }

    .close-btn:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'toast-component': ToastComponent;
  }
}
