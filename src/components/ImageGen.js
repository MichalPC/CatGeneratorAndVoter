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
  const [imgId, setImgId] = useState("");
  const [imgVote, setImgVote] = useState({imgVoteId: "", imgVoteValue:-1})

  useEffect(() =>
    updateImg()

  ,[])

  function updateImg() {
    getImg(imgType).then(response => {
      setImgLink(response[0].url)
      setImgId(response[0].id)
    })
  }

  const imgTypeChanged = (e) => {
    setImgType(e.target.value)
  }

  const dislikeVote = async () => {
    let body = {
      image_id: imgId,
      value: 0
    }
    let response = await axios.post('https://api.thecatapi.com/v1/votes', body)
    setImgVote(() => ({
      imgVoteId: response.data.id,
      imgVoteValue: 0
    }))
    console.log(imgVote)
  }

  const likeVote = async () => {
    let body = {
      image_id: imgId,
      value: 1
    }
    let response = await axios.post('https://api.thecatapi.com/v1/votes', body)
    console.log(response.data)
    console.log(imgVote)

    setImgVote(() => ({
      imgVoteId: response.data.id,
      imgVoteValue: 1
    }))
  }

  return (
    <div className="ImageGen">
      <div className="main-img-container">
        <img className="image-container" src={imgLink} />
        <div className="image-ui">
          <div className="img-ui-top">
            <button className="like-button" onClick={likeVote}> Like </button>
            <button className="dislike-button" onClick={dislikeVote}> Dislike </button>
          </div>
          <div className="img-ui-bot">
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
            <button className="next-cat-button" type="button" onClick={updateImg}>Next Cat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGen;
