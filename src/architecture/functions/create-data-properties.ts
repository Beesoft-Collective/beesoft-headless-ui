import { isDate } from 'date-fns';

/**
 * Converts normal properties to `data-` properties.
 * @param properties {Record<string, unknown>} - The properties to turn into data attributes.
 */
export function createDataProperties(properties: Record<string, unknown>) {
  const keys = Object.keys(properties);
  const finalObject: Record<string, unknown> = {}
  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i];
    if (key) {
      const currentItem = properties[key];
      const finalKey = key.replace(/([A-Z])/g, (part) => `-${part.toLowerCase()}`);

      if (typeof currentItem === 'boolean') {
        if (currentItem) {
          finalObject[`data-${finalKey}`] = true;
        }
      } else if (isDate(currentItem)) {
        finalObject[`data-${finalKey}`] = currentItem.toISOString();
      } else {
        finalObject[`data-${finalKey}`] = properties[key];
      }
    }
  }

  return finalObject;
}
