# Toast Notification System - Implementation Guide

## 🔧 Complete Implementation Details

### File Structure

```
src/
├── Toast/
│   ├── types.ts              # TypeScript type definitions
│   ├── ToastService.ts       # Context and custom hook
│   └── ToastProvider.tsx     # Main provider component
├── helper/
│   └── helper.ts             # Utility functions
├── App.tsx                   # Example usage
└── main.tsx                  # Application entry point
```

## 📝 Code Walkthrough

### 1. Type Definitions (types.ts)

```typescript
// Define the possible toast types
export type ToastType = 'success' | 'warning' | 'error' | 'info';

// Structure of a single toast
export interface Toast {
  id: string;              // Unique identifier
  component: React.ReactNode;  // Toast content to render
}

// Context API type definition
export interface ToastContextType {
  open: (component: React.ReactNode, timeout?: number) => void;
  close: (id: string) => void;
}
```

**Why these types?**
- `ToastType`: Ensures only valid toast types are used
- `Toast`: Defines the structure stored in state
- `ToastContextType`: Provides type safety for context consumers

### 2. Context & Hook (ToastService.ts)

```typescript
import { createContext, useContext } from "react";
import { ToastContextType } from "./types";

// Create context with null as initial value
const ToastContext = createContext<ToastContextType | null>(null);

// Custom hook with error handling
const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  
  // Throw error if used outside provider
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  
  return context;
};

export { useToast };
export default ToastContext;
```

**Key Features:**
- Type-safe context creation
- Error handling for misuse
- Clean API with custom hook

### 3. Provider Component (ToastProvider.tsx)

```typescript
import { useState, ReactNode } from "react";
import ToastContext from "./ToastService";
import { X } from "react-feather";
import { generateUniqueId } from "../helper/helper";
import { Toast } from "./types";

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  // State to store all active toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Close a specific toast by ID
  const close = (id: string) =>
    setToasts((toasts) => toasts.filter((toast) => toast?.id !== id));

  // Open a new toast
  const open = (component: ReactNode, timeout = 5000) => {
    const id = generateUniqueId();
    
    // Add toast to state
    setToasts((toasts) => [...toasts, { id, component }]);
    
    // Schedule auto-dismiss
    setTimeout(() => close(id), timeout);
  };

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      
      {/* Toast container - fixed position */}
      <div className="space-y-2 absolute bottom-4 right-4 z-50">
        {toasts.map(({ id, component }) => (
          <div key={id} className="relative">
            {/* Close button */}
            <button
              onClick={() => close(id)}
              className="absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 hover:bg-gray-200/40 text-gray-800/60 z-10 transition-colors"
              aria-label="Close toast"
            >
              <X size={16} />
            </button>
            
            {/* Toast content */}
            {component}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
```

**Implementation Details:**

1. **State Management:**
   ```typescript
   const [toasts, setToasts] = useState<Toast[]>([]);
   ```
   - Array of toast objects
   - Each has unique ID and component

2. **Close Function:**
   ```typescript
   const close = (id: string) =>
     setToasts((toasts) => toasts.filter((toast) => toast?.id !== id));
   ```
   - Filters out toast with matching ID
   - Uses functional update for consistency

3. **Open Function:**
   ```typescript
   const open = (component: ReactNode, timeout = 5000) => {
     const id = generateUniqueId();
     setToasts((toasts) => [...toasts, { id, component }]);
     setTimeout(() => close(id), timeout);
   };
   ```
   - Generates unique ID
   - Adds to state
   - Schedules auto-dismiss

4. **Rendering:**
   ```typescript
   {toasts.map(({ id, component }) => (
     <div key={id} className="relative">
       <button onClick={() => close(id)}>X</button>
       {component}
     </div>
   ))}
   ```
   - Maps over toasts array
   - Renders each with close button
   - Uses ID as React key

### 4. Helper Functions (helper.ts)

```typescript
export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}
```

**How it works:**
- `Date.now()`: Current timestamp in milliseconds
- `.toString(36)`: Convert to base-36 (0-9, a-z)
- `Math.random()`: Random number 0-1
- `.substring(2, 10)`: Take 8 characters
- Result: `"lx3k2m-abc123def"`

**Why this approach?**
- Timestamp ensures uniqueness over time
- Random part prevents collisions in same millisecond
- Base-36 keeps it short and readable

### 5. Usage Example (App.tsx)

```typescript
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "react-feather";
import { useToast } from "./Toast/ToastService";
import { ToastType } from "./Toast/types";

// Configuration for each toast type
const TOAST_CONFIG: Record<ToastType, { 
  icon: JSX.Element; 
  bgColor: string; 
  title: string 
}> = {
  success: {
    icon: <CheckCircle size={24} />,
    bgColor: "bg-green-500",
    title: "Success",
  },
  warning: {
    icon: <AlertTriangle size={24} />,
    bgColor: "bg-yellow-400",
    title: "Warning",
  },
  error: {
    icon: <AlertCircle size={24} />,
    bgColor: "bg-red-600",
    title: "Error",
  },
  info: {
    icon: <Info size={24} />,
    bgColor: "bg-blue-500",
    title: "Info",
  },
};

function App() {
  const toast = useToast();

  const handleToast = (type: ToastType) => {
    const config = TOAST_CONFIG[type];
    
    toast.open(
      <div className={`${config.bgColor} text-white p-4 rounded-lg shadow-lg min-w-[300px] flex items-center gap-3`}>
        {config.icon}
        <div>
          <h3 className="font-semibold">{config.title}</h3>
          <p className="text-sm">This is a {type} message!</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-4 ml-8 mt-8 btn-group">
      <button className="bg-green-500" onClick={() => handleToast("success")}>
        Success
      </button>
      <button className="bg-yellow-400" onClick={() => handleToast("warning")}>
        Warning
      </button>
      <button className="bg-red-600" onClick={() => handleToast("error")}>
        Error
      </button>
      <button className="bg-blue-500" onClick={() => handleToast("info")}>
        Info
      </button>
    </div>
  );
}

export default App;
```

## 🎨 Styling Guide

### Tailwind Classes Used

```css
/* Toast Container */
.space-y-2          /* Vertical spacing between toasts */
.absolute           /* Fixed positioning */
.bottom-4           /* 1rem from bottom */
.right-4            /* 1rem from right */
.z-50               /* High z-index for overlay */

/* Close Button */
.absolute           /* Position relative to toast */
.top-2 .right-2     /* Top-right corner */
.p-1                /* Padding */
.rounded-lg         /* Rounded corners */
.bg-gray-200/20     /* Semi-transparent background */
.hover:bg-gray-200/40  /* Hover effect */
.z-10               /* Above toast content */
.transition-colors  /* Smooth color transition */

/* Toast Content */
.p-4                /* Padding */
.rounded-lg         /* Rounded corners */
.shadow-lg          /* Drop shadow */
.min-w-[300px]      /* Minimum width */
.flex               /* Flexbox layout */
.items-center       /* Vertical center */
.gap-3              /* Gap between items */
```

### Custom Styles (index.css)

```css
@layer components {
  .btn-group > button {
    @apply text-white px-4 py-2 rounded-md cursor-pointer 
           transition-transform duration-200 hover:scale-105;
  }
}
```

## 🔍 Advanced Usage Examples

### 1. Custom Timeout

```typescript
// Short duration (2 seconds)
toast.open(<MyToast />, 2000);

// Long duration (10 seconds)
toast.open(<MyToast />, 10000);

// No auto-dismiss
toast.open(<MyToast />, Infinity);
```

### 2. Programmatic Close

```typescript
const showToast = () => {
  const id = generateUniqueId();
  
  toast.open(
    <div>
      <p>Processing...</p>
      <button onClick={() => toast.close(id)}>Cancel</button>
    </div>
  );
};
```

### 3. Toast with Actions

```typescript
const showConfirmToast = () => {
  toast.open(
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3>Confirm Action</h3>
      <p>Are you sure?</p>
      <div className="flex gap-2 mt-2">
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>,
    10000 // Longer timeout for user interaction
  );
};
```

### 4. Toast with Progress Bar

```typescript
const showProgressToast = () => {
  toast.open(
    <div className="bg-blue-500 text-white p-4 rounded-lg">
      <p>Uploading...</p>
      <div className="w-full bg-white/20 rounded-full h-2 mt-2">
        <div className="bg-white h-2 rounded-full w-1/2"></div>
      </div>
    </div>
  );
};
```

### 5. Multiple Toasts

```typescript
const showMultipleToasts = () => {
  toast.open(<SuccessToast />, 3000);
  
  setTimeout(() => {
    toast.open(<WarningToast />, 3000);
  }, 1000);
  
  setTimeout(() => {
    toast.open(<ErrorToast />, 3000);
  }, 2000);
};
```

## 🐛 Common Issues & Solutions

### Issue 1: Toast Not Showing

**Problem:**
```typescript
// ❌ Wrong - useToast outside provider
function App() {
  const toast = useToast(); // Error!
  return <div>...</div>;
}

createRoot(root).render(<App />);
```

**Solution:**
```typescript
// ✅ Correct - wrap with provider
createRoot(root).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
```

### Issue 2: TypeScript Errors

**Problem:**
```typescript
// ❌ Wrong - missing types
const toast = useToast();
toast.open("Hello"); // Type error!
```

**Solution:**
```typescript
// ✅ Correct - pass ReactNode
toast.open(<div>Hello</div>);
```

### Issue 3: Toasts Not Dismissing

**Problem:**
```typescript
// ❌ Wrong - timeout cleared
const open = (component, timeout) => {
  const id = generateUniqueId();
  setToasts([...toasts, { id, component }]);
  
  const timer = setTimeout(() => close(id), timeout);
  clearTimeout(timer); // Immediately cleared!
};
```

**Solution:**
```typescript
// ✅ Correct - don't clear timeout
const open = (component, timeout) => {
  const id = generateUniqueId();
  setToasts([...toasts, { id, component }]);
  setTimeout(() => close(id), timeout);
};
```

### Issue 4: Missing Return in Map

**Problem:**
```typescript
// ❌ Wrong - no return
{toasts.map(({ id, component }) => {
  <div key={id}>{component}</div>;
})}
```

**Solution:**
```typescript
// ✅ Correct - implicit return with ()
{toasts.map(({ id, component }) => (
  <div key={id}>{component}</div>
))}

// ✅ Also correct - explicit return
{toasts.map(({ id, component }) => {
  return <div key={id}>{component}</div>;
})}
```

## 🎯 Best Practices

### 1. Type Safety

```typescript
// ✅ Always use types
const toast = useToast(); // Returns ToastContextType
const handleToast = (type: ToastType) => { ... }

// ❌ Avoid any
const handleToast = (type: any) => { ... }
```

### 2. Error Handling

```typescript
// ✅ Check context availability
const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
```

### 3. Functional Updates

```typescript
// ✅ Use functional updates
setToasts((prev) => [...prev, newToast]);

// ❌ Avoid direct state reference
setToasts([...toasts, newToast]);
```

### 4. Unique Keys

```typescript
// ✅ Use unique IDs as keys
{toasts.map(({ id, component }) => (
  <div key={id}>{component}</div>
))}

// ❌ Avoid index as key
{toasts.map((toast, index) => (
  <div key={index}>{toast.component}</div>
))}
```

### 5. Accessibility

```typescript
// ✅ Add ARIA labels
<button
  onClick={() => close(id)}
  aria-label="Close toast"
>
  <X size={16} />
</button>

// ✅ Use semantic HTML
<div role="alert" aria-live="polite">
  {component}
</div>
```

## 📊 Performance Optimization

### 1. Memoization

```typescript
import { useMemo } from 'react';

const toastValue = useMemo(
  () => ({ open, close }),
  [open, close]
);

return (
  <ToastContext.Provider value={toastValue}>
    {children}
  </ToastContext.Provider>
);
```

### 2. Cleanup

```typescript
const open = (component: ReactNode, timeout = 5000) => {
  const id = generateUniqueId();
  setToasts((toasts) => [...toasts, { id, component }]);
  
  const timer = setTimeout(() => close(id), timeout);
  
  // Return cleanup function
  return () => clearTimeout(timer);
};
```

### 3. Limit Toast Count

```typescript
const MAX_TOASTS = 5;

const open = (component: ReactNode, timeout = 5000) => {
  const id = generateUniqueId();
  
  setToasts((toasts) => {
    const newToasts = [...toasts, { id, component }];
    
    // Keep only last MAX_TOASTS
    return newToasts.slice(-MAX_TOASTS);
  });
  
  setTimeout(() => close(id), timeout);
};
```

## 🧪 Testing Considerations

### Unit Tests

```typescript
describe('ToastProvider', () => {
  it('should add toast when open is called', () => {
    // Test implementation
  });
  
  it('should remove toast when close is called', () => {
    // Test implementation
  });
  
  it('should auto-dismiss after timeout', () => {
    // Test implementation
  });
});
```

### Integration Tests

```typescript
describe('Toast Integration', () => {
  it('should show toast when button is clicked', () => {
    // Test implementation
  });
  
  it('should close toast when X is clicked', () => {
    // Test implementation
  });
});
```

---

**This implementation guide provides everything needed to understand, use, and extend the toast notification system.**
