const Node = (data)=> {
    return {
        data, 
        left: null, 
        right: null
    }
}

const Tree = (array)=> {
    let thisArray = removeDuplicates(mergeSort(array));
    return {
        root: buildTree(thisArray, 0, thisArray.length - 1),

        insert(value, node = this.root) {
            if(value < node.data) {
                if(!node.left)
                    return node.left = Node(value);
                else
                    return this.insert(value, node.left);
            } 
            else if (value > node.data) {
                if(!node.right)
                    return node.right = Node(value);
                else
                    return this.insert(value, node.right);
            }
            else return console.log("this node already exist!")
        },

        remove(value, node = this.root) {
            if(node === null) return node;
            else if(value < node.data) {
                node.left = this.remove(value, node.left);
                return node;
            }
            else if(value > node.data) {
                node.right = this.remove(value, node.right);
                return node;
            }
            else {
                //If node doesn't have any child
                if(node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                //If node have only one child
                else if(node.left === null) {
                    node = node.right;
                    return node;
                }
                else if(node.right === null) {
                    node = node.left;
                    return node;
                }
                //If node have two childs
                else {
                    let tempNode = findMin(node.right);
                    this.remove(tempNode.data);
                    node.data = tempNode.data;
                    return node;
                }
            }
        },

        find(value, node = this.root) {
            if(node === null) return "This node doesn't exist"
            else if(value === node.data) return node;
            else {
                if(value < node.data) return this.find(value, node.left);
                else return this.find(value, node.right);
            }
        },

        levelOrder(method = [], node = this.root) {
            if(node === null) return
            else {
                let queue = [];
                queue.push(node);
                while(!queue.length == 0) {
                    let current = queue[0];
                    if(current.left !== null) queue.push(current.left);
                    if(current.right !== null) queue.push(current.right);
                    method.push(queue.shift());
                }
            return method;
            }
            
        },

        inorder(method, node = this.root, array = []) {
            if(node === null) return null;
            else {
                this.inorder(method, node.left, array);
                method ? method(node) : array.push(node.data);
                this.inorder(method, node.right, array);

                if(array.length > 0) return array
            }
        },

        preorder(method, node = this.root, array = []) {
            if(node === null) return;

            else {
                method ? method(node) : array.push(node.data);
                this.preorder(method, node.left, array);
                this.preorder(method, node.right, array);

                if(array.length > 0) return array
            }
        },

        postorder(method, node = this.root, array = []) {
            if(node === null) return;

            else {
                this.postorder(method, node.left, array);
                this.postorder(method, node.right, array);
                method ? method(node) : array.push(node.data);

                if(array.length > 0) return array;
            }
        },

        height(node = this.root) {
            if(node === null) return -1;
            else{
                const leftHeight = this.height(node.left);
                const rightHeight = this.height(node.right);
                return Math.max(leftHeight, rightHeight) + 1;
            }
        },

        depth(node, root = this.root, level = 0) {
            if(!node) return null;
            else if(node === this.root.data) return 0;
            else {
                if(node === root.data) return level
                else if(node < root.data) {
                    return this.depth(node, root.left, level+1)
                } 
                else {
                    return this.depth(node, root.right, level+1)
                }
            }
        },

        isBalanced(node = this.root) {
            if(node === null) return true;
            else {
                const diff = Math.abs(this.height(node.left) - this.height(node.right));
                return (diff <=1 && this.isBalanced(node.left) && this.isBalanced(node.right))
            }
        },

        rebalance(root = this.root) {
            const sortedArr = this.inorder();
            return this.root = buildTree(sortedArr, 0, sortedArr.length - 1);
        },

        prettyPrint(node = this.root, prefix = '', isLeft = true) {
            if (node.right !== null) {
              this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
              this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
        },

        
    }
}

//Functions that dont return with the factory function

function buildTree(array, start, end) {
    if(start > end) return null;
    else {
        let mid = Math.floor((start + end) / 2)
        let node = Node(array[mid]);

        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end);

        return node;
    }
    
}

function mergeSort(array) {
    if(array.length === 0) return "Insert a value";
    else if(array.length === 1) return array;
    else {
        let mid = Math.floor(array.length/2);
        const arrLeft = array.slice(0, mid);
        const arrRight = array.slice(mid, array.length);

        return merge(mergeSort(arrLeft), mergeSort(arrRight));
    }
        
};

function merge(left, right) {
    let result = [];

    let iL = 0;
    let iR = 0;

    while(iL < left.length && iR < right.length) {
        if(left[iL] < right[iR]){
            result.push(left[iL]);
            iL++;
        } else {
            result.push(right[iR]);
            iR++;
        }
    }
    
    while(iL < left.length) {
        result.push(left[iL]);
        iL++;
    }

    while(iR < right.length) {
        result.push(right[iR]);
        iR++;
    }
    
    return result
};

function removeDuplicates(array) {
    return [...new Set(array)];
}

function findMin(node) {
    if(node.left === null)
        return node;
    else
        return findMin(node.left);
}

let myTree = Tree([1, 4, 3, 2, 5, 6, 7, 8, 9]);

myTree.remove(1)

myTree.prettyPrint();

console.log('teste:');

myTree.rebalance();


myTree.prettyPrint()





