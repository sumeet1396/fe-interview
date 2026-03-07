# Toast Notification System - Architecture & Flow Diagrams

## 🎨 Visual Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Application                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    ToastProvider                            │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │              Context State                            │  │ │
│  │  │  ┌────────────────────────────────────────────────┐  │  │ │
│  │  │  │  toasts: Toast[] = [                          │  │  │ │
│  │  │  │    { id: "abc", component: <Toast1/> },       │  │  │ │
│  │  │  │    { id: "def", component: <Toast2/> }        │  │  │ │
│  │  │  │  ]                                             │  │  │ │
│  │  │  └────────────────────────────────────────────────┘  │  │ │
│  │  │                                                        │  │ │
│  │  │  ┌────────────────────────────────────────────────┐  │  │ │
│  │  │  │  Methods:                                      │  │  │ │
│  │  │  │  • open(component, timeout)                   │  │  │ │
│  │  │  │  • close(id)                                  │  │  │ │
│  │  │  └────────────────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │              Child Components (App)                   │  │ │
│  │  │  ┌────────────────────────────────────────────────┐  │  │ │
│  │  │  │  const toast = useToast()                     │  │  │ │
│  │  │  │  toast.open(<Component/>)                     │  │  │ │
│  │  │  └────────────────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │         Toast Container (Fixed Position)              │  │ │
│  │  │  ┌────────────────────────────────────────────────┐  │  │ │
│  │  │  │  Position: bottom-4 right-4                   │  │  │ │
│  │  │  │  Z-index: 50                                  │  │  │ │
│  │  │  │  Layout: Vertical stack (space-y-2)           │  │  │ │
│  │  │  │                                                │  │  │ │
│  │  │  │  ┌──────────────────────────────────────┐     │  │  │ │
│  │  │  │  │  Toast 1 (id: abc)          [X]     │     │  │  │ │
│  │  │  │  │  ✓ Success message                  │     │  │  │ │
│  │  │  │  └──────────────────────────────────────┘     │  │  │ │
│  │  │  │  ┌──────────────────────────────────────┐     │  │  │ │
│  │  │  │  │  Toast 2 (id: def)          [X]     │     │  │  │ │
│  │  │  │  │  ⚠ Warning message                  │     │  │  │ │
│  │  │  │  └──────────────────────────────────────┘     │  │  │ │
│  │  │  └────────────────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Complete Flow Diagrams

### 1. Application Initialization Flow

```
┌─────────────┐
│  main.tsx   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  createRoot()       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  <ToastProvider>    │
│  - Initialize       │
│  - Create Context   │
│  - Setup State      │
└──────┬──────────────┘
       │
       ├─────────────────────────┐
       │                         │
       ▼                         ▼
┌─────────────────┐    ┌──────────────────┐
│  Render App     │    │  Toast Container │
│  (children)     │    │  (empty initially)│
└─────────────────┘    └──────────────────┘
```

### 2. Toast Creation Flow (Detailed)

```
User Action
    │
    ▼
┌─────────────────────────┐
│  Button Click           │
│  onClick={handleToast}  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  handleToast(type)      │
│  - Get config           │
│  - Build component      │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  toast.open()           │
│  (component, timeout)   │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  generateUniqueId()     │
│  Returns: "lx3k2m-abc"  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  setToasts()            │
│  Add new toast to array │
└───────────┬─────────────┘
            │
            ├──────────────────────────┐
            │                          │
            ▼                          ▼
┌─────────────────────┐    ┌──────────────────────┐
│  Re-render          │    │  setTimeout()        │
│  Toast Container    │    │  Schedule auto-close │
└─────────┬───────────┘    └──────────┬───────────┘
          │                           │
          ▼                           │
┌─────────────────────┐              │
│  Display Toast      │              │
│  with Close Button  │              │
└─────────────────────┘              │
                                     │
                    ┌────────────────┘
                    │ (after timeout)
                    ▼
          ┌──────────────────┐
          │  close(id)       │
          │  Remove toast    │
          └──────────────────┘
```

### 3. Toast Lifecycle

```
┌──────────────┐
│   Created    │  ← toast.open() called
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Mounted    │  ← Component rendered
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Visible    │  ← User sees toast
└──────┬───────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ Auto-dismiss │  │ Manual close │
│ (timeout)    │  │ (X button)   │
└──────┬───────┘  └──────┬───────┘
       │                 │
       └────────┬────────┘
                ▼
       ┌──────────────┐
       │  Unmounted   │  ← Removed from DOM
       └──────────────┘
```

### 4. State Management Flow

```
Initial State
┌─────────────────┐
│  toasts = []    │
└────────┬────────┘
         │
         ▼
    User Action
         │
         ▼
┌─────────────────────────────┐
│  open(component, timeout)   │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Generate ID: "abc123"      │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  setToasts(prev => [        │
│    ...prev,                 │
│    { id, component }        │
│  ])                         │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  toasts = [                 │
│    { id: "abc", comp: ... } │
│  ]                          │
└────────┬────────────────────┘
         │
         ▼
    Render Toast
         │
         ▼
┌─────────────────────────────┐
│  setTimeout(() => {         │
│    close("abc123")          │
│  }, timeout)                │
└────────┬────────────────────┘
         │
         ▼ (after timeout)
┌─────────────────────────────┐
│  close(id)                  │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  setToasts(prev =>          │
│    prev.filter(t =>         │
│      t.id !== id)           │
│  )                          │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  toasts = []                │
└─────────────────────────────┘
```

### 5. Context Flow

```
┌──────────────────────────────────────┐
│         ToastContext.Provider        │
│  value={{ open, close }}             │
└────────────┬─────────────────────────┘
             │
             ├─────────────────┐
             │                 │
             ▼                 ▼
    ┌────────────────┐  ┌────────────────┐
    │  Component A   │  │  Component B   │
    │  useToast()    │  │  useToast()    │
    └────────┬───────┘  └────────┬───────┘
             │                   │
             ▼                   ▼
    ┌────────────────┐  ┌────────────────┐
    │  toast.open()  │  │  toast.close() │
    └────────┬───────┘  └────────┬───────┘
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
            ┌──────────────────┐
            │  Update toasts[] │
            └──────────────────┘
```

### 6. Multiple Toasts Handling

```
Time: 0ms
┌─────────────────┐
│  User clicks    │
│  "Success"      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Toast 1 Created        │
│  ID: "abc"              │
│  Timeout: 5000ms        │
└─────────────────────────┘

Time: 1000ms
┌─────────────────┐
│  User clicks    │
│  "Error"        │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Toast 2 Created        │
│  ID: "def"              │
│  Timeout: 5000ms        │
└─────────────────────────┘

Current State:
┌─────────────────────────┐
│  toasts = [             │
│    { id: "abc", ... },  │
│    { id: "def", ... }   │
│  ]                      │
└─────────────────────────┘

Visual:
┌──────────────────┐
│  Toast 1  [X]    │  ← Created at 0ms
└──────────────────┘
┌──────────────────┐
│  Toast 2  [X]    │  ← Created at 1000ms
└──────────────────┘

Time: 5000ms
└─ Toast 1 auto-dismissed

Time: 6000ms
└─ Toast 2 auto-dismissed
```

### 7. Error Handling Flow

```
┌─────────────────────┐
│  useToast() called  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  useContext()       │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │  context?    │
    └──────┬───────┘
           │
     ┌─────┴─────┐
     │           │
    Yes         No
     │           │
     ▼           ▼
┌─────────┐  ┌──────────────────────┐
│ Return  │  │  throw new Error()   │
│ context │  │  "Must be used       │
└─────────┘  │   within Provider"   │
             └──────────────────────┘
```

## 📊 Data Structure Diagrams

### Toast Object Structure

```
Toast {
  ├─ id: string
  │  └─ Format: "timestamp-random"
  │     Example: "lx3k2m-abc123def"
  │
  └─ component: ReactNode
     └─ JSX Element
        Example: <div className="...">
                   <Icon />
                   <h3>Title</h3>
                   <p>Message</p>
                 </div>
}
```

### Context Value Structure

```
ToastContextType {
  ├─ open: Function
  │  ├─ Parameters:
  │  │  ├─ component: ReactNode
  │  │  └─ timeout?: number (default: 5000)
  │  └─ Returns: void
  │
  └─ close: Function
     ├─ Parameters:
     │  └─ id: string
     └─ Returns: void
}
```

### State Evolution Example

```
Step 1: Initial
toasts = []

Step 2: Add Toast 1
toasts = [
  { id: "abc", component: <SuccessToast /> }
]

Step 3: Add Toast 2
toasts = [
  { id: "abc", component: <SuccessToast /> },
  { id: "def", component: <ErrorToast /> }
]

Step 4: Remove Toast 1
toasts = [
  { id: "def", component: <ErrorToast /> }
]

Step 5: Remove Toast 2
toasts = []
```

## 🎯 Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Application                         │
│                                                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │                  ToastProvider                      │ │
│  │                                                      │ │
│  │  ┌──────────────┐         ┌──────────────┐        │ │
│  │  │   Context    │◄────────┤   useToast   │        │ │
│  │  │   Provider   │         │     Hook     │        │ │
│  │  └──────┬───────┘         └──────▲───────┘        │ │
│  │         │                        │                 │ │
│  │         │ provides               │ consumes        │ │
│  │         │                        │                 │ │
│  │         ▼                        │                 │ │
│  │  ┌──────────────┐         ┌──────────────┐        │ │
│  │  │    State     │         │     App      │        │ │
│  │  │  toasts[]    │         │  Component   │        │ │
│  │  └──────┬───────┘         └──────┬───────┘        │ │
│  │         │                        │                 │ │
│  │         │ updates                │ triggers        │ │
│  │         │                        │                 │ │
│  │         ▼                        ▼                 │ │
│  │  ┌──────────────┐         ┌──────────────┐        │ │
│  │  │    Toast     │         │   Actions    │        │ │
│  │  │  Container   │         │  open/close  │        │ │
│  │  └──────────────┘         └──────────────┘        │ │
│  │                                                     │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 🔄 Sequence Diagram

```
User          App         useToast      ToastProvider    State       Timer
 │             │              │               │            │           │
 │  Click      │              │               │            │           │
 ├────────────►│              │               │            │           │
 │             │              │               │            │           │
 │             │  useToast()  │               │            │           │
 │             ├─────────────►│               │            │           │
 │             │              │               │            │           │
 │             │◄─────────────┤               │            │           │
 │             │  {open,close}│               │            │           │
 │             │              │               │            │           │
 │             │  open(comp)  │               │            │           │
 │             ├──────────────┼──────────────►│            │           │
 │             │              │               │            │           │
 │             │              │               │ generateID │           │
 │             │              │               ├───────────►│           │
 │             │              │               │            │           │
 │             │              │               │ setToasts  │           │
 │             │              │               ├───────────►│           │
 │             │              │               │            │           │
 │             │              │               │ setTimeout │           │
 │             │              │               ├───────────────────────►│
 │             │              │               │            │           │
 │             │              │               │  render    │           │
 │             │              │               ├───────────►│           │
 │             │              │               │            │           │
 │             │◄─────────────┼───────────────┤            │           │
 │             │              │               │            │           │
 │  See Toast  │              │               │            │           │
 │◄────────────┤              │               │            │           │
 │             │              │               │            │           │
 │             │              │               │            │  timeout  │
 │             │              │               │◄───────────────────────┤
 │             │              │               │            │           │
 │             │              │               │  close(id) │           │
 │             │              │               ├───────────►│           │
 │             │              │               │            │           │
 │             │              │               │  filter    │           │
 │             │              │               ├───────────►│           │
 │             │              │               │            │           │
 │  Toast      │              │               │  re-render │           │
 │  Dismissed  │              │               ├───────────►│           │
 │◄────────────┤              │               │            │           │
```

---

**These diagrams provide a complete visual understanding of the toast notification system architecture and flow.**
