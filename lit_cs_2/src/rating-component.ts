import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
// Import external CSS for theming
import externalStyles from './rating-component.css?inline';

/**
 * A simple star rating web component built with Lit
 * 
 * @element rating-component
 * 
 * @attr {number} max-rating - Maximum number of stars (default: 5)
 * @attr {number} value - Current rating value (default: 0)
 * @attr {boolean} readonly - Whether the component is read-only (default: false)
 * @attr {boolean} show-label - Show rating label (default: true)
 * 
 * @fires rating-change - Fired when rating value changes
 * 
 * @example
 * ```html
 * <!-- Default theme -->
 * <rating-component value="3"></rating-component>
 * 
 * <!-- Red theme -->
 * <rating-component value="4" class="theme-red"></rating-component>
 * ```
 */
@customElement('rating-component')
export class RatingComponent extends LitElement {
  /**
   * Maximum number of stars to display
   */
  @property({ type: Number, attribute: 'max-rating' })
  maxRating = 5;

  /**
   * Current rating value
   */
  @property({ type: Number })
  value = 0;

  /**
   * Whether the component is read-only
   */
  @property({ type: Boolean })
  readonly = false;

  /**
   * Show rating label
   */
  @property({ type: Boolean, attribute: 'show-label' })
  showLabel = true;

  /**
   * Hover state for interactive rating
   */
  @state()
  private hoverValue = 0;

  /**
   * Component styles
   * External CSS provides theming (star colors)
   * Inline CSS provides structure and behavior
   */
  static styles = [
    // External CSS: Theme variables only
    unsafeCSS(externalStyles),
    
    // Inline CSS: Core structure and behavior
    css`
      :host {
        display: inline-block;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .rating-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .stars-wrapper {
        display: flex;
        gap: 4px;
      }

      .star {
        cursor: pointer;
        user-select: none;
      }

      .star.readonly {
        cursor: default;
      }

      .star svg {
        width: 24px;
        height: 24px;
        transition: transform 0.2s ease;
      }

      .star:hover svg {
        transform: scale(1.1);
      }

      /* Use the theme variable from external CSS */
      .star.filled svg {
        fill: var(--rating-star-color);
      }

      .star.empty svg {
        fill: #d1d5db;
      }

      .rating-label {
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        padding: 4px 12px;
        background: #f3f4f6;
        border-radius: 8px;
      }

      /* Accessibility */
      .star:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        border-radius: 4px;
      }
    `
  ];

  /**
   * Render the star SVG icon
   */
  private renderStar() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `;
  }

  /**
   * Handle star click event
   */
  private handleStarClick(index: number) {
    if (this.readonly) return;

    const newValue = index + 1;
    const oldValue = this.value;
    this.value = newValue;

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('rating-change', {
        detail: { value: newValue, oldValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle star hover event
   */
  private handleStarHover(index: number) {
    if (this.readonly) return;
    this.hoverValue = index + 1;
  }

  /**
   * Handle mouse leave event
   */
  private handleMouseLeave() {
    if (this.readonly) return;
    this.hoverValue = 0;
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown(event: KeyboardEvent, index: number) {
    if (this.readonly) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.handleStarClick(index);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        if (index < this.maxRating - 1) {
          const nextStar = this.shadowRoot?.querySelectorAll('.star')[index + 1] as HTMLElement;
          nextStar?.focus();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        if (index > 0) {
          const prevStar = this.shadowRoot?.querySelectorAll('.star')[index - 1] as HTMLElement;
          prevStar?.focus();
        }
        break;
    }
  }

  /**
   * Determine if a star should be filled
   */
  private isStarFilled(index: number): boolean {
    const displayValue = this.hoverValue || this.value;
    return index < displayValue;
  }

  /**
   * Get CSS classes for a star
   */
  private getStarClasses(index: number) {
    return classMap({
      star: true,
      filled: this.isStarFilled(index),
      empty: !this.isStarFilled(index),
      readonly: this.readonly,
    });
  }

  /**
   * Render the component
   */
  render() {
    const displayValue = this.hoverValue || this.value;

    return html`
      <div 
        class="rating-container"
        @mouseleave=${this.handleMouseLeave}
        role="group"
        aria-label="Star rating"
      >
        <div class="stars-wrapper">
          ${Array.from({ length: this.maxRating }, (_, i) => html`
            <span
              class=${this.getStarClasses(i)}
              @click=${() => this.handleStarClick(i)}
              @mouseenter=${() => this.handleStarHover(i)}
              @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, i)}
              role="radio"
              aria-checked=${this.value > i ? 'true' : 'false'}
              aria-label="${i + 1} star${i !== 0 ? 's' : ''}"
              tabindex=${this.readonly ? '-1' : '0'}
            >
              ${this.renderStar()}
            </span>
          `)}
        </div>
        ${this.showLabel
          ? html`
              <span class="rating-label">
                ${displayValue.toFixed(1)} / ${this.maxRating.toFixed(1)}
              </span>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rating-component': RatingComponent;
  }
}
