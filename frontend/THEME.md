# YouGene Frontend Theme Documentation

## Color System

### Primary Colors
```css
--primary: #6366f1    /* Indigo - Main brand color */
--primary-dark: #4f46e5  /* Darker indigo for hover states */
--secondary: #8b5cf6    /* Purple - Complementary color */
--accent: #ec4899      /* Pink - Accent color */
--background: #0f172a  /* Dark Blue - Main background */
--text: #f8fafc       /* Light Gray - Primary text color */
```

### Usage Guidelines
- **Primary**: Use for main CTAs, important UI elements, and brand identity
- **Primary Dark**: Use for hover states of primary elements
- **Secondary**: Use for supporting elements and secondary actions
- **Accent**: Use sparingly for highlighting special features or important elements
- **Background**: Main app background color
- **Text**: Default text color, use with opacity modifiers for hierarchy

### Opacity Modifiers
- High emphasis text: `text-white` or `text-text`
- Medium emphasis: `text-white/90` or `text-text/90`
- Low emphasis: `text-white/80` or `text-text/80`

## Components

### Glass Effect
```css
.glass {
  @apply bg-white/10 backdrop-blur-lg border border-white/10;
}
```
Used for cards, modals, and floating elements to create depth.

### Buttons
1. **Primary Button**
```css
bg-white text-primary font-semibold rounded-xl shadow-xl 
hover:shadow-white/20 hover:bg-white/90
```

2. **Secondary Button**
```css
bg-white/10 backdrop-blur-lg text-white font-semibold rounded-xl shadow-xl 
hover:bg-white/20
```

### Cards
```css
bg-white/10 backdrop-blur-lg rounded-xl shadow-xl 
hover:bg-white/20 transition-all duration-300
```

### Text Styles
- **H1**: `text-6xl sm:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg`
- **H2**: `text-xl sm:text-2xl lg:text-3xl text-white font-light tracking-wider`
- **Body**: `text-lg text-white/90`
- **Caption**: `text-sm text-white/80`

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
  'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif
```

### Font Sizes
- Base: 16px
- Scale:
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)
  - 3xl: 1.875rem (30px)
  - 4xl: 2.25rem (36px)
  - 5xl: 3rem (48px)
  - 6xl: 3.75rem (60px)
  - 7xl: 4.5rem (72px)
  - 8xl: 6rem (96px)

## Animations

### DNA Helix
```css
@keyframes dna-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Gradient Text
```css
.gradient-text {
  @apply bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text;
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
}
```

## Best Practices

1. **Contrast & Readability**
   - Always use appropriate text opacity for hierarchy
   - Add drop shadows to text on complex backgrounds
   - Maintain WCAG 2.1 AA contrast ratios

2. **Responsive Design**
   - Use responsive font sizes (sm:, lg:, etc.)
   - Ensure touch targets are at least 44px on mobile
   - Test glass effects on different devices

3. **Performance**
   - Use backdrop-blur-lg sparingly
   - Optimize animations for 60fps
   - Consider reducing effects on mobile

4. **Accessibility**
   - Maintain color contrast ratios
   - Provide focus states for interactive elements
   - Ensure text remains readable at all sizes 