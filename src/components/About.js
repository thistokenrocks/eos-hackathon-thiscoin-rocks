import React, { Component } from 'react';
import styled from 'styled-components';
import Loader from './controls/Loader';
// import { minDefence } from './../constants';
import HeaderContainer from './../containers/top/HeaderContainer';

const Wrapper = styled.div`
  h1 {
    font-weight: normal;
    margin-bottom: 56px;
  }
  h2 {
    color: #fd9700;
    text-align:center;
    margin-bottom: 20px;
    padding-bottom: 0px;
    font-family: inherit;
    font-size: 40px;
    font-weight: normal;
    line-height: 1;
  }
  p { font-size: 17px; line-height: 20px; color: #f4f4f4; margin-top: 0px; margin-bottom: 30px; text-align: justify; }
  p.mission { font-size: 20px; line-height: 25px; font-weight: normal; text-align: center; }
  padding-top: 20px;
`;

/*const Card = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 1px #40403e solid;
  background: url(/media/bk-dark.png) 0px 0px;
  margin-bottom: 30px;
  padding: 30px 20px;
  color: #f6f6f4;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);

  .towers-list {
    display: flex;
    width: 100%;
  }
  .towers-list > div {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
  .clr { clear: both }
  @media(max-width: 799px) {
    .towers-list {
       width: 100%;
       display: block;
    }
    .towers-list > div {
       float: left;
       width: 50%;
    }
  }
`;*/

class About extends Component {
  render() {
    const { maps } = this.props;
    if (!maps.loaded) return (<Loader />);
    return (
      <div>
        <HeaderContainer />
        <div className='container'>
          <Wrapper>

            <h1>Our Mission</h1>
            <p className="mission">
              Crypto market is over saturated with coins that have little value.
              Our mission is to give opportunity to real communities that have real members to stand out against scam and fraud coins that don’t have any community at all.
            </p>
            <p className="mission">
              Community is the real power behind virtual world of crypto! <br />
              Money isn’t important is this game - people are.
            </p>
          </Wrapper>

        </div>
      </div>
    );
  }
}

export default About;
