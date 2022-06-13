import './ImageGen.css';
import { useState } from "react";

async function getImg() {
  const url = 'https://api.thecatapi.com/v1/images/search'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY
    }
  });
  return response.json();
}

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
