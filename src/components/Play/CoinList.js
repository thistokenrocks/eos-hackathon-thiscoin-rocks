import React from 'react';
import styled from 'styled-components';

const Cell = styled.div`
   .button {
      display: block;
      width: 100%;
      text-align: left;
      cursor: pointer;
      height: 48px;
      line-height: 48px;
      background: url(/media/bk-dark.png) 0px 0px;
      color: white;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 3px;
      outline: none;
      border: 1px #666 solid;
      border-radius: 5px;
      user-select: none;
   }

   .button .icon {
      display: inline-block;
      width: 40px;
      text-align: center;
   }
   .button:hover {
      border: 1px #eee solid;
      background: #888;
   }
   .button.active {
      background: white;
      color: black;
   }
   .symbol {
      color: #ccc;
      font-weight: normal;
   }
   .button:hover .symbol,
   .button.active .symbol {
      color: #000;
   }
`;

export const CoinList = (props) => {
  const { join, coins, onSelectTeam } = props;
  const isSelected = row => (join.selectedTeam.id === row.id);
  const list = join.filter ?
    coins.filter(t => t.doc.icon && (
      t.name.toLowerCase().indexOf(join.filter.toLowerCase()) === 0 ||
      t.symbol.toLowerCase().indexOf(join.filter.toLowerCase()) === 0
    )) : coins.filter(t => t.icon)
  return (
    <div className="row">
      {list.slice(0, 100).map(row => (
        <div key={row.id} className="col-md-3 col-sm-4">
          <Cell>
            <div
              onClick={() => { onSelectTeam(row); }}
              className={`${isSelected(row) ? 'active button': 'button'}`}
            >


{JSON.stringify(row)}

            </div>
          </Cell>
        </div>
      ))}
    </div>
  );
};

export default { CoinList };
