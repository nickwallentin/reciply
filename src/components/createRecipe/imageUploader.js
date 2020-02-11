import React, { useState, useCallback } from "react"
import ReactDOM from "react-dom"
import { getFirebase } from "../../firebase/firebase"
import Cropper from "react-easy-crop"
import styled from "styled-components"
import getCroppedImg from "./cropImage"

import { Button } from "../styled"

import PlusIcon from "../../assets/icons/plus.svg"

const ImageUploader = ({ image, setImage }) => {
  const [file, setFile] = useState("")
  const [preview, setPreview] = useState("")
  const [croppedImage, setCroppedImage] = useState(null)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleClearImage = () => {
    setFile("")
    setPreview("")
    setCroppedImage(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels)
      console.log("done", { croppedImage })
      setCroppedImage(croppedImage)
      var xhr = new XMLHttpRequest()
      xhr.open("GET", croppedImage, true)
      xhr.responseType = "blob"
      xhr.onload = function(e) {
        if (this.status == 200) {
          var myBlob = this.response
          setImage(myBlob)
        }
      }
      xhr.send()

      setFile("")
      setPreview("")
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const handleSelectFile = e => {
    e.preventDefault()
    const fileInput = document.getElementById("file-upload")
    fileInput.click()
  }
  const handleFileSelected = e => {
    setFile(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <React.Fragment>
      {croppedImage ? (
        <React.Fragment>
          <div
            style={{ width: "200px", margin: "0 auto" }}
            className="image-preview"
          >
            <img
              style={{ borderRadius: "5px" }}
              className="cropped-image"
              src={croppedImage}
            />
            <Button
              style={{ marginBottom: "15px" }}
              full
              cta
              onClick={() => handleClearImage()}
            >
              Change image
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <UploadContainer name="image-uploader">
          <React.Fragment>
            <input
              id="file-upload"
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              onChange={e => handleFileSelected(e)}
            />
            <button onClick={e => handleSelectFile(e)} type="submit">
              <PlusIcon />
            </button>

            <div style={{ width: "200px", margin: "0 auto" }}>
              <h4>Upload image</h4>
              <p>Every fantastic recipe needs a fantastic image.</p>
            </div>
          </React.Fragment>
        </UploadContainer>
      )}
      {file && (
        <ImageManipulator>
          <div className="wrapper">
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <div className="actions">
              <Button onClick={() => handleClearImage()} full>
                Cancel
              </Button>
              <Button onClick={showCroppedImage} full cta>
                Pick Image
              </Button>
            </div>
          </div>
        </ImageManipulator>
      )}
    </React.Fragment>
  )
}

export default ImageUploader

const UploadContainer = styled.form`
  color: var(--c-txt);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .cropped-image {
    width: 250px;
    height: 250px;
    border-radius: 5px;
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background: transparent;
    border: 1px solid var(--c-txt-60);
    border-radius: 5px;
    margin-bottom: 15px;
    &:focus {
      outline: none;
    }
    svg {
      width: 44px;
      height: 44px;
      path {
        fill: var(--c-txt-60);
      }
    }
  }
  & button:hover {
    border-color: var(--c-txt);
    svg {
      path {
        fill: var(--c-txt);
      }
    }
  }
`
const ImageManipulator = styled.div`
  z-index: 10;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: black;
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .actions {
      padding: 20px;
      position: fixed;
      bottom: 0px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
    }
  }
`
