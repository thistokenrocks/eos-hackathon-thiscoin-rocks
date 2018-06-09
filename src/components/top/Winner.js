import React from 'react';
import styled from 'styled-components';
// import { PhoneScreenHidden } from 'react-responsive-redux'

const Logo = styled.div`
position: absolute;
top: 5px;
left: 5px;
z-index: 10012;
width: 48px;
height: 48px;
img { height: 100%; width: auto; }
`;

export const WinnerLogo = ({ winner }) => {
  if (!winner || !winner.doc) return (
    <Logo>
      <img src='/media/hero76.png' alt="This Coin Rocks" style={{ marginLeft: 10 }}/>
    </Logo>
  );
  return (
    <Logo>
      <img src={`/${winner.icon}`} alt={winner.name} style={{ width: 48, margin: 5, marginRight: 15 }}/>
    </Logo>
  );
};
const WinnerDiv = styled.div`
  position: absolute;
  top: 4px;
  left: 235px;
  z-index: 10011;
  color: #ff9900;
  h1 { color: #ff9900; font-size: 16px; padding: 0px 0px; margin: 0; text-align: left; }
`;

export const Winner = ({ winner }) => {
  if (!winner || !winner.doc) return (
    <WinnerDiv>
      <h1>This Coin Rocks!</h1>
      <div>The strongest community rules!</div>
    </WinnerDiv>
  );

  const plural = winner.count !== 1 ? 's ' : ' ';
  let withTowers = `player${plural}`;
  if (winner.towers === 1) {
    withTowers += 'who occupied a tower';
  } else if (winner.towers > 1) {
    withTowers += `who occupied ${winner.towers} towers`;
  }
  return (
    <WinnerDiv>
      <h1>{JSON.stringify(winner)} Rocks!</h1>
      <div>it has {winner.count} {withTowers}</div>
    </WinnerDiv>
  );
};

export default { Winner, WinnerLogo };
