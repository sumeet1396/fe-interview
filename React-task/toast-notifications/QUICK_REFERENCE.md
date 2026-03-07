# Toast Notification System - Quick Reference

## 🚀 Quick Start (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
http://localhost:5173
```

## 📦 Basic Usage

```tsx
import { useToast } from './Toast/ToastService';

function MyComponent() {
  const toast = useToast();
  
  const showToast = () => {
    toast.open(
      <div className="bg-green-500 text-white p-4 rounded-lg">
        Success!
      </div>
    );
  };
  
  return <button onClick={showToast}>Show Toast</button>;
}
```

## 🎨 Toast Types

```tsx
// Success
toast.open(<SuccessToast />, 5000);

// Error
toast.open(<ErrorToast />, 5000);

// Warning
toast.open(<WarningToast />, 5000);

// Info
toast.open(<InfoToast />, 5000);
```

## ⚙️ API Reference

### `useToast()`

Returns: `{ open, close }`

```tsx
const toast = useToast();
```

### `toast.open(component, timeout?)`

- `component`: ReactNode - Toast content
- `timeout`: number - Auto-dismiss time (default: 5000ms)

```tsx
toast.open(<div>Hello</div>, 3000);
```

### `toast.close(id)`

- `id`: string - Toast identifier

```tsx
toast.close("abc123");
```

## 🎯 Common Patterns

### Pattern 1: Simple Toast
```tsx
toast.open(<div className="bg-blue-500 p-4">Message</div>);
```

### Pattern 2: With Icon
```tsx
toast.open(
  <div className="flex items-center gap-2 bg-green-500 p-4">
    <CheckCircle />
    <span>Success!</span>
  </div>
);
```

### Pattern 3: With Actions
```tsx
toast.open(
  <div className="bg-white p-4">
    <p>Confirm?</p>
    <button onClick={handleYes}>Yes</button>
    <button onClick={handleNo}>No</button>
  </div>
);
```

### Pattern 4: Custom Timeout
```tsx
// 2 seconds
toast.open(<MyToast />, 2000);

// 10 seconds
toast.open(<MyToast />, 10000);

// No auto-dismiss
toast.open(<MyToast />, Infinity);
```

## 🔧 Configuration

### Toast Position

Edit `ToastProvider.tsx`:

```tsx
// Bottom-right (default)
<div className="absolute bottom-4 right-4">

// Top-right
<div className="absolute top-4 right-4">

// Bottom-left
<div className="absolute bottom-4 left-4">

// Top-left
<div className="absolute top-4 left-4">

// Center
<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
```

### Default Timeout

Edit `ToastProvider.tsx`:

```tsx
const open = (component: ReactNode, timeout = 3000) => {
  // Changed from 5000 to 3000
```

## 🎨 Styling Examples

### Success Toast
```tsx
<div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
  <h3 className="font-bold">Success!</h3>
  <p>Operation completed</p>
</div>
```

### Error Toast
```tsx
<div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
  <h3 className="font-bold">Error!</h3>
  <p>Something went wrong</p>
</div>
```

### Warning Toast
```tsx
<div className="bg-yellow-400 text-gray-900 p-4 rounded-lg shadow-lg">
  <h3 className="font-bold">Warning!</h3>
  <p>Please check your input</p>
</div>
```

### Info Toast
```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
  <h3 className="font-bold">Info</h3>
  <p>Here's some information</p>
</div>
```

## 🐛 Troubleshooting

### Toast not showing?
```tsx
// ✅ Ensure ToastProvider wraps your app
<ToastProvider>
  <App />
</ToastProvider>
```

### TypeScript error?
```tsx
// ❌ Wrong
toast.open("Hello");

// ✅ Correct
toast.open(<div>Hello</div>);
```

### Toast not dismissing?
```tsx
// ✅ Check timeout value
toast.open(<MyToast />, 5000); // 5 seconds
```

### Context error?
```tsx
// ✅ Use hook inside component
function MyComponent() {
  const toast = useToast(); // ✅ Inside component
  // ...
}

// ❌ Don't use outside
const toast = useToast(); // ❌ Outside component
function MyComponent() { }
```

## 📊 TypeScript Types

```typescript
// Toast type
type ToastType = 'success' | 'warning' | 'error' | 'info';

// Toast object
interface Toast {
  id: string;
  component: React.ReactNode;
}

// Context type
interface ToastContextType {
  open: (component: React.ReactNode, timeout?: number) => void;
  close: (id: string) => void;
}
```

## 🎯 Best Practices

### ✅ Do's

```tsx
// Use TypeScript types
const handleToast = (type: ToastType) => { }

// Use functional updates
setToasts((prev) => [...prev, newToast]);

// Add accessibility
<button aria-label="Close toast">X</button>

// Keep messages concise
<p>File uploaded successfully</p>

// Use appropriate types
toast.open(<SuccessToast />); // For success
```

### ❌ Don'ts

```tsx
// Don't use any
const handleToast = (type: any) => { }

// Don't use index as key
{toasts.map((t, i) => <div key={i} />)}

// Don't show too many toasts
// Limit to 3-5 at a time

// Don't use very long timeouts
toast.open(<Toast />, 60000); // Too long

// Don't forget to wrap with provider
<App /> // Missing ToastProvider
```

## 🔍 Debugging

### Check Console
```tsx
// Add logging
const open = (component, timeout) => {
  console.log('Opening toast:', { component, timeout });
  // ...
};
```

### Check State
```tsx
// Log state changes
useEffect(() => {
  console.log('Toasts:', toasts);
}, [toasts]);
```

### Check Rendering
```tsx
// Add visual indicator
<div className="border-2 border-red-500">
  {component}
</div>
```

## 📚 Documentation Files

- **README.md** - Complete guide
- **ARCHITECTURE.md** - Visual diagrams
- **IMPLEMENTATION.md** - Code details
- **FIXES.md** - Bug fixes summary
- **QUICK_REFERENCE.md** - This file

## 🎓 Learning Path

1. **Start here** - Quick Reference (this file)
2. **Read** - README.md for full guide
3. **Study** - ARCHITECTURE.md for design
4. **Deep dive** - IMPLEMENTATION.md for details
5. **Review** - FIXES.md for improvements

## 💡 Tips

- Keep toast messages short and clear
- Use appropriate colors for each type
- Don't show too many toasts at once
- Test on different screen sizes
- Add animations for better UX
- Consider accessibility
- Handle errors gracefully

## 🚀 Next Steps

1. Customize toast styles
2. Add animations
3. Implement toast queue
4. Add sound notifications
5. Create more toast types
6. Add swipe to dismiss
7. Implement progress bars

## 📞 Quick Help

**Error: "useToast must be used within ToastProvider"**
→ Wrap your app with `<ToastProvider>`

**Error: Type 'string' is not assignable to type 'ReactNode'**
→ Use `<div>text</div>` instead of `"text"`

**Toast not visible**
→ Check z-index and positioning

**Toast not dismissing**
→ Check timeout value and setTimeout

---

**Need more details? Check the full documentation files!**
