# ⭐ Rating Component

A professional, fully-featured star rating web component built with Lit, TypeScript, and Shadow DOM. Perfect for modern web applications requiring customizable rating functionality.

![Rating Component Demo](https://img.shields.io/badge/Lit-3.3.1-blue?logo=lit)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- ⚡ **Lightweight**: Built with Lit framework for optimal performance
- 🔷 **TypeScript**: Fully typed for better development experience
- 🎨 **CSS3**: Modern styling with smooth animations and transitions
- 🌓 **Shadow DOM**: Encapsulated styles prevent CSS conflicts
- ♿ **Accessible**: ARIA attributes and keyboard navigation support
- 📱 **Responsive**: Works seamlessly on all devices
- 🎯 **Customizable**: Multiple sizes, themes, and configurations
- 🔧 **Framework Agnostic**: Works with any JavaScript framework or vanilla JS
- 🌙 **Dark Mode**: Automatic dark mode support
- ⌨️ **Keyboard Navigation**: Full keyboard accessibility (Arrow keys, Enter, Space)

## 📦 Installation

### NPM
```bash
npm install @your-username/rating-component
```

### Yarn
```bash
yarn add @your-username/rating-component
```

### CDN
```html
<script type="module" src="https://unpkg.com/@your-username/rating-component"></script>
```

## 🎯 Quick Start

### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="node_modules/@your-username/rating-component/dist/rating-component.js"></script>
</head>
<body>
  <rating-component value="3"></rating-component>
</body>
</html>
```

### React/Next.js
```jsx
import '@your-username/rating-component';

function App() {
  return (
    <rating-component 
      value={3} 
      max-rating={5}
      size="large"
    />
  );
}
```

### Vue
```vue
<template>
  <rating-component 
    :value="3" 
    :max-rating="5"
    size="large"
  />
</template>

<script>
import '@your-username/rating-component';

export default {
  name: 'App'
}
</script>
```

### Angular
```typescript
// app.component.ts
import '@your-username/rating-component';

// Add CUSTOM_ELEMENTS_SCHEMA to your module
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

```html
<!-- app.component.html -->
<rating-component [value]="3" [max-rating]="5"></rating-component>
```

## 📚 API Documentation

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current rating value |
| `max-rating` | `number` | `5` | Maximum number of stars |
| `readonly` | `boolean` | `false` | Disable user interactions |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the stars |
| `show-label` | `boolean` | `true` | Show/hide rating label |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `rating-change` | `{ value: number, oldValue: number }` | Fired when rating value changes |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `value` | `number` | `void` | Set rating value programmatically |
| `reset()` | - | `void` | Reset rating to 0 |

## 🎨 Usage Examples

### Basic Usage
```html
<rating-component value="3"></rating-component>
```

### Custom Size
```html
<!-- Small -->
<rating-component value="4" size="small"></rating-component>

<!-- Medium (default) -->
<rating-component value="4" size="medium"></rating-component>

<!-- Large -->
<rating-component value="4" size="large"></rating-component>
```

### Custom Maximum Rating
```html
<!-- 10-star rating -->
<rating-component value="7" max-rating="10"></rating-component>

<!-- 3-star rating -->
<rating-component value="2" max-rating="3"></rating-component>
```

### Without Label
```html
<rating-component value="4" show-label="false"></rating-component>
```

### Read-only Mode
```html
<rating-component value="4.5" readonly></rating-component>
```

### Event Handling (JavaScript)
```javascript
const rating = document.querySelector('rating-component');

// Listen to rating changes
rating.addEventListener('rating-change', (event) => {
  console.log('New rating:', event.detail.value);
  console.log('Old rating:', event.detail.oldValue);
  
  // Send to backend, update UI, etc.
  updateRatingOnServer(event.detail.value);
});

// Set value programmatically
rating.value = 5;

// Get current value
console.log('Current rating:', rating.value);
```

### Event Handling (TypeScript)
```typescript
import { RatingComponent } from '@your-username/rating-component';

const rating = document.querySelector('rating-component') as RatingComponent;

rating.addEventListener('rating-change', (event: CustomEvent) => {
  const { value, oldValue } = event.detail;
  console.log(`Rating changed from ${oldValue} to ${value}`);
});
```

## 🎨 Styling & Customization

The component uses **external CSS files** combined with CSS custom properties for easy theming.

### External CSS Architecture

The component demonstrates best practices by using:
1. **External stylesheet** (`rating-component.css`) - Main styles
2. **CSS custom properties** - For theming across Shadow DOM boundary
3. **Inline styles** - For component-specific features

```typescript
// Component imports external CSS
import externalStyles from './rating-component.css?inline';

static styles = [
  unsafeCSS(externalStyles),  // External CSS
  css`...`                     // Additional inline styles
];
```

### Available CSS Variables

The component uses CSS custom properties for easy theming:

```css
rating-component {
  /* Star Colors */
  --rating-star-empty: #d1d5db;
  --rating-star-filled: #fbbf24;
  --rating-star-hover: #f59e0b;
  
  /* Label Colors */
  --rating-label-bg: #f3f4f6;
  --rating-label-text: #374151;
  --rating-label-active-bg: #fef3c7;
  --rating-label-active-text: #92400e;
  
  /* Sizes */
  --rating-star-small: 16px;
  --rating-star-medium: 24px;
  --rating-star-large: 32px;
  --rating-gap: 4px;
  --rating-label-gap: 8px;
  
  /* Effects */
  --rating-transition-speed: 0.2s;
  --rating-focus-color: #3b82f6;
}
```

### Custom Theme Examples

#### Red Theme
```html
<style>
  .theme-red {
    --rating-star-filled: #ef4444;
    --rating-star-hover: #dc2626;
    --rating-label-active-bg: #fee2e2;
    --rating-label-active-text: #991b1b;
  }
</style>

<rating-component class="theme-red" value="4"></rating-component>
```

#### Green Theme
```html
<style>
  .theme-green {
    --rating-star-filled: #10b981;
    --rating-star-hover: #059669;
    --rating-label-active-bg: #d1fae5;
    --rating-label-active-text: #065f46;
  }
</style>

<rating-component class="theme-green" value="5"></rating-component>
```

#### Purple Theme
```html
<style>
  .theme-purple {
    --rating-star-filled: #8b5cf6;
    --rating-star-hover: #7c3aed;
    --rating-label-active-bg: #ede9fe;
    --rating-label-active-text: #5b21b6;
  }
</style>

<rating-component class="theme-purple" value="3"></rating-component>
```

### Inline Style Customization
```html
<rating-component 
  value="4"
  style="
    --rating-star-filled: #ec4899;
    --rating-star-medium: 32px;
    --rating-gap: 8px;
  ">
</rating-component>
```

### Spacing Modes

#### Compact Mode
```css
.compact {
  --rating-gap: 2px;
  --rating-label-gap: 4px;
}
```

#### Spacious Mode
```css
.spacious {
  --rating-gap: 8px;
  --rating-label-gap: 16px;
}
```

### External CSS Demo

Check out `external-css-demo.html` for a complete demonstration of:
- 🌈 Multiple color themes
- 📏 Spacing customization
- 📐 Size customization
- 🎨 Advanced theming examples
- 📚 Complete CSS variable reference

```bash
# View the external CSS demo
npm run dev
# Then open http://localhost:5173/external-css-demo.html
```
## ♿ Accessibility

This component follows WAI-ARIA best practices:

- ✅ ARIA roles and attributes
- ✅ Keyboard navigation (Arrow keys, Enter, Space)
- ✅ Focus management
- ✅ Screen reader support
- ✅ Semantic HTML
- ✅ Reduced motion support

### Keyboard Navigation
- `Arrow Left/Right`: Navigate between stars
- `Arrow Up/Down`: Navigate between stars
- `Enter/Space`: Select rating
- `Tab`: Focus on component

## 🏗️ Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/rating-component.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
rating-component/
├── src/
│   ├── rating-component.ts       # Main component
│   ├── rating-component.css      # External styles
│   └── index.css                 # Global styles
├── public/                        # Static assets
├── index.html                     # Demo page
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Build Configuration

### Vite Configuration for Library Mode
```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/rating-component.ts',
      formats: ['es'],
      fileName: 'rating-component'
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'Lit'
        }
      }
    }
  }
});
```

## 📦 Publishing to NPM

### Prepare for Publishing
1. Update `package.json`:
```json
{
  "name": "@your-username/rating-component",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/rating-component.js",
  "module": "./dist/rating-component.js",
  "types": "./dist/rating-component.d.ts",
  "exports": {
    ".": {
      "import": "./dist/rating-component.js",
      "types": "./dist/rating-component.d.ts"
    }
  },
  "files": ["dist"],
  "keywords": ["lit", "web-component", "rating", "stars", "typescript"]
}
```

2. Build the project:
```bash
npm run build
```

3. Login to NPM:
```bash
npm login
```

4. Publish:
```bash
npm publish --access public
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [Lit](https://lit.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [CSS3](https://www.w3.org/Style/CSS/)

## 📞 Support

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/rating-component/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/rating-component/discussions)

## 🗺️ Roadmap

- [ ] Half-star support
- [ ] Custom icons (hearts, thumbs, etc.)
- [ ] Animation presets
- [ ] RTL support
- [ ] i18n support
- [ ] More themes

---

Made with ❤️ by [Your Name](https://github.com/your-username)
