/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

export const addFolderRecursively = (nodes: any, id: string) => {
  return nodes.map((node: any) => {
    if (node.id === id && node.type === "folder") {
      return {
        ...node,
        childrens: [
          ...node.childrens,
          {
            id: generateUniqueId(),
            name: "New Folder " + (node.level + 1),
            type: "folder",
            childrens: [],
            level: node.level + 1,
          },
        ],
      };
    } else if (node.type === "folder") {
      return {
        ...node,
        childrens: addFolderRecursively(node.childrens, id),
      };
    } else {
      return node;
    }
  });
};

export const addFileRecursively = (nodes: any, id: string) => {
  return nodes.map((node: any) => {
    if (node.id === id && node.type === "folder") {
      return {
        ...node,
        childrens: [
          ...node.childrens,
          {
            id: generateUniqueId(),
            name: "New File " + node.level,
            type: "file",
            level: node.level + 1,
          },
        ],
      };
    } else if (node.type === "folder") {
      return {
        ...node,
        childrens: addFileRecursively(node.childrens, id),
      };
    } else {
      return node;
    }
  });
};