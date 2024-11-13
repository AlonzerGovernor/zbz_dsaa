class Graph<T> {
  private vertaces: T[] = [];

  private adjList: Map<T, T[]> = new Map();

  addVertex(vertex: T): void {
    this.vertaces.push(vertex);

    this.adjList.set(vertex, []);
  }

  addEdge(v1: T, v2: T): void {
    this.adjList.get(v1)?.push(v2);
    this.adjList.get(v2)?.push(v1);
  }

  breadthFSearch() {
    if (!this.vertaces.length) return;

    const queue: T[] = [];
    queue.push(this.vertaces[0]);

    const visited = new Set<T>();
    visited.add(this.vertaces[0]);

    while (queue.length) {
      const vertex = queue.shift()!;
      const adj = this.adjList.get(vertex)!;

      console.log(vertex);

      adj.forEach((item) => {
        if (!visited.has(item)) {
          visited.add(item);
          queue.push(item);
        }
      });
    }
  }

  depthFSearch() {
    if (!this.vertaces.length) return;

    const stake: T[] = [];
    stake.push(this.vertaces[0]);

    const visited = new Set<T>();
    visited.add(this.vertaces[0]);

    while (stake.length) {
      const vertex = stake.pop()!;
      const adj = this.adjList.get(vertex)!;

      console.log(vertex);

      [...adj].reverse().forEach((item) => {
        if (!visited.has(item)) {
          visited.add(item);
          stake.push(item);
        }
      });
    }
  }
}

const graph = new Graph<string>();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addVertex("I");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph);

graph.breadthFSearch();
console.log("--------------------");

graph.depthFSearch();
