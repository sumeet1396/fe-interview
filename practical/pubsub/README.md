# Publish–Subscribe (Pub/Sub) Pattern in JavaScript

## Overview

The **Publish–Subscribe (Pub/Sub)** pattern is a messaging design pattern where:

- **Publishers** send events/messages.
- **Subscribers** listen for events they are interested in.
- Publishers and subscribers **do not know about each other directly**.

Instead, they communicate through a **central event channel (event bus)**.

This pattern helps create **loosely coupled systems**, which are easier to maintain and scale.

---

# Basic Pub/Sub Implementation in JavaScript

```javascript
class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  publish(event, data) {
    if (!this.events[event]) return;

    this.events[event].forEach((callback) => {
      callback(data);
    });
  }

  unsubscribe(event, callback) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }
}
```

---

# Code Explanation

## 1. Constructor

```javascript
constructor() {
  this.events = {};
}
```

Creates an empty object that will store all events and their subscribers.

Example structure:

```javascript
{
  login: [callback1, callback2],
  logout: [callback3]
}
```

Each **event name** maps to an **array of subscriber functions**.

---

# Subscribe Method

```javascript
subscribe(event, callback);
```

Purpose:
Registers a function that should run whenever the event is published.

Steps:

1. Check if the event already exists.
2. If not, create an empty array.
3. Push the callback function into the array.

Example:

```javascript
pubsub.subscribe("login", userLoggedIn);
```

---

# Publish Method

```javascript
publish(event, data);
```

Purpose:
Triggers all subscribers of a particular event.

Steps:

1. Check if the event exists.
2. Loop through all callbacks.
3. Execute each callback with the provided data.

Example:

```javascript
pubsub.publish("login", { name: "John" });
```

---

# Unsubscribe Method

```javascript
unsubscribe(event, callback);
```

Purpose:
Removes a subscriber from an event.

Steps:

1. Check if the event exists.
2. Filter the callback array.
3. Remove the matching function.

Example:

```javascript
pubsub.unsubscribe("login", userLoggedIn);
```

---

# Example Usage

```javascript
const pubsub = new PubSub();

function userLoggedIn(data) {
  console.log("User logged in:", data);
}

function sendWelcomeEmail(data) {
  console.log("Sending welcome email to:", data.email);
}

// subscribe to event
pubsub.subscribe("login", userLoggedIn);
pubsub.subscribe("login", sendWelcomeEmail);

// publish event
pubsub.publish("login", {
  name: "John",
  email: "john@gmail.com",
});
```

Output:

```
User logged in: { name: 'John', email: 'john@gmail.com' }
Sending welcome email to: john@gmail.com
```

---

# Real World Example

### Cart Update Event

Publisher:

```javascript
pubsub.publish("cartUpdated", { totalItems: 5 });
```

Subscribers:

```javascript
pubsub.subscribe("cartUpdated", updateNavbarCart);
pubsub.subscribe("cartUpdated", updateCartPage);
```

Both components react to the same event independently.

---

# Advantages

- Loose coupling between components
- Easier scalability
- Multiple subscribers for one event
- Works well with event-driven architectures

---

# Limitations

- Debugging can be harder in large systems
- Event flow may become difficult to track

---

# Summary

The **Pub/Sub pattern**:

- Decouples event producers and consumers
- Enables event-driven architecture
- Is widely used in **frontend frameworks, Node.js systems, and microservices**

It is an important concept for **JavaScript system design and senior frontend interviews**.
