import { mergeSort } from './mergeSort.js';
import { Node } from './treeNode.js';

const Tree = (arr) => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error('Must pass array to create tree');
  }
  // Convert to set and back to array to remove duplicates
  let array = new Set(arr);
  array = [...array];
  array = mergeSort(array);
  let root = buildTree(array);

  function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    else {
      // Calc midpoint this way to prevent integer overflow
      const midpoint = start + Math.floor((end - start) / 2);
      const root = Node(array[midpoint]);
      root.left = buildTree(array, start, midpoint - 1);
      root.right = buildTree(array, midpoint + 1, end);

      return root;
    }
  }

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  function printTree() {
    prettyPrint(root);
  }

  function insert(value) {
    let currentNode = root;

    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = Node(value);
          break;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = Node(value);
          break;
        }
        currentNode = currentNode.right;
      } else {
        break;
      }
    }
  }

  function nextLargest(node) {
    while (node.left) {
      node = node.left;
    }

    return node;
  }

  function deleteItem(value, currentNode = root) {
    if (!currentNode) return null;

    if (value < currentNode.value) {
      currentNode.left = deleteItem(value, currentNode.left);
    } else if (value > currentNode.value) {
      currentNode.right = deleteItem(value, currentNode.right);
    } else {
      if (!currentNode.left && !currentNode.right) return null;

      if (!currentNode.left) return currentNode.right;
      if (!currentNode.right) return currentNode.left;

      let successor = nextLargest(currentNode.right);
      currentNode.value = successor.value;
      currentNode.right = deleteItem(successor.value, currentNode.right);
    }

    return currentNode;
  }

  function find(value) {
    let node = root;

    while (node) {
      if (value === node.value) {
        return node;
      }

      if (value < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
  }

  function levelOrder(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('Callback is expected');
    }
    if (!root) {
      throw new Error('No tree built yet');
    }

    let node;
    let queue = [];

    queue.push(root);
    while (queue.length) {
      node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    //recursive approach

    // if (!queue.length) {
    //   return;
    // }

    // const node = queue.shift();
    // callback(node);

    // if (node.left) queue.push(node.left);
    // if (node.right) queue.push(node.right);
  }

  function inOrder(callback, node = root) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('Callback is expected');
    }
    if (!node) return null;

    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);
  }

  function preOrder(callback, node = root) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('Callback is expected');
    }
    if (!node) return null;

    callback(node);
    preOrder(callback, node.left);
    preOrder(callback, node.right);
  }

  function postOrder(callback, node = root) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('Callback is expected');
    }

    if (!node) return null;

    postOrder(callback, node.left);
    postOrder(callback, node.right);
    callback(node);
  }

  function height(node) {
    if (!node) return -1;

    return 1 + Math.max(height(node.left), height(node.right));
  }

  function depth(node, currentNode = root) {
    if (!currentNode || !node) return -1;
    if (currentNode === node) return 0;

    return (
      1 +
      depth(
        node,
        node.value < currentNode.value ? currentNode.left : currentNode.right
      )
    );
  }

  function isBalanced() {
    const leftH = height(root.left);
    const rightH = height(root.right);

    if (leftH - rightH < -1 || leftH - rightH > 1) return false;
    else return true;
  }

  function rebalance() {
    const newArray = [];
    const callback = (node) => newArray.push(node.value);
    inOrder(callback);
    array = newArray; // reassign original array closure

    root = buildTree(array);
  }

  return {
    printTree,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

export { Tree };
