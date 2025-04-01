# Navigation Component

The Navigation component is a responsive navigation bar that provides navigation links and authentication controls for the YouGene application.

## Features

- Responsive design with mobile-first approach
- Mobile menu with smooth transitions
- Authentication-aware navigation links
- Active link highlighting
- Glass-morphism effect
- Accessible button controls

## Component Structure

### Props
None - The component is self-contained and uses React Router and Auth Context internally.

### State
- `isMobileMenuOpen`: boolean - Controls the visibility of the mobile menu

### Dependencies
- React Router (`useLocation`, `useNavigate`, `Link`)
- Auth Context (`useAuth`)
- Tailwind CSS for styling

## Usage

```tsx
import Navigation from './components/Navigation';

// In your app layout
<Navigation />
```

## Responsive Behavior

### Desktop (md and above)
- Full horizontal navigation bar
- All links visible inline
- No mobile menu button

### Mobile (below md)
- Collapsible menu with hamburger button
- Smooth transition animations
- Stacked navigation links
- Backdrop blur effect

## Styling

The component uses Tailwind CSS with custom classes:
- `glass`: Applies a glass-morphism effect
- `gradient-text`: Applies gradient text effect to the logo
- Responsive padding and spacing
- Hover and active states for interactive elements

## Accessibility

- Proper ARIA attributes for mobile menu button
- Screen reader support with `sr-only` text
- Keyboard navigation support
- Focus states for interactive elements

## Best Practices

1. The component should be placed at the top of your application layout
2. Ensure the AuthContext is properly set up in your application
3. The component uses fixed positioning, so account for its height in your layout
4. Customize the glass effect and colors through your Tailwind configuration

## Customization

You can customize the appearance by:
1. Modifying the Tailwind classes
2. Adjusting the glass effect in your CSS
3. Changing the color scheme through your theme configuration
4. Modifying the transition animations 