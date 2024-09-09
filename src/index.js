export class UaInformation {
  #data = new Set();

  get items() {
    return this.#data;
  }

  static instance = null;

  static {
    this.instance = new UaInformation();
  }

  static getInstance() {
    return this.instance;
  }

  constructor() {
    if (UaInformation.instance) {
      throw new Error("Use UaInformation.getInstance() instead.");
    }
  }

  add(item) {
    const array = Array.from(this.#data);
    const dataPointExists = array.filter((t) => t.equals(item)).length > 0;
    if (!dataPointExists) {
      this.#data.add(item);
      this.notify();
    }
  }
  delete(item) {}
  find(text) {}
  replaceList(list) {}
}

// Apply Observer mixin to the TodoList
// Object.assign copies all enumerable own properties from one or more source objects to a target object
// Object.assign(TodoList.prototype, observerMixin);
