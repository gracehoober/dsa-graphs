/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addNode(node) {
    this.nodes.add(node);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addNodes(nodeArray) {
    for (let node of nodeArray) {
      this.nodes.add(node);
    }
    //this.nodes = new Set(this.nodes,...nodeArray)
  }

  /** add edge between nodes n1,n2 */
  addEdge(n1, n2) {
    n1.adjacent.add(n2);
    n2.adjacent.add(n1);
  }

  /** remove edge between nodes n1,n2 */
  removeEdge(n1, n2) {
    n1.adjacent.delete(n2);
    n2.adjacent.delete(n1);
  }

  /** remove node from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that node
   */
  removeNode(node) {
    this.nodes.delete(node);
    for (let graphNode of this.nodes) {
      graphNode.adjacent.delete(node);
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let stack = [start];
    let seen = new Set(stack);
    let nodeValues = [];

    while (stack.length > 0) {
      let currentNode = stack.pop();
      nodeValues.push(currentNode.value);
      for (let neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          stack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodeValues;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set(queue);
    let nodeValues = [];

    while (queue.length > 0) {
      let currentNode = queue.shift();
      nodeValues.push(currentNode.value);
      for (let neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          queue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodeValues;
  }

  /** find the distance of the shortest path from the start node to the end node */
  distanceOfShortestPath(start, end, seen = new Set([start])) {
    if (start === end) return 1;

    let count;

    //for each of my adjacdent nodes
    //if I haven't seen this node yet
    //ADD IT to seen
    //recursively execute this function
    //if what it returns is less than the current counter, update the counter
    //otherwise, do not update it (do nothing)

    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        if (count === undefined) {
          count = 1
          count += this.distanceOfShortestPath(neighbor, end, seen); //individual function being return
        } else {


          if (steps < count) count = steps;
        }
      }
    }

    return count;
  }

  /**
   * start = R
   * end = M
   * count = 4
   * -----
   *
   * fn(R, M, seen={}) //4
   */
}
//binary tree traversal
/**
 * traverse(node){
 * if(node === null) return
 **** top -> bottom
 * traverse(node.left)
 **** ordered A->Z
 * traverse(node.right)
 **** bottom -> top
 * }
 */
module.exports = { Graph, Node };
