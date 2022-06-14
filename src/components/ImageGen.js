import './ImageGen.css';
import { useState, useEffect } from "react";
import axios from 'axios';

async function getImg(imgType = "") {
  axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_CAT_API_KEY
  let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full", mime_types: imgType } } )

  return response.data;
}

function ImageGen() {
  const [imgLink, setImgLink] = useState("");
  const [imgType, setImgType] = useState("");

  useEffect(() =>
    updateImg()

  ,[])

  function updateImg() {
    getImg(imgType).then(response => {
      setImgLink(response[0].url)
    })
  }

  const imgTypeChanged = (e) => {
    setImgType(e.target.value)
  }

  return (
    <div className="ImageGen">
      <div className="main-img-container">
        <img className="image-container" src={imgLink} />
        <div className="image-ui">
          <div className="img-type-radio-group">
            <div>
              <input type="radio" name="imgTypeRadio" onChange={imgTypeChanged} checked={imgType === 'gif'} value="gif"/>
              <label>Gifs</label>
            </div>
            <div>
              <input type="radio" name="imgTypeRadio" onChange={imgTypeChanged} checked={imgType === 'jpg,png'} value="jpg,png"/>
              <label>Static</label>
            </div>
            <div>
              <input type="radio" name="imgTypeRadio" onChange={imgTypeChanged} checked={imgType === ''} value=""/>
              <label>All</label>
            </div>
          </div>
          <button type="button" onClick={updateImg}>Next Cat</button>
        </div>
      </div>
    </div>
  );
}

export default ImageGen;
