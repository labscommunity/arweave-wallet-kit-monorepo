export function deepCopyIncludingPrototype(obj: Record<string, any>) {
  let clone = Object.assign({}, obj); // Start with shallow copy of own properties

  // Now, traverse the prototype chain and copy over all properties
  let proto = Object.getPrototypeOf(obj);
  while (proto && proto !== Object.prototype) {
    Object.getOwnPropertyNames(proto).forEach((name) => {
      clone[name] = obj[name];
    });
    proto = Object.getPrototypeOf(proto);
  }

  return clone;
}
