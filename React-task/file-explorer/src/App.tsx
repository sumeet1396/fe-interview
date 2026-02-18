/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import {
  addFileRecursively,
  addFolderRecursively,
  generateUniqueId,
} from "./helper";
import Folder from "./Folder";
import File from "./File";

function App() {
  const [data, setData] = useState<any>([]);

  const handleAddFolder = (id: string) => {
    if (id === "root") {
      setData((prev: any) => [
        ...prev,
        {
          id: generateUniqueId(),
          name: "New Folder",
          type: "folder",
          childrens: [],
          level: 0,
        },
      ]);
    } else {
      setData((prev: any) => addFolderRecursively(prev, id));
    }
  };

  const handleAddFile = (id: string) => {
    if (id === "root") {
      setData((prev: any) => [
        ...prev,
        { id: generateUniqueId(), name: "New File", type: "file", level: 0 },
      ]);
    } else {
      setData((prev: any) => addFileRecursively(prev, id));
    }
  };

  const renderTree = (nodes: any) => {
    return nodes.map((node: any) => {
      if (node.type === "folder") {
        return (
          <div key={node.id} style={{ marginLeft: node.level * 10 }}>
            <Folder
              name={node.name}
              handleAddFolder={() => handleAddFolder(node.id)}
              handleAddFile={() => handleAddFile(node.id)}
            />
            {renderTree(node.childrens)}
          </div>
        );
      } else {
        return (
          <div key={node.id} style={{ marginLeft: node.level * 10 }}>
            <File name={node.name} />
          </div>
        );
      }
    });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="control">
          <button
            className="btn folder-btn"
            onClick={() => handleAddFolder("root")}
          >
            Folder
          </button>
          <button
            className="btn file-btn"
            onClick={() => handleAddFile("root")}
          >
            File
          </button>
        </div>
        <div className="tree-view">{renderTree(data)}</div>
      </div>
    </div>
  );
}

export default App;
