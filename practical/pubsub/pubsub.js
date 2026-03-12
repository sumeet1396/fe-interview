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

const pubsub = new PubSub();

function userLoggedIn(data) {
  console.log("User logged in:", data);
}

function sendWelcomeEmail(data) {
  console.log("Sending welcome email to:", data.email);
}

// subscribe
pubsub.subscribe("login", userLoggedIn);
pubsub.subscribe("login", sendWelcomeEmail);

// publish
pubsub.publish("login", { name: "John", email: "john@gmail.com" });
