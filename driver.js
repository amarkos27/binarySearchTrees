import { Tree } from './bst.js';

let arr = createArray(30, 0, 100);
const test = Tree(arr);

let newArr = createArray(30, 100, 500);
rapidInsert(newArr, test);
test.rebalance();
test.printTree();

function createArray(size, min, max) {
  if (!max || !(min + 1)) {
    throw new Error('Max & min expected');
  } else if (typeof max !== 'number' || typeof min !== 'number') {
    throw new Error("Max & min must be of type 'number'");
  }

  const array = Array(size);

  for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * (max - min) + min);
  }

  return array;
}

function rapidInsert(array, tree) {
  array.forEach((element) => tree.insert(element));
}
