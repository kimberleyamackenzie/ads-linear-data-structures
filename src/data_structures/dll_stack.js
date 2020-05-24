import DoublyLinkedList from './doubly_linked_list';

/**
 * Implementation of the Stack interface using a doubly-linked list
 */
class DLLStack {
  /**
   * Create an empty stack
   */
  constructor() {
    this.storage = new DoublyLinkedList();
  }

  /**
   * Insert an element into the stack
   *
   * @param {any} element Data to track
   * @returns {ticket} Cancellation ticket
   */
  push(element) {
    return this.storage.insertHead(element)
  }

  /**
   * Remove an element from the stack
   *
   * @param {ticket} ticket Cancellation ticket, as returned by `push`
   * @returns Stored element
   */
  cancel(ticket) {
    this.storage.remove(ticket);
  }

  /**
   * Remove the element at the front of the stack
   *
   * @returns Stored element
   */
  pop() {
    return this.storage.removeHead();
  }

  /**
   * How many elements are currently in the stack?
   *
   * @returns {number} Current count
   */
  count() {
    return this.storage.count();
  }

  /**
   * @callback forEachCallback
   * @param element The element stored at this position
   * @param {number} index The index of this element
   * @param {DLLStack} stack This stack
   */

  /**
   * Invoke a callback on each element in the stack
   *
   * @param {forEachCallback} callback Function to invoke
   */
  forEach(callback) {
    this.storage.forEach(callback, this);
    return this;
  }
}

export default DLLStack;
