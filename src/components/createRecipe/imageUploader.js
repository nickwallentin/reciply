import React, { useState, useCallback } from "react"
import Slider from "@material-ui/core/Slider"
import Cropper from "react-easy-crop"
import styled from "styled-components"
import getCroppedImg from "./cropImage"

import { Button, Grid, Input, Textarea } from "../styled"

import AddImageIcon from "../../assets/icons/add-image.svg"
import DoneIcon from "../../assets/icons/check.svg"
import CancelIcon from "../../assets/icons/clear.svg"

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
      <UploadContainer name="image-uploader">
        <Grid cols="100px 1fr" mCols="80px 1fr">
          <div>
            {croppedImage ? (
              <div className="image-preview">
                <img
                  onClick={e => handleSelectFile(e)}
                  style={{ borderRadius: "5px", height: "80px" }}
                  className="cropped-image"
                  src={croppedImage}
                />
              </div>
            ) : (
              <React.Fragment>
                <button
                  style={{ margin: "0px" }}
                  onClick={e => handleSelectFile(e)}
                  type="submit"
                >
                  <AddImageIcon />
                </button>
              </React.Fragment>
            )}
            <input
              id="file-upload"
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              onChange={e => handleFileSelected(e)}
            />
          </div>

          <div>
            <div>
              <Input
                className="invisible h3"
                type="text"
                placeholder="Enter Recipe Name"
                style={{ marginBottom: "5px" }}
                autoFocus
                onChange={e => setFile(e.target.value)}
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

      {file && (
        <ImageManipulator>
          <div className="image-area">
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{ width: "1000px", height: "1000px" }}
            />
          </div>
          <Slider
            className="zoom"
            min={10}
            max={100}
            onChange={(e, v) => setZoom(v / 10)}
          />
          <div className="actions">
            <Button
              onClick={() => handleClearImage()}
              full
              style={{ background: "transparent" }}
            >
              <CancelIcon />
              Cancel
            </Button>
            <Button
              onClick={showCroppedImage}
              full
              style={{ background: "transparent" }}
            >
              <DoneIcon /> Done
            </Button>
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
  background: var(--c-bg-d);
  .image-area {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .zoom {
    position: fixed;
    top: 20px;
    width: calc(100% - 40px);
    margin: 20px;
  }
  .actions {
    padding: 10px;
    border-radius: 5px;
    z-index: 11;
    margin: 20px;
    position: fixed;
    bottom: 0px;
    width: calc(100% - 40px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    background: var(--c-bg-d);
  }
`
