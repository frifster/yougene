# Component Documentation

## Core Components

### Navigation
```typescript
import { Navigation } from '@/components/Navigation';

<Navigation />
```
The main navigation component that appears on all pages. Includes mobile responsive menu and user controls.

**Features:**
- Responsive design with mobile menu
- Active route highlighting
- User profile dropdown
- Glass effect styling

### Layout
```typescript
import { Layout } from '@/components/Layout';

<Layout>
  {children}
</Layout>
```
Base layout wrapper that provides consistent page structure.

**Props:**
- `children`: React.ReactNode
- `showNav?`: boolean (default: true)
- `className?`: string

### Card
```typescript
import { Card } from '@/components/Card';

<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```
Glass-effect card component with optional header and footer.

**Props:**
- `variant?: 'default' | 'glass' | 'solid'`
- `className?: string`
- `children: React.ReactNode`

## Monster Components

### MonsterCard
```typescript
import { MonsterCard } from '@/components/monsters/MonsterCard';

<MonsterCard
  monster={monsterData}
  onClick={handleClick}
  showStats={true}
/>
```
Displays a monster with its basic information.

**Props:**
- `monster: Monster`
- `onClick?: (monster: Monster) => void`
- `showStats?: boolean`
- `size?: 'sm' | 'md' | 'lg'`

### MonsterViewer
```typescript
import { MonsterViewer } from '@/components/monsters/MonsterViewer';

<MonsterViewer
  modelUrl={monster.modelUrl}
  animations={monster.animations}
/>
```
3D viewer for monster models using Three.js.

**Props:**
- `modelUrl: string`
- `animations?: Animation[]`
- `autoRotate?: boolean`
- `controls?: boolean`

### GeneDisplay
```typescript
import { GeneDisplay } from '@/components/monsters/GeneDisplay';

<GeneDisplay genes={monster.genes} />
```
Visualizes monster genetic information.

**Props:**
- `genes: GeneStructure`
- `showDetails?: boolean`
- `highlightDominant?: boolean`

## Battle Components

### BattleArena
```typescript
import { BattleArena } from '@/components/battle/BattleArena';

<BattleArena
  player1={player1Monster}
  player2={player2Monster}
  onBattleEnd={handleBattleEnd}
/>
```
Handles battle visualization and interactions.

**Props:**
- `player1: Monster`
- `player2: Monster`
- `onBattleEnd?: (winner: Monster) => void`
- `battleMode?: 'realtime' | 'turnBased'`

## Form Components

### Button
```typescript
import { Button } from '@/components/Button';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```
Styled button component with variants.

**Props:**
- `variant?: 'primary' | 'secondary' | 'ghost'`
- `size?: 'sm' | 'md' | 'lg'`
- `isLoading?: boolean`
- `disabled?: boolean`
- `onClick?: () => void`

### Input
```typescript
import { Input } from '@/components/Input';

<Input
  label="Username"
  value={username}
  onChange={setUsername}
  error={errors.username}
/>
```
Form input component with label and error handling.

**Props:**
- `label: string`
- `value: string`
- `onChange: (value: string) => void`
- `error?: string`
- `type?: 'text' | 'password' | 'email'`

## Utility Components

### LoadingSpinner
```typescript
import { LoadingSpinner } from '@/components/LoadingSpinner';

<LoadingSpinner size="md" />
```
Loading indicator with customizable size.

**Props:**
- `size?: 'sm' | 'md' | 'lg'`
- `color?: string`

### Toast
```typescript
import { Toast } from '@/components/Toast';

<Toast
  message="Operation successful!"
  type="success"
  duration={3000}
/>
```
Notification toast component.

**Props:**
- `message: string`
- `type?: 'success' | 'error' | 'info' | 'warning'`
- `duration?: number`

### Modal
```typescript
import { Modal } from '@/components/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
>
  Modal content
</Modal>
```
Modal dialog component with backdrop.

**Props:**
- `isOpen: boolean`
- `onClose: () => void`
- `title?: string`
- `children: React.ReactNode`
- `size?: 'sm' | 'md' | 'lg'`

## Best Practices

1. **Component Organization**
   - Keep components focused and single-responsibility
   - Use composition over inheritance
   - Extract reusable logic into custom hooks

2. **Props**
   - Use TypeScript interfaces for prop types
   - Provide sensible defaults
   - Document required vs optional props

3. **Styling**
   - Follow theme guidelines
   - Use Tailwind utility classes
   - Keep responsive design in mind

4. **Performance**
   - Memoize callbacks with useCallback
   - Memoize expensive computations with useMemo
   - Use React.memo for pure components

5. **Accessibility**
   - Include ARIA labels
   - Ensure keyboard navigation
   - Maintain proper heading hierarchy 