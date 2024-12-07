class DoublyLinkedList {
    constructor(value) {
      this.head = {
        value: value,
        next: null,
        prev: null
      };
      this.tail = this.head;
      this.length = 1;
    }
  
    //add new node at the end
    append(value) {
      const newNode = {
        value: value,
        next: null,
        prev: null
      }
      newNode.prev = this.tail
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
      return this;
    }
  
    //add new node at the start
    prepend(value) {
      const newNode = {
        value: value,
        next: null,
        prev: null
      }
      newNode.next = this.head;
      this.head.prev = newNode
      this.head = newNode;
      this.length++;
      return this;
    }
  
    //print all node names
    traverse() {
      const array = [];
      let currentNode = this.head;
      while(currentNode !== null){
        array.push(currentNode.value)
        currentNode = currentNode.next
      }
      return array;
    }
  
    //insert new node at a given index
    insert(index, value){
      //Check for proper parameters;
      if(index >= this.length) {
        return this.append(value);
      }
      
      const newNode = {
        value: value,
        next: null,
        prev: null
      }
      const leader = this.traverseToIndex(index-1);
      const follower = leader.next;
      leader.next = newNode;
      newNode.prev = leader;
      newNode.next = follower;
      follower.prev = newNode;
      this.length++;
      return this.traverse();
    }
  
    //get a valid node
    traverseToIndex(index) {
      //Check parameters
      let counter = 0;
      let currentNode = this.head;
      while(counter !== index){
        currentNode = currentNode.next;
        counter++;
      }
      return currentNode;
    }
  
    //get the length of the linked list
    size() {
      return this.length;
    }
  
    //clear all the nodes
    clear() {
      this.head = null
      return this
    }
  
    //get a single node
    get(index) {
      if (index > this.length) {
        console.log("node not found")
        return this.printList();
      }
      const node = this.traverseToIndex(index-1);
      return node;
    }
  }
  
  let myLinkedList = new DoublyLinkedList(10);
  myLinkedList.append(5)
  myLinkedList.append(16)
  myLinkedList.prepend(1)
  myLinkedList.insert(2, 99)
  // myLinkedList.insert(20, 88)
  // myLinkedList.printList()
  // myLinkedList.remove(2)
  // myLinkedList.reverse()
  
  console.log(myLinkedList.traverse())
  console.log(myLinkedList)
  
  