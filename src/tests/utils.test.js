import { lookup, mergeKeyTrees, checkAllObjects } from "../utils";

describe("lookup function", () => {
  test("should return null when obj is null", () => {
    expect(lookup(null, "search")).toBeNull();
  });

  test("should return null when obj is an empty object", () => {
    expect(lookup({}, "search")).toBeNull();
  });

  test("should return null when searchText is not found in obj", () => {
    expect(lookup({ key: "value" }, "search")).toBeNull();
  });

  test("should return true when searchText is found at the root level", () => {
    expect(lookup({ key: "search" }, "search")).toEqual({ key: true });
  });

  test("should return the correct key when searchText is found in a nested object", () => {
    const obj = {
      key1: {
        key2: {
          key3: "search",
          key4: "value",
        },
      },
    };
    expect(lookup(obj, "search")).toEqual({ key1: { key2: { key3: true } } });
  });

  test("should return the correct key when searchText is found in an array", () => {
    const obj = {
      key1: ["search", "value"],
    };
    expect(lookup(obj, "search")).toEqual({ key1: { 0: true } });
  });

  test("should return the correct keys when searchText is found in list of object", () => {
    const obj = {
      key1: "value1",
      key2: "search",
      key3: [
        {
          key4: "search",
        },
      ],
      key5: ["value2", "search"],
    };
    expect(lookup(obj, "search")).toEqual({
      key2: true,
      key3: { 0: { key4: true } },
      key5: { 1: true },
    });
  });

  test("should return the correct keys when searchText is found in multiple places", () => {
    const obj = {
      key1: "value1",
      key2: "search",
      key3: {
        key4: "search",
      },
      key5: ["value2", "search"],
    };
    expect(lookup(obj, "search")).toEqual({
      key2: true,
      key3: { key4: true },
      key5: { 1: true },
    });
  });
});

describe("mergeKeyTrees function", () => {
  test("should return null when both keyTree1 and keyTree2 are null", () => {
    expect(mergeKeyTrees(null, null)).toBeNull();
  });

  test("should return keyTree2 when keyTree1 is null", () => {
    const keyTree2 = { key1: true };
    expect(mergeKeyTrees(null, keyTree2)).toEqual(keyTree2);
  });

  test("should return keyTree1 when keyTree2 is null", () => {
    const keyTree1 = { key1: true };
    expect(mergeKeyTrees(keyTree1, null)).toEqual(keyTree1);
  });

  test("should return keyTree1 when both keyTree1 and keyTree2 are true", () => {
    const keyTree1 = true;
    const keyTree2 = true;
    expect(mergeKeyTrees(keyTree1, keyTree2)).toBe(keyTree1);
  });

  test("should return keyTree2 when keyTree1 is true", () => {
    const keyTree1 = true;
    const keyTree2 = { key1: true };
    expect(mergeKeyTrees(keyTree1, keyTree2)).toEqual(keyTree2);
  });

  test("should return keyTree1 when keyTree2 is true", () => {
    const keyTree1 = { key1: true };
    const keyTree2 = true;
    expect(mergeKeyTrees(keyTree1, keyTree2)).toEqual(keyTree1);
  });

  test("should return an empty object when both keyTree1 and keyTree2 are empty objects", () => {
    expect(mergeKeyTrees({}, {})).toEqual({});
  });

  test("should merge overlapping keys from keyTree1 and keyTree2", () => {
    const keyTree1 = { key1: true, key2: { subkey1: true } };
    const keyTree2 = { key2: { subkey2: true }, key3: true };
    const expectedMerged = {
      key1: true,
      key2: { subkey1: true, subkey2: true },
      key3: true,
    };
    expect(mergeKeyTrees(keyTree1, keyTree2)).toEqual(expectedMerged);
  });

  test("should merge non-overlapping keys from keyTree1 and keyTree2", () => {
    const keyTree1 = { key1: true };
    const keyTree2 = { key2: true };
    const expectedMerged = { key1: true, key2: true };
    expect(mergeKeyTrees(keyTree1, keyTree2)).toEqual(expectedMerged);
  });
});

describe("checkAllObjects function", () => {
  test("should return false for allObjects when data is null", () => {
    const data = null;
    expect(checkAllObjects(data)).toEqual({ allObjects: false, keys: [] });
  });

  test("should return true for allObjects and an empty array for keys when data is an empty array", () => {
    const data = [];
    expect(checkAllObjects(data)).toEqual({ allObjects: false, keys: [] });
  });

  test("should return false for allObjects when data is an array of non-objects", () => {
    const data = [1, "two", true];
    expect(checkAllObjects(data)).toEqual({ allObjects: false, keys: [] });
  });

  test("should return true for allObjects and an array with the keys for the objects when data is an array of objects with the same keys", () => {
    const data = [
      { key1: "value1", key2: "value2" },
      { key1: "value3", key2: "value4" },
    ];
    expect(checkAllObjects(data)).toEqual({
      allObjects: true,
      keys: ["key1", "key2"],
    });
  });

  test("should return true for allObjects and an array with the keys for the objects when data is an array of objects with some missing keys", () => {
    const data = [
      { key1: "value1", key2: "value2" },
      { key1: "value3" },
      { key2: "value4" },
    ];
    expect(checkAllObjects(data)).toEqual({
      allObjects: true,
      keys: ["key1", "key2"],
    });
  });

  test("should return false for allObjects when data is an array of objects with some extra keys", () => {
    const data = [
      { key1: "value1", key2: "value2" },
      { key1: "value3", key2: "value4", key3: "value5" },
    ];
    expect(checkAllObjects(data)).toEqual({
      allObjects: true,
      keys: ["key1", "key2", "key3"],
    });
  });
});
