const Node = (data) => {
    return {
        data,
        left: null,
        right: null
    }
}

const Tree = (arr) => {

    let array = [...removeDuplicates(mergeSort(arr))];
    let root = buildTree(array, 0, array.length -1);

    //Build the tree
    function buildTree(arr, start, end) {
        if(start > end) return null;
    
        let mid = Math.floor((start + end) / 2);
        let node = Node(arr[mid]);
    
        node.left = buildTree(arr, start, mid - 1);
        node.right = buildTree(arr, mid + 1, end);
        
        return node;
    }

    //Sort the array
    function mergeSort(arr) {
        if(arr.length === 0) return "Insert a value";
        if(arr.length === 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const arrLeft = arr.slice(0, mid);
        const arrRight = arr.slice(mid, arr.length);
        return merge(mergeSort(arrLeft), mergeSort(arrRight));
    };

    //Put together all sorted pieces of array
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

    //A new way that I learned to sort arrays
    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    //To console the binary tree in a more visual way
    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    function insert(value, currentRoot = root) {
        if(value == currentRoot.data)
            return console.log("this node already exists in the tree")

        if(value < currentRoot.data) {
            if(currentRoot.left === null)
                return currentRoot.left = Node(value);
            else
                return insert(value, currentRoot.left);
        }
        if(value > currentRoot.data) {
            if(currentRoot.right === null)
                return currentRoot.right = Node(value);
            else
                return insert(value, currentRoot.right);
        }
    }

    function findMin(node) {
        if(node.left === null) return node;
        else return findMin(node.left);
    }

    function remove(value, node = root) {
        if(node == null) return node;
        else if(value < node.data) {
            node.left = remove(value, node.left);
            return node;
        }
        else if(value > node.data) {
            node.right = remove(value, node.right);
            return node;
        }
        else {
            //Case 1: No child
            if(node.left === null && node.right === null) {
                node = null
                return node;
            }
            //Case 2: One child
            else if(node.left === null){
                node = node.right;
                return node;
            }
            else if(node.right === null){
                node = node.left;
                return node;
            }
            //Case 3: Two Childs
            else {
                let tempNode = findMin(node.right);
                remove(tempNode.data)
                node.data = tempNode.data;
                return node;
            }
        }
    }

    function find(value, currentNode = root) {
        if(!currentNode) return "Node not found"
        else if(value === currentNode.data) return currentNode;
        else {
            if(value > currentNode.data)
                return find(value, currentNode.right);
            else
                return find(value, currentNode.left);
        }
    }

    function levelOrder(method, arr = [], currentNode = root) {
        if(currentNode) return null;
        else {
            arr.push(currentNode.data);
            
        }
        
    }

    return {
        array, 
        root, 
        prettyPrint,
        insert,
        remove,
        findMin,
        find,
        levelOrder
    };
}

let myTree = Tree([0, 1, 3, 2, 4, 5, 6, 7, 8, 9])
myTree.remove(7)
myTree.prettyPrint();
console.log(myTree.find(11))

