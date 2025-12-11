import './select-dropdown';
import type { DropdownOption } from './select-dropdown';

// Sample data for different dropdowns
const languages: DropdownOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

const frameworks: DropdownOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'lit', label: 'Lit' },
];

const fruits: DropdownOption[] = [
  { value: 'apple', label: '🍎 Apple' },
  { value: 'banana', label: '🍌 Banana' },
  { value: 'orange', label: '🍊 Orange' },
  { value: 'grape', label: '🍇 Grape' },
  { value: 'strawberry', label: '🍓 Strawberry' },
];

const countries: DropdownOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'in', label: 'India' },
];

// Initialize dropdowns after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Dropdown 1: Languages
  const dropdown1 = document.getElementById('dropdown1') as any;
  if (dropdown1) {
    dropdown1.options = languages;
    dropdown1.placeholder = 'Select a language';
    dropdown1.addEventListener('change', (e: CustomEvent) => {
      const output = document.getElementById('output1');
      if (output) {
        output.textContent = `Selected: ${e.detail.label} (${e.detail.value})`;
      }
    });
  }

  // Dropdown 2: Frameworks
  const dropdown2 = document.getElementById('dropdown2') as any;
  if (dropdown2) {
    dropdown2.options = frameworks;
    dropdown2.placeholder = 'Select a framework';
    dropdown2.addEventListener('change', (e: CustomEvent) => {
      const output = document.getElementById('output2');
      if (output) {
        output.textContent = `Selected: ${e.detail.label} (${e.detail.value})`;
      }
    });
  }

  // Dropdown 3: Fruits
  const dropdown3 = document.getElementById('dropdown3') as any;
  if (dropdown3) {
    dropdown3.options = fruits;
    dropdown3.placeholder = 'Select a fruit';
    dropdown3.value = 'apple'; // Pre-select
    dropdown3.addEventListener('change', (e: CustomEvent) => {
      const output = document.getElementById('output3');
      if (output) {
        output.textContent = `Selected: ${e.detail.label} (${e.detail.value})`;
      }
    });
  }

  // Dropdown 4: Countries
  const dropdown4 = document.getElementById('dropdown4') as any;
  if (dropdown4) {
    dropdown4.options = countries;
    dropdown4.placeholder = 'Select a country';
    dropdown4.addEventListener('change', (e: CustomEvent) => {
      const output = document.getElementById('output4');
      if (output) {
        output.textContent = `Selected: ${e.detail.label} (${e.detail.value})`;
      }
    });
  }

  // Dropdown 5: Disabled
  const dropdown5 = document.getElementById('dropdown5') as any;
  if (dropdown5) {
    dropdown5.options = languages;
    dropdown5.placeholder = 'This is disabled';
  }
});
