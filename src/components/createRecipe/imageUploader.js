import React, { useState, useCallback } from "react"
import ReactDOM from "react-dom"
import { getFirebase } from "../../firebase/firebase"
import Cropper from "react-easy-crop"
import styled from "styled-components"
import getCroppedImg from "./cropImage"

import { Button, Grid, Input, Textarea } from "../styled"

import AddImageIcon from "../../assets/icons/add-image.svg"

const ImageUploader = ({
  image,
  setImage,
  name,
  setName,
  description,
  setDescription,
}) => {
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
          </div>
        </React.Fragment>
      ) : (
        <UploadContainer name="image-uploader">
          <Grid cols="100px 1fr" mCols="80px 1fr">
            <div>
              <input
                id="file-upload"
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                onChange={e => handleFileSelected(e)}
              />
              <button
                style={{ margin: "0px" }}
                onClick={e => handleSelectFile(e)}
                type="submit"
              >
                <AddImageIcon />
              </button>
            </div>

            <div>
              <div>
                <Input
                  className="invisible h3"
                  type="text"
                  placeholder="Enter Recipe Name"
                  style={{ marginBottom: "5px" }}
                  autoFocus
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  className="invisible p"
                  placeholder="Enter a description"
                  rows="3"
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
          </Grid>
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
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
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
    border: 1px solid var(--c-icon-l);
    border-radius: 5px;
    margin-bottom: 15px;
    &:focus {
      outline: none;
    }
    svg {
      width: 34px;
      height: 34px;
      path {
        fill: var(--c-icon-l);
      }
    }
    @media screen and (max-width: 800px) {
      width: 80px;
      height: 80px;
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
