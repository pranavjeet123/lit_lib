import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('simple-calendar')
export class CalendarComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 350px;
      margin: 0 auto;
    }

    .calendar {
      border-radius: 8px;
      padding: 16px;
      background: var(--calendar-bg, #ffffff);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .month-year {
      font-size: 18px;
      font-weight: 600;
      color: var(--calendar-text, #333);
    }

    button {
      padding: 8px 12px;
      border: none;
      background: var(--calendar-button-bg, #007bff);
      color: var(--calendar-button-text, #fff);
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      opacity: 0.9;
    }

    button:focus {
      outline: 2px solid var(--calendar-focus, #0056b3);
      outline-offset: 2px;
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
    }

    .day-name, .day {
      text-align: center;
      padding: 8px;
      font-size: 14px;
    }

    .day-name {
      font-weight: 600;
      color: var(--calendar-header-text, #666);
    }

    .day {
      border-radius: 4px;
      cursor: pointer;
      color: var(--calendar-day-text, #333);
    }

    .day:hover {
      background: var(--calendar-hover-bg, #e9ecef);
    }

    .day.today {
      background: var(--calendar-today-bg, #007bff);
      color: var(--calendar-today-text, #fff);
      font-weight: 600;
    }

    .day.empty {
      cursor: default;
    }

    .day:focus {
      outline: 2px solid var(--calendar-focus, #0056b3);
      outline-offset: -2px;
    }
  `;

  @state()
  private currentMonth: number = new Date().getMonth();

  @state()
  private currentYear: number = new Date().getFullYear();

  private getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(month: number, year: number): number {
    return new Date(year, month, 1).getDay();
  }

  private isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  private previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  private nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  private handleDayClick(day: number) {
    const event = new CustomEvent('day-selected', {
      detail: {
        day,
        month: this.currentMonth,
        year: this.currentYear,
        date: new Date(this.currentYear, this.currentMonth, day)
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private renderDays() {
    const daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
    const firstDay = this.getFirstDayOfMonth(this.currentMonth, this.currentYear);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(html`<div class="day empty" aria-hidden="true"></div>`);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = this.isToday(day);
      days.push(html`
        <div
          class="day ${isToday ? 'today' : ''}"
          role="button"
          tabindex="0"
          aria-label="${day} ${this.getMonthName()}, ${this.currentYear}${isToday ? ', today' : ''}"
          @click=${() => this.handleDayClick(day)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.handleDayClick(day);
            }
          }}
        >
          ${day}
        </div>
      `);
    }

    return days;
  }

  private getMonthName(): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[this.currentMonth];
  }

  render() {
    return html`
      <div class="calendar" role="application" aria-label="Calendar">
        <div class="header">
          <button
            @click=${this.previousMonth}
            aria-label="Previous month"
          >
            ← Prev
          </button>
          <div class="month-year" aria-live="polite">
            ${this.getMonthName()} ${this.currentYear}
          </div>
          <button
            @click=${this.nextMonth}
            aria-label="Next month"
          >
            Next →
          </button>
        </div>
        <div class="days-grid" role="grid">
          <div class="day-name" role="columnheader">Sun</div>
          <div class="day-name" role="columnheader">Mon</div>
          <div class="day-name" role="columnheader">Tue</div>
          <div class="day-name" role="columnheader">Wed</div>
          <div class="day-name" role="columnheader">Thu</div>
          <div class="day-name" role="columnheader">Fri</div>
          <div class="day-name" role="columnheader">Sat</div>
          ${this.renderDays()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-calendar': CalendarComponent;
  }
}
