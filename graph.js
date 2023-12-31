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
  // distanceOfShortestPath(start, end, seen = new Set([start])) {
  //   if (start === end) return 0;

  //   let shortestPath;

  //   for (let neighbor of start.adjacent) {
  //     if (!seen.has(neighbor)) {
  //       seen.add(neighbor);

  //       let path = this.distanceOfShortestPath(neighbor, end, new Set(seen));

  //       if (shortestPath > path || shortestPath === undefined) {
  //         shortestPath = path;
  //       }
  //     }
  //   }
  //   return shortestPath + 1; //undefined + 1 = NaN
  // }

  distanceOfShortestPath(start, end) {
    let queue = [[start, 0]];
    let seen = new Set([start]);

    if (start === end) return 0;

    while(queue.length > 0){
      let current = queue.shift();
      if(current[0] === end){
        return current[1]
      }
      for (let neighbor of current[0].adjacent) {
        if (!seen.has(neighbor)) {
          queue.push([neighbor, current[1] + 1]);
          seen.add(neighbor);
        }
      }
    }
  }
}

module.exports = { Graph, Node };
