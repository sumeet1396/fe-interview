class Node {
    constructor(value){
      this.value = value;
      this.next = null;
    }
  }
  
  //using linked list
  class Stack {
    constructor(){
      this.top = null;
      this.bottom = null;
      this.length = 0;
    }
    peek() {
      return this.top;
    }
    push(value){
      const newNode = new Node(value)
      if (this.length === 0) {
        this.top = newNode;
        this.bottom = newNode;
      } else {
        const currentTop = this.top;
        this.top = newNode;
        this.top.next = currentTop
      }
      this.length++
      return this;
    }
    pop(){
      if (!this.top) {
        return null;
      } 
      if (this.top === this.bottom) {
        this.bottom = null;
      }
      this.top = this.top.next;
      this.length--;
      return this;
    }
    //isEmpty
  }
  
  const myStack = new Stack();
  myStack.push("google");
  myStack.push("Udemy");
  myStack.push("Discord");
  myStack.pop();
  
  console.log(myStack)
  
  
  