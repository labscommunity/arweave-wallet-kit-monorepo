import { PermissionType } from "@arweave-wallet-kit/core/wallet";

/**
 * Compare two permission arrays
 *
 * @param required The permissions that should be in the second array
 * @param existing The permissions the app has
 */
export function comparePermissions(
  required: PermissionType[],
  existing: PermissionType[]
) {
  for (const permission of required) {
    if (!existing.includes(permission)) {
      return false;
    }
  }

  return true;
}

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
