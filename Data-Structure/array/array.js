class MyArray {
    constructor() {
      this.length = 0;
      this.data = {};
    }
    get(index) {
      return this.data[index];
    }
    push(item) {
      this.data[this.length] = item;
      this.length++;
      return this.data;
    }
    pop() {
      const lastItem = this.data[this.length - 1];
      delete this.data[this.length - 1];
      this.length--;
      return lastItem;
    }
    unshift(item) {
      for (let i = this.length; i >= 1; i--) {
        this.data[i] = this.data[i-1]
      }
      this.data[0] = item;
      this.length++;
      return this.data;
    }
    shift() {
      const item = this.data[0];
      this.shiftItems(0);
      return item;
    }
    deleteAtIndex(index) {
      const item = this.data[index];
      this.shiftItems(index);
      return item;
    }
    shiftItems(index) {
      for (let i = index; i < this.length - 1; i++) {
        this.data[i] = this.data[i + 1];
      }
      delete this.data[this.length - 1];
      this.length--;
    }

    slice(start = 0, end = this.length) {
      const newArray = new MyArray();

      if (start < 0) start = this.length + start;
      if (end < 0) end = this.length + end;

      start = Math.max(0, start);
      end = Math.min(this.length, end);

      for (let i = start; i < end; i++) {
        newArray.data[newArray.length] = this.data[i];
        newArray.length++;
      }

      return newArray;
    }
    
    splice(start, deleteCount = 0, ...items) {
      const removed = [];

      if (start < 0) start = this.length + start;
      if (start < 0) start = 0;
      if (start > this.length) start = this.length;

      deleteCount = Math.min(deleteCount, this.length - start);

      for (let i = 0; i < deleteCount; i++) {
        removed.push(this.data[start + i]);
      }

      const shift = items.length - deleteCount;

      if (shift > 0) {
        for (let i = this.length - 1; i >= start + deleteCount; i--) {
          this.data[i + shift] = this.data[i];
        }
      }

      if (shift < 0) {
        for (let i = start + deleteCount; i < this.length; i++) {
          this.data[i + shift] = this.data[i];
        }
      }

      for (let i = 0; i < items.length; i++) {
        this.data[start + i] = items[i];
      }

      this.length += shift;

      return removed;
    }

    print() {
        return Object.values(this.data)
    }

   
  }
  
  const myArray = new MyArray();
  myArray.push('hi');
  myArray.push('you');
  myArray.push('!');
  myArray.pop();
  myArray.deleteAtIndex(0);
  myArray.push('are');
  myArray.push('nice');
  myArray.shiftItems(0);
  console.log(myArray.get(1))
  console.log(myArray);
  myArray.unshift("this");
  console.log(myArray);
  myArray.shift();
  console.log(myArray);
  console.log(myArray.slice(1, 2));
  myArray.push(1)
  myArray.push(2)
  myArray.push(3)
  myArray.push(4)
  console.log(myArray.print())
  myArray.splice(2,2)
  console.log(myArray.print())
  myArray.splice(2)
  console.log(myArray.print())
  myArray.splice(2,0)
  console.log(myArray.print())
  myArray.splice(1,0, "temp")
  console.log(myArray.print())
  