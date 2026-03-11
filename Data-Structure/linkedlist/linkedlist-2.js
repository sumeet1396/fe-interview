class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    
    add(value) {
        const node = new Node(value)
        if (!this.head) {
            this.head = node;
            this.length++
            return
        }
        
        let current = this.head
        
        while (current.next) {
            current = current.next
        }
        current.next = node
        this.length++
    }
    
    addAt(index, value) {
        const node = new Node(value)
        if (index <= 0) {
            node.next = this.head
            this.head = node
            this.length++
            return
        }
        
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
          current = current.next;
        }
    
        node.next = current.next;
        current.next = node;
        
        this.length++
    }
    
    print() {
        let current = this.head;
        while (current) {
            console.log(current.value)
            current = current.next
        }
    }
    
    remove(index) {
        index -= 1
        if (index < 0 || index >= this.length) {
            console.log("Index does not exist")
            return
        }
    
        // remove head
        if (index === 0) {
            this.head = this.head.next
            this.length--
            return
        }
    
        let current = this.head
    
        // move to previous node
        for (let i = 0; i < index - 1; i++) {
            current = current.next
        }
    
        current.next = current.next.next
    
        this.length--
    }
    
}

const list = new LinkedList()
list.add(10)
list.add(20)
list.add(30)
console.log(list)
list.addAt(0,40)
console.log(list)
list.addAt(2,50)
console.log(list)
list.print()
list.remove(10)
list.remove(2)
list.print()