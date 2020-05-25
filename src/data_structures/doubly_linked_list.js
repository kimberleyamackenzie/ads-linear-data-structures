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
    const node = new this.Node({ element });

    this._sentinel.next.prev = node;
    node.next = this._sentinel.next;
    this._sentinel.next = node;
    node.prev = this._sentinel;
    return node;
  }

  insertTail(element) {
      const node = new this.Node({ element });

      this._sentinel.prev.next = node;
      node.prev = this._sentinel.prev;
      node.next = this._sentinel;
      this._sentinel.prev = node;
      return node;
  }

  removeHead() {
    const head = this._head();
    return this.remove(head);
  }

  removeTail() {
    const tail = this._tail();
    return this.remove(tail);
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
