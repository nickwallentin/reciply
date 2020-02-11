import styled from "styled-components"

export const Sec = styled.div`
  padding: ${props => props.space || "15px 0"};
  background: var(--c-bg-s);
  color: var(--c-txt);
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--c-txt);
    span {
      color: var(--c-txt);
      display: block;
      font-weight: 500;
      font-size: 80%;
      margin-bottom: 5px;
    }
  }
  h1 {
    font-size: 1.6rem;
    margin-bottom: 15px;
    @media screen and (max-width: 900px) {
      font-size: 1.4rem;
    }
  }
  h2 {
    font-size: 40px;
    margin-bottom: 10px;
  }
  h3,
  h4 {
    margin-bottom: 10px;
  }
  h3 {
    font-size: 1.2rem;
  }
  h4 {
    font-size: 1rem;
  }
`

export const Wrap = styled.div`
  max-width: ${props => (props.wide ? "1080px" : "900px")};
  width: 100%;
  margin: 0 auto;
`

export const Form = styled.form`
  margin-bottom: 0px;
  color: var(--c-txt);
  .input-group {
    margin-bottom: 10px;
    &.center {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }

    input,
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active,
    textarea {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      padding: 10px 20px;
      outline: none;
      border: 1px solid var(--c-border);
      border-radius: 5px;
      background: var(--c-bg-s) !important;
      color: var(--c-txt) !important;
      -webkit-box-shadow: 0 0 0 30px var(--c-bg-s) inset !important;
      -webkit-text-fill-color: var(--c-txt) !important;
    }

    &.checkbox {
      display: flex;
      align-items: center;
      input[type="checkbox"] {
        margin-right: 10px;
        display: block;
        width: inherit;
        padding: 10px 20px;
        outline: none;
        border: 1px solid var(--c-border);
        border-radius: 5px;
        background: var(--c-bg-s) !important;
        color: var(--c-txt) !important;
        -webkit-box-shadow: 0 0 0 30px var(--c-bg-s) inset !important;
        -webkit-text-fill-color: var(--c-txt) !important;
      }
    }
  }
  .input-group.double {
    display: grid;
    grid-template-columns: 2fr 1fr;
    input {
      border-radius: 0px;
      &:first-of-type {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: 0px;
      }
      &:last-of-type {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
  .input-group:first-of-type {
    margin-top: 0px !important;
  }
  .input-group:last-of-type {
    margin-top: 10px;
    margin-bottom: 0px;
  }
  input[type="file"] {
    width: 150px;
    height: 150px;
    border: 1px dashed var(--c-border);
  }
`
export const Card = styled.div`
  background: ${props => props.bg || "var(--c-bg)"};
  padding: ${props => props.space || "0px"};
  border-radius: 5px;
  color: var(--c-txt);
  & > div {
    padding: 20px;
  }

  margin-bottom: 15px;
  &:last-of-type {
    margin-bottom: 0px;
  }

  .card-header {
    border-bottom: 1px solid var(--c-bg-s);
    display: flex;
    align-items: center;
    justify-content: ${props =>
      props.flexHeader ? "space-between" : "inherit"};
    h4 {
      margin-bottom: 0px;
    }
  }
  .card-content {
    .separator {
      margin: 15px 0px;
      text-align: center;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--c-txt);

      span {
        background: var(--c-bg);

        padding: 0px 20px;
        z-index: 1;
        position: relative;
      }

      &::after {
        content: " ";
        display: block;
        height: 1px;
        width: 100%;
        background: var(--c-border);
        position: absolute;
        top: calc(50% - 1px);
      }
    }
  }
  .card-footer {
    text-align: center;
    border-top: 1px solid var(--c-bg-s);
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.cols || "1fr"};
  grid-gap: ${props => props.gap || "20px"};

  @media screen and (max-width: 800px) {
    grid-template-columns: ${props => props.mCols || "1fr"};
    grid-gap: ${props => props.mGap || "20px"};
  }
`

export const Button = styled.button`
  cursor: pointer;
  text-decoration: none;
  padding: ${props => (props.large ? "20px 30px" : "10px 15px")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.full ? "100%" : "inherit")};
  text-align: center;
  color: ${props =>
    props.border ? "var(--c-bg-inv)" : props.cta ? "white" : "var(--c-txt)"};
  background: ${props =>
    props.border
      ? "var(--c-bg-s)"
      : props.cta
      ? "var(--c-pri)"
      : "var(--c-bg-s)"};
  border-radius: 5px;
  font-weight: ${props => (props.cta ? "900" : "500")};
  border: ${props => (props.border ? "2px solid var(--c-txt)" : "none")};
  font-size: ${props => (props.large ? "18px" : "14px")};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    path {
      fill: var(--c-txt);
    }
  }

  &:focus {
    outline: none;
  }

  &:hover {
  }
`
export const Blurb = styled.div`
  display: flex;
  flex-direction: ${props => (props.left ? "row" : "column")};
  .text {
    margin-left: 35px;
  }
  h4 {
    .pill {
      display: inline-block;
      color: white;
      background: var(--c-purple);
      padding: 3px 10px;
      border-radius: 99px;
      margin-left: 10px;
    }
  }
`
