import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import ExternalLink from './../controls/ExternalLink';
import './Wallet.css';

/*
const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const shakeColor = keyframes`
  10%, 90% { fill: lightred; }
  20%, 80% { fill: white; }
  30%, 50%, 70% { fill: #ff9900; }
  40%, 60% { fill: red; opacity: 0.5; }
`;
const ArrowDiv = styled.div`
  position: absolute;
  left: -40px;
  top: 5px;
  animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
  svg path {
    animation: ${shakeColor} 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
  }
`;

const Attention = ({ title }) => (
  <ArrowDiv title={title}>
    <svg width="23" height="28" viewBox="0 0 23 28" data-code="61537" data-tags="arrow-right">
      <g transform="scale(0.02734375 0.02734375)">
        <path d="M841.143 548.571c0 19.429-7.429 38.286-21.143 52l-372 372c-13.714 13.143-32.571 21.143-52 21.143s-37.714-8-51.429-21.143l-42.857-42.857c-13.714-13.714-21.714-32.571-21.714-52s8-38.286 21.714-52l167.429-167.429h-402.286c-41.143 0-66.857-34.286-66.857-73.143v-73.143c0-38.857 25.714-73.143 66.857-73.143h402.286l-167.429-168c-13.714-13.143-21.714-32-21.714-51.429s8-38.286 21.714-51.429l42.857-42.857c13.714-13.714 32-21.714 51.429-21.714s38.286 8 52 21.714l372 372c13.714 13.143 21.143 32 21.143 51.429z" />
      </g>
    </svg>
  </ArrowDiv>
);


const linkStyle = {
  padding: 0,
  color: '#fff !important'
};
const NoWalletConnected = () => (
  <div className='wallet' style={{ position: 'relative', fontSize: 14, textAlign: 'center', background: 'red' }}>
    <Attention />
    not connected yet
    <br />
    &nbsp; Please use <ExternalLink href="https://scatter-eos.com/" title="Scatter" style={linkStyle} /> to start.
    &nbsp;
  </div>
);
*/

export const Wallet = ({ account, networkMatch }) => {
  return <div className='wallet' style={{ position: 'relative', height: 50 }}>&nbsp;</div>;
  /*if (!account.net || !account.accountId) return <NoWalletConnected />;
  return (
    <div className='wallet' style={{ position: 'relative'}}>
      {networkMatch ? false : <Attention />}
      <div className="line1">
        Your Network:
        <span title={account.net.id} className={`networkTitle ${account.net.isMain ? 'mainnet' : ''}`}>{account.net.title}</span>
        {account.noEOS ?
          <span style={{ marginLeft: 10, color: 'darkred', padding: '0px 5px', background: 'pink' }}>No EOS in wallet</span> :
          <span title="EOS Wallet Balance" className="balance">{JSON.stringify(account.balance)} EOS</span>
        }
      </div>
      <div className="accountId">
        {account.accountId}
        {account.accountIndex ? ` (${account.accountIndex})`: ''}
      </div>
    </div>
  );*/
};

export default { Wallet };
