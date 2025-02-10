function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    let midpoint = Math.floor(arr.length / 2);
    return merge(
      mergeSort(arr.slice(0, midpoint)),
      mergeSort(arr.slice(midpoint))
    );
  }
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  if (i >= left.length) {
    return result.concat(right.slice(j));
  } else return result.concat(left.slice(i));
}

export { mergeSort };
