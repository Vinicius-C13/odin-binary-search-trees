const Node = (data) => {
    return {
        data,
        left: null,
        right: null
    }
}

const Tree = (arr) => {

    return {
        array: mergeSort(arr),//[removeDuplicates(mergeSort(arr))],
        root: 0,//this.buildTree(this.array, 0, array.length - 1),

        buildTree(arr, start, end) {
            if(start > end) return null;
        
            let mid = Math.floor((start + end) / 2);
            let node = Node(arr[mid]);
        
            node.left = buildTree(arr, start, mid - 1);
            node.right = buildTree(arr, mid + 1, end);
            
            return node;
        }
    }

    function mergeSort(arr) {
        if(arr.length === 0) return "Insert a value";
        if(arr.length === 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const arrLeft = arr.slice(0, mid);
        const arrRight = arr.slice(mid, arr.length);
        return merge(mergeSort(arrLeft), mergeSort(arrRight));
    };

    function merge(arrLeft, arrRight) {
        const result = [];

        let iL = 0;
        let iR = 0;

        while(iL < arrLeft.length && iR < arrRight.length) {
            if(arrLeft[iL] < arrRight[iR]) {
                result.push(arrLeft[iL]);
                iL++;
            } else {
                result.push(arrRight[iR]);
                iR++;
            }
        }
        while(iL < arrLeft.length) {
            result.push(arrLeft[iL]);
            iL++;
        }
        while(iR < arrRight.length) {
            result.push(arrRight[iR]);
            iR++;
        }

        return result
    }
}

/*
let root = null;


function preOrder(node)
{
    if (node == null) return;

    console.log(node.data + " ");
    preOrder(node.left);
    preOrder(node.right);
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let n = arr.length;
root = buildTree(arr, 0, n - 1);
preOrder(root);

*/

let myTree = Tree([2, 4, 6, 1, 3, 5]);

console.log(myTree.array)