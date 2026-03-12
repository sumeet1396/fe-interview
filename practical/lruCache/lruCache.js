class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const cacheKey = this.cache.keys().next().value;
      this.cache.delete(cacheKey);
    }
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
}

const cache = new LRUCache(2);
cache.put(10, "Hello");
cache.put(20, "World");
console.log(cache.get(10));
console.log(cache.get(20));
console.log(cache.get(30));
console.log(cache.get(10));
console.log(cache);
cache.put(40, "test");
console.log(cache);
