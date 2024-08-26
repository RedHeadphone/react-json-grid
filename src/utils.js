
export function classnames(...args) {
  return args.filter(Boolean).join(" ");
}

export function lookup(obj, searchText) {
  const keyTree = {};
  let matchesInKey = false;

  if (typeof obj !== "object") return null;

  for (const key in obj) {
    if (!Array.isArray(obj) && matchesText(key,searchText) ) {
      matchesInKey = true;
    }

    if (typeof obj[key] === "object") {
      const nestedKeyTree = lookup(obj[key], searchText);
      if (nestedKeyTree != null) {
        keyTree[key] = nestedKeyTree;
      }
    } else {
      if (matchesText(obj[key],searchText)) {
        keyTree[key] = true;
      }
    }
  }
  
  if (Object.keys(keyTree).length !== 0) 
    return keyTree;
  else if (matchesInKey)
    return true;
  else
    return null;
}

export function matchesText(obj, searchText) {
  if (searchText == null)
    return false;
  return String(obj).toLowerCase().includes(searchText.toLowerCase())
}

export function mergeKeyTrees(keyTree1, keyTree2) {
  if (keyTree1 == null) return keyTree2;
  if (keyTree2 == null) return keyTree1;
  if (keyTree1 === true) return keyTree2;
  if (keyTree2 === true) return keyTree1;

  const mergedKeyTree = {};
  for (const key in keyTree1) {
    mergedKeyTree[key] = mergeKeyTrees(keyTree1[key], keyTree2[key]);
  }
  for (const key in keyTree2) {
    if (!mergedKeyTree.hasOwnProperty(key)) {
      mergedKeyTree[key] = keyTree2[key];
    }
  }
  return mergedKeyTree;
}

export function checkAllObjects(data) {
  let allObjects = false;
  let keys = [];
  if (Array.isArray(data)) {
    allObjects = (data.length > 0);
    keys = new Set();
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] !== "object" || Array.isArray(data[i])) {
        allObjects = false;
        break;
      }
      Object.keys(data[i]).forEach((k) => keys.add(k));
    }
    keys = Array.from(keys);
    if (allObjects) {
      for (let i = 0; i < data.length; i++) {
        data[i] = keys.reduce((obj, key) => {
          obj[key] = data[i][key] !== undefined ? data[i][key] : "-";
          return obj;
        }, {});
      }
    }
  }
  return { allObjects, keys };
};