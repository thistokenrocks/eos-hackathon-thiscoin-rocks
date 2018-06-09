import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SmallLoader } from './../controls/SmallLoader';

const Join = styled.div`
   min-width: 350px;
   background: url(/media/bk-dark.png) 0px 0px;
   opacity: 0.95;
   height: 140px;
   left: 0px;
   width: 100%;
   overflow: hidden;
   bottom: 0px;
   position: fixed;
   z-index: 10;
   text-align: center;
   box-shadow: -3px 0px 10px #ff9900;

   a { color: white; }
   .explorer { color:white; font-size:11px; }

   button.close {
      position: absolute;
      right: 10px;
      top: 0px;
      color: white;
      text-shadow: 1px 1px 3px #777;
      outline: none;
   }
   button.btn-lg {
      display: block;
      width: 80%;
      margin: 10px 10%;
      cursor: pointer;
      border: 1px #888 solid;
      border-radius: 5px;
      background: #000000;
      color: white;
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
   }
   button.btn-lg:hover {
      border-color: #ff9900;
   }
`;

export const JoinDialog = (props) => {
  const { alert, mapId, free, join, canJoin, player, operations, account, onJoin, onCancelTeam } = props;
  const doJoin = () => (onJoin({ alert, docTeam: join.selectedTeam.doc, player, free, account }));
  const isJoining = operations.filter(o => o.type === 'joining').length > 0;
  const isBlocked = join.isBlocked || !free.length || isJoining;
  if (!canJoin) return false;
  const tokenDoc = join.selectedTeam.doc;

  return (
    <Join>
      <button onClick={onCancelTeam} className='close'>x</button>
      <button onClick={doJoin} disabled={isBlocked} className='btn btn-lg btn-inverse'>
        {join.isBlocked || isJoining ? <SmallLoader /> : false }
        {isJoining ? 'Joining as ' : 'Join as '} {tokenDoc.name}
      </button>
      <div className='links'>
        By clicking the button, <br />I accept
        &nbsp;<Link to={`/${mapId}/terms`}>Terms of Use</Link>&nbsp;
        and <Link to={`/${mapId}/privacy`}>Privacy Policy</Link>
      </div>
      {tokenDoc ? (
        <div className='explorer'>
          Token Explorer: {tokenDoc.explorer.join('')}
        </div>
      ): false}
    </Join>
  );
};

export default { JoinDialog };
