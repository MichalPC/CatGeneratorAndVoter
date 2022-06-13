import './ImageGen.css';
import { useState } from "react";

function ImageGen() {
  const [imgLink, setImgLink] = useState("");

  return (
    <div className="ImageGen">
      <div className="main">
        <img src=imgLink />
      </div>
    </div>
  );
}

export default ImageGen;
