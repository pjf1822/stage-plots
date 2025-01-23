import isEqual from "lodash/isEqual";

export const getChangedFields = (obj1: any, obj2: any) => {
  const changes: Record<string, any> = {};

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = new Set([...keys1, ...keys2]);

  allKeys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (Array.isArray(value1) && Array.isArray(value2)) {
      const added = value2.filter(
        (item2) => !value1.some((item1) => item1.id === item2.id)
      );
      const deleted = value1.filter(
        (item1) => !value2.some((item2) => item2.id === item1.id)
      );
      const updated = value2.filter((item2) =>
        value1.some((item1) => item1.id === item2.id && !isEqual(item1, item2))
      );

      if (added.length > 0 || deleted.length > 0 || updated.length > 0) {
        changes[key] = { added, deleted, updated };
      }
    } else if (!isEqual(value1, value2)) {
      changes[key] = value2;
    }
  });

  return changes;
};
