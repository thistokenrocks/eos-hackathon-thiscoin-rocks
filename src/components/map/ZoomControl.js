import React from 'react';
import styled from 'styled-components';

const ZoomWrapper = styled.div`
  position: fixed;
  z-index: 10001;
  left: 0px
  width: 50px;
  height: 90px;
  button {
    border-radius: 25px;
    box-shadow: 3px 3px 5px #fff;
    display: block;
    width: 50px;
    height: 40px;
    margin-bottom: 5px;
  }
`;

const SvgPlus = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
    <path fill={color} d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
  </svg>
);

const SvgMinus = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
    <path fill={color} d="M0 10h24v4h-24z"/>
  </svg>
);

export const ZoomControl = ({ height, zoom, can, onZoomIn, onZoomOut }) => (
  <ZoomWrapper style={{ top: height / 2 + 50 }}>
    <button className="btn btn-dark" disabled={!can.zoomIn} onClick={onZoomIn}>
      <SvgPlus color="#ffffff" />
    </button>
    <button className="btn btn-dark" disabled={!can.zoomOut} onClick={onZoomOut}>
      <SvgMinus color="#ffffff" />
    </button>
  </ZoomWrapper>
);

export default { ZoomControl };


