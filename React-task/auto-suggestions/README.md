# Auto Suggestions Search with Debounce, Cache, AbortController (React + TypeScript)

## Overview

This project implements an **Auto Suggestions Search Input** using React and TypeScript with the following optimizations:

- Debounced API calls
- Client-side caching
- Request cancellation
- Efficient rendering of suggestions

This architecture improves **performance, scalability, and user experience** by avoiding unnecessary API requests and handling race conditions.

---

# Architecture Flow

```
User Input
   ↓
Debounce (500ms)
   ↓
Check Cache
   ↓
Abort Previous Request
   ↓
Fetch API
   ↓
Update Cache
   ↓
Update React State
   ↓
Render Suggestions
```

---

# Key Concepts Used

## 1. Debouncing

Debouncing delays execution until the user stops typing for a certain duration.

### Why it is needed

Without debounce:

```
m
ma
man
mang
mango
```

5 API calls will happen.

With debounce (500ms):

```
User types quickly → Only 1 API call
```

### Implementation

```ts
const debouncedQuery = useDebounce(query, 500);
```

The API request is triggered only when the debounced value changes.

---

# 2. Caching

The application stores previously fetched results in memory.

### Why caching?

If a user searches again:

```
mango
```

Instead of calling the API again, we return the cached results.

### Implementation

```ts
const cache = useRef<Record<string, Recipe[]>>({});
```

### Cache Lookup

```ts
const cached = cache.current[searchQuery];

if (cached) {
  setRecipes(cached);
  return;
}
```

### Cache Update

```ts
cache.current[searchQuery] = data.recipes;
```

---

# 3. AbortController (Prevent Race Conditions)

When users type fast, multiple requests may run simultaneously.

Example problem:

```
User types:
pasta
pizza
```

API responses may return out of order:

```
pizza response (fast)
pasta response (slow)
```

Result:

```
UI shows pasta even though user typed pizza
```

### Solution

Cancel previous requests using `AbortController`.

### Implementation

```ts
const controllerRef = useRef<AbortController | null>(null);
```

Before making a new request:

```ts
if (controllerRef.current) {
  controllerRef.current.abort();
}
```

Create a new controller:

```ts
const controller = new AbortController();
controllerRef.current = controller;
```

Attach signal to fetch:

```ts
fetch(url, { signal: controller.signal });
```

---

# 4. React State Management

The component maintains three states.

### Query

Stores the input value.

```ts
const [query, setQuery] = useState<string>("");
```

### Recipes

Stores the fetched suggestions.

```ts
const [recipes, setRecipes] = useState<Recipe[]>([]);
```

### Suggestion Visibility

Controls dropdown visibility.

```ts
const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
```

---

# Data Types

## Recipe Interface

Defines the shape of each recipe.

```ts
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}
```

---

## API Response Interface

```ts
interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
```

---

# Fetch Logic

### Step 1: Check Cache

```ts
const cached = cache.current[searchQuery];

if (cached) {
  setRecipes(cached);
  return;
}
```

### Step 2: Abort Previous Request

```ts
if (controllerRef.current) {
  controllerRef.current.abort();
}
```

### Step 3: Create New Controller

```ts
const controller = new AbortController();
controllerRef.current = controller;
```

### Step 4: Fetch Data

```ts
const res = await fetch(
  `https://dummyjson.com/recipes/search?q=${searchQuery}`,
  { signal: controller.signal },
);
```

### Step 5: Parse Response

```ts
const data: RecipesResponse = await res.json();
```

### Step 6: Store in Cache

```ts
cache.current[searchQuery] = data.recipes;
```

### Step 7: Update UI

```ts
setRecipes(data.recipes);
```

---

# React Lifecycle Flow

```
User Types
   ↓
handleChange()
   ↓
query state updated
   ↓
debounce waits 500ms
   ↓
debouncedQuery changes
   ↓
useEffect runs
   ↓
fetchData()
   ↓
API / Cache
   ↓
setRecipes()
   ↓
UI updates
```

---

# UI Behavior

### Show suggestions on focus

```ts
onFocus={() => setIsResultVisible(true)}
```

### Hide suggestions on blur

```ts
onBlur={() => setIsResultVisible(false)}
```

### Render Suggestions

```tsx
{
  recipes.length > 0 && isResultVisible && (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>{recipe.name}</div>
      ))}
    </div>
  );
}
```

---

# System Design Considerations

## Performance

Optimizations used:

- Debouncing API calls
- In-memory caching
- Canceling outdated requests

These reduce:

- API load
- Network latency
- UI flickering

---

## Scalability

The architecture can scale by moving logic into separate layers.

```
src
 ├ hooks
 │   └ useDebounce.ts
 │
 ├ services
 │   └ recipeApi.ts
 │
 ├ utils
 │   └ cache.ts
 │
 ├ components
 │   └ AutoSuggest.tsx
```

---

# Possible Improvements

### LRU Cache

Instead of unlimited caching, limit cache size.

Example:

```
Max Cache Size = 10
```

Oldest search entries will be removed.

---

### Loading State

```ts
const [loading, setLoading] = useState(false);
```

---

### Keyboard Navigation

Support:

```
Arrow Down
Arrow Up
Enter
```

---

### Highlight Matched Text

Example:

```
Mang[o] Salsa Chicken
```

---

### Click Outside to Close

Use a `useClickOutside` hook.

---

# Final Result

Features implemented:

✔ Debounced search  
✔ Cache optimization  
✔ Request cancellation  
✔ Type-safe API response  
✔ Responsive suggestions dropdown

This architecture is commonly used in:

- Google search suggestions
- Amazon product search
- GitHub repository search
- E-commerce auto suggestions

---

# Summary

The application implements a **high-performance search suggestion system** using modern React techniques.

Main optimizations:

```
Debounce → Reduce API calls
Cache → Avoid repeated requests
AbortController → Prevent race conditions
```

This results in a **fast, scalable, and production-ready search experience**.
