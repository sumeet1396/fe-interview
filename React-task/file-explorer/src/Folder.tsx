/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const Folder = React.memo(({ name, handleAddFolder, handleAddFile }: any) => {
  return (
    <div className="folder">
      <div className="folder-name">{name}</div>
      <div className="control">
        <button className="btn folder-btn" onClick={handleAddFolder}>
          Folder
        </button>
        <button className="btn file-btn" onClick={handleAddFile}>
          File
        </button>
      </div>
    </div>
  );
});

export default Folder;
