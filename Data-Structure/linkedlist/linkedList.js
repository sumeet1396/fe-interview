/*
const basket = ['apples', 'grapes', 'pears']

linked list: apples --> grapes --> pears

apples
8947 --> grapes
          8742 --> pears
                    372 --> null

const list = {
    head: {
        value: 6
        next: {
            value: 10                                             
            next: {
                value: 12
                next: {
                    value: 3
                    next: null	
                    }
                }
            }
        }
    }
};
*/

class Node {
    constructor(value) {
      this.value = value,
      this.next = null
    }
  }
  
  class Linkedlist {
    constructor(value) {
      this.head = {
        value: value,
        next: null
      }
      this.tail = this.head,
      this.length = 1
    }
  
    //add new node at end
    append(value) {
      const newNode = new Node(value)
      this.tail.next = newNode
      this.tail = newNode
      this.length++
      return this
    }
  
    //add new node at start
    prepend(value) {
      const newNode = new Node(value)
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
      return this;
    }
  
    getFirst() {
      return this.head
    }
  
    getLast() {
      return this.tail
    }
  
    //loop through all the nodes
    traverse() {
      const arr = []
      let currentNode = this.head
      while (currentNode !== null) {
        arr.push(currentNode.value)
        currentNode = currentNode.next
      }
      return arr
    }
  
    //insert new node
    insert(index, value) {
      if (index === 0) {
        this.prepend(value);
        return this.printList();
      }
      if (index > this.length) {
        this.append(value);
        return this.printList();
      }
      const newNode = new Node(value)
      const leader = this.traverseToIndex(index-1);
      const holdingPointer = leader.next;
      leader.next = newNode;
      newNode.next = holdingPointer;
      this.length++;
      return this.traverse();
    }
  
    //find index
    traverseToIndex(index) {
      //Check parameters
      console.log(index)
      let counter = 0;
      let currentNode = this.head;
      while(counter !== index){
        currentNode = currentNode.next;
        counter++;
      }
      return currentNode;
    }
  
    // find the index of a node
    indexOf(data){
      let ind = -1;
      let node = this.head;
      while(node){
          ++ind;
          if(node.value === data) return ind;
  
          node = node.next;
      }
      return -1;
    }
  
    //remove a node
    remove(index) {
      if (index > this.length) {
        console.log("node not found")
        return this.printList();
      }
      const leader = this.traverseToIndex(index-1);
      const unwantedNode = leader.next;
      leader.next = unwantedNode.next;
      this.length--;
      return this.traverse();
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
  
    //reverse a linked list
    reverse() {
      if (!this.head.next) {
        return this.head;
      }
      let first = this.head;
      this.tail = this.head;
      let second = first.next;
  
      while(second) {
        const temp = second.next;
        second.next = first;
        first = second;
        second = temp;
      }
  
      this.head.next = null;
      this.head = first;
      return this.traverse();
    }
  
  }
  
  const l1 = new Linkedlist("sumeet")
  l1.append("rane");
  l1.append("aaa");
  l1.prepend(1);
  l1.append("sss")
  l1.prepend("eee")
  l1.insert(2,"j")
  l1.remove(1)
  console.log(l1)
  console.log(l1?.head?.next?.next?.next)
  console.log(l1.traverse())
  console.log(l1.size())
  console.log(l1.get(3))
  console.log(l1.reverse())