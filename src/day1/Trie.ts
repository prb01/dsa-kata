type Child<T> = {
  [key: string]: Node<T>;
};

type Node<T> = {
  value: string;
  parent?: Node<T>;
  children?: Child<T>;
  isWord?: boolean;
};

export default class Trie<T> {
  public length: number;
  private root?: Node<T>;

  constructor() {
    this.length = 0;
    this.root = {
      value: "0",
      parent: undefined,
      children: {},
      isWord: undefined,
    };
  }

  insert(item: string): void {
    let curr = this.root;
    for (const char of item) {
      if (curr && !curr.children) curr.children = {};
      if (curr && curr.children && !curr.children[char]) {
        const node = {
          value: char,
          parent: curr,
        };
        curr.children[char] = node;
        this.length++;
      }
      curr = curr?.children && curr.children[char];
    }

    if (curr) curr.isWord = true;
  }

  delete(item: string): void {
    const node = this.getNode(item);
    if (!node) return;

    node.isWord = false;
    if (!node.children) {
      this.length--;
      // recurse up & delete if the char is not part of a word
      this.deleteUp(node);
    }
  }

  find(partial: string): string[] {
    const node = this.getNode(partial);
    const words: string[] = [];
    this.dfs(node, words, partial);

    return words;
  }

  private deleteUp(node: Node<T> | undefined): void {
    if (!node?.parent || node?.isWord) return;

    if (node.parent && node.parent.children) {
      delete node.parent.children[node.value];
      this.deleteUp(node.parent);
      node.parent = undefined;
      node.isWord = undefined;
    }
  }

  private dfs(node: Node<T> | undefined, words: string[], word: string): void {
    if (!node) {
      return;
    }
    if (node.isWord) {
      words.push(word);
    }

    for (const char in node.children) {
      word = word + char;
      this.dfs(node.children[char], words, word);
    }
  }

  private getNode(item: string): Node<T> | undefined {
    let curr = this.root;

    for (const char of item) {
      if (curr && curr.children && !curr.children[char]) {
        return undefined;
      }

      curr = curr && curr.children && curr.children[char];
    }

    return curr;
  }
}
