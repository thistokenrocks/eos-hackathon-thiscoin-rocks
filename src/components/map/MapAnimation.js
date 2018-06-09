import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const fadeOut = keyframes`
  0% { opacity: 1; }
  5% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8); }
`;

const dropFromTop = keyframes`
  0% { margin-top: -45px; }
  100% { margin-top: 0px; }
`;
const flyToTop = keyframes`
  0% { margin-top: 0px; }
  100% { margin-top: -45px; }
`;
// const flyAway = keyframes` 0% { margin-top: 0px; } 50% { margin-top: 45px; } 100% { margin-top: 66px; }`;

const Fade = styled.div`
  display: block;
  visibility: ${props => (props.out ? 'hidden' : 'visible')};
  animation: ${props => (props.out ? fadeOut : fadeIn)} ${props => props.delay} ease-out;
  transition: visibility ${props => props.delay} ease-out;
`;

const FadeOut = styled.div`
  animation: ${fadeOut} ${props => props.delay} ease-out;
  transition: visibility 0s ${props => props.delay};
`;

const PlayerDropped = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  animation: ${dropFromTop} ${props => props.delay} ease-out;
  z-index: 113;
  background: transparent;
  width: ${props => props.cellSizeX}px;
  height: ${props => props.cellSizeX}px;
`;

const PlayerFlew = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  animation: ${flyToTop} ${props => props.delay} ease-out;
  z-index: 113;
  background: transparent;
  width: ${props => props.cellSizeX}px;
  height: ${props => props.cellSizeX}px;
`;

const rotationFrame = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(60deg) scale(1.8);
  }
`;

const motionFrame = (props) => {
  return keyframes`
    0% {
      left: ${props.oldLeft}px;
      top: ${props.oldTop}px;
    }
    100% {
      left: ${props.left}px;
      top: ${props.top}px;
    }
  `;
};

const motionFrameBackAndForth  = (props) => {
  return keyframes`
    0% {
      left: ${props.oldLeft}px;
      top: ${props.oldTop}px;
    }
    34% {
      left: ${props.left}px;
      top: ${props.top}px;
    }
    66% {
      left: ${props.oldLeft}px;
      top: ${props.oldTop}px;
    }
    100% {
      left: ${props.oldLeft}px;
      top: ${props.oldTop - 45}px;
    }
  `;
};

const PlayerMoved = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  animation: ${props => props.keyframe} ${props => props.delay} ease-in;
  z-index: 113;
  background: transparent;
  width: ${props => props.cellSizeX}px;
  height: ${props => props.cellSizeX}px;
`;


const PlayerMovedAndFlew = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  animation: ${props => props.keyframe} ${props => props.delay} ease-in;
  z-index: 115;
  background: transparent;
  width: ${props => props.cellSizeX}px;
  height: ${props => props.cellSizeX}px;
`;




const PlayerContainer = styled.div`
  position: absolute;
  left:  ${props => props.cellShiftX}px;
  top: ${props => props.cellShiftY + props.marginTop }px;
  z-index: 114;
  background: url(/media/desert/logo.png) no-repeat;
  background-size: contain;
  width: 60px;
  height: 80px;
`;

const PlayerIcon = ({ icon }) => (
  <div style={{ padding: 15, paddingBottom: 5 }}>
    <img src={icon} alt={''} style={{ width: '100%', height: 'auto' }} />
  </div>
);

const PlayerObject = ({cellShiftX, cellShiftY, marginTop, icon}) => (
  <PlayerContainer {...{cellShiftX, cellShiftY, marginTop}}>
    <PlayerIcon icon={icon}/>
  </PlayerContainer>
);

const Badaboom = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  z-index: 111;
  background: url(/media/badaboom.png) no-repeat;
  background-size: contain;
  width: ${props => props.cellSizeX}px;
  height: ${props => props.cellSizeX}px;
  animation: ${rotationFrame} ${props => props.delay} linear infinite;
`;

export const MapAnimation = ({ animation, dim, cities, teams, icons }) => {
  const { cellSizeX, cellSizeY } = dim;
  const evenShiftX = 0.5 * cellSizeX;
  const cellShiftX = cellSizeX / 2 - 30;
  const cellShiftY = 0;
  const marginTop = 75;
  if (!animation) return false;

  const { token, x, y, oldX, oldY } = animation;
  if (!animation.token) return false;
  const coord = (y << 16) + x;
  // const inCity = typeof cities[coord] !== 'undefined';

  const left = ((y % 2) ? evenShiftX : 0) + x * cellSizeX;
  const top = (y * cellSizeY / 2) - marginTop;
  const icon = icons[token];
  const delay = '0.8s';

  if (animation.type === 'PlayerStart') {
    return (
      <Fade delay={delay}>
        <PlayerDropped {...{ left, top, coord, cellSizeX, icon, delay }}>
          <PlayerObject {...{icon, cellShiftX, cellShiftY, marginTop}} />
        </PlayerDropped>
      </Fade>
    );
  }
  if (animation.type === 'DefenderDeath') {
    return (
      <FadeOut delay={delay}>
        <PlayerFlew {...{ left, top, coord, cellSizeX, icon, delay }}>
          <PlayerObject {...{icon, cellShiftX, cellShiftY, marginTop}} />
        </PlayerFlew>
      </FadeOut>
    );
  }
  if (animation.type === 'PlayerMove') {
    const oldLeft = ((oldY % 2) ? evenShiftX : 0) + oldX * cellSizeX;
    const oldTop = (oldY * cellSizeY / 2) - marginTop;
    const keyframe = motionFrame({ oldLeft, oldTop, left, top });
    return (
      <PlayerMoved {...{ keyframe, oldLeft, oldTop, left, top, coord, cellSizeX, icon, delay }}>
        <PlayerObject {...{icon, cellShiftX, cellShiftY, marginTop}} />
      </PlayerMoved>
    )
  }

  if (animation.type === 'AttackerDeath') {
    const oldLeft = ((oldY % 2) ? evenShiftX : 0) + oldX * cellSizeX;
    const oldTop = (oldY * cellSizeY / 2) - marginTop;
    const keyframe = motionFrameBackAndForth({ oldLeft, oldTop, left, top });
    return (
      <FadeOut delay={delay}>
        <PlayerMovedAndFlew {...{ left, top, keyframe, oldLeft, oldTop, coord, cellSizeX, icon, delay }}>
          <PlayerObject {...{icon, cellShiftX, cellShiftY, marginTop}} />
        </PlayerMovedAndFlew>
        <Badaboom {...{ left, top, cellSizeX, delay: delay*3 }} />
      </FadeOut>
    );
  }

  return false;
};

export default { MapAnimation };
