class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const newHead = new this.Node({ element });

    this._sentinel.next.prev = newHead;
    newHead.next = this._sentinel.next;
    this._sentinel.next = newHead;
    newHead.prev = this._sentinel;
    return newHead;
  }

  insertTail(element) {
      const newTail = new this.Node({ element });

      this._sentinel.prev.next = newTail;
      newTail.prev = this._sentinel.prev;
      newTail.next = this._sentinel;
      this._sentinel.prev = newTail;
      return newTail;
  }

  removeHead() {
    const headToRemove = this._sentinel.next;
    return this.remove(headToRemove);
  }

  removeTail() {
    const tailToRemove = this._sentinel.prev;
    return this.remove(tailToRemove);
  }

  remove(node) {
    let nodeElement;
    if (node && node._active){
      nodeElement = node.element;
      node.remove();
    }
    return nodeElement;
  }

  forEach(callback, container = this) {
    let node = this._sentinel.next;

    for (let i = 0; node._active; i++) {
      callback(node.element, i, container);
      node = node.next;
    }
  }

  count() {
    let node = this._sentinel.next;
    let count = 0;

    while (node._active){
      count += 1;
      node = node.next;
    }

    return count;
  }
}

export default DoublyLinkedList;
