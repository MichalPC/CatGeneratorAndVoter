import './ImageGen.css';
import { useState, useEffect } from "react";
import axios from 'axios';

async function getImg() {
  axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_CAT_API_KEY
  let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } )

  return response.data;
}



function ImageGen() {
  const [imgLink, setImgLink] = useState("");
  const [imgType, setImgType] = useState("");

  useEffect(() =>
    updateImg()
  ,[])

  function updateImg() {
    getImg().then(response => {
      setImgLink(response[0].url)
    })
  }

  return (
    <div className="ImageGen">
      <div className="main-img-container">
        <img className="image-container" src={imgLink} />
        <div className="image-ui">
          <button type="button" onClick={updateImg}>Next Cat</button>
        </div>
      </div>
    </div>
  );
}

export default ImageGen;
