import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextInput from './../controls/TextInput';

const CloseEsc = ({ color, onClick }) => {
  const styleCross = { fontSize: 30, fontWeight: 'bold', textAlign: 'center' };
  const styleEscLabel = { fontFamily: 'arial, serif', fontWeight: 'bold', fontSize: 14, textAlign: 'center' };
  if (color) {
    styleCross.color = color;
    styleEscLabel.color = color;
  }
  return (
    <button onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={styleCross}>✕</div>
      <div style={styleEscLabel}>ESC</div>
    </button>
  );
};

const Backdrop = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
  opacity: 0.5;
  background: #000;
  z-index: 5000;
`;
const DialogAlignment = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5001;
`;
const TopRight = styled.div`
  position: absolute;
  background: transparent;
  top: 0;
  right: 20px;
  z-index: 5001;
  button { background: transparent; border: none; }
`;
const Dialog = styled.div`
  position: relative;
  left: -${props => (props.width / 2)}px;
  top: -${props => (props.height / 2)}px;
  background: #fff;
  width: ${props => (props.width)}px;
  height: ${props => (props.height)}px;
  border: 2px #444 solid;
  border-radius: 5px;
  padding: 20px;
  z-index: 5002;
`;

export class CityTitleModal extends React.Component {

  static propTypes = {
    account: PropTypes.any,
    height: PropTypes.number.isRequired,
    title: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    title: ''
  };

  componentWillMount() {
    this.setState({ title: this.props.title ? this.props.title : '' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setState({ title: this.props.title ? this.props.title : '' });
    }
  }

  render() {
    const { height, account, onSubmit, onCancel } = this.props;
    return (
      <div>
        <Backdrop style={{ height }} onClick={onCancel} />
        <TopRight>
          <CloseEsc color={'white'} onClick={onCancel} />
        </TopRight>

        <DialogAlignment height={150} width={320}>
          <Dialog height={150} width={320}>
            <div style={{ textAlign: 'center' }}>
              Please specify new tower name:
            </div>
            <div>
              <TextInput
                autofocus={true}
                maxLength={16}
                value={this.state.title} onChange={title => {this.setState({ title })}}
              />
            </div>
            <div style={{ margin: '0px auto', width: '80%', textAlign: 'center', marginTop: 10 }}>
              <button
                className='btn btn-primary'
                style={{ width: '100%' }}
                onClick={() => (onSubmit({ account, title: this.state.title }))}
              >
                Update Tower Name
              </button>
            </div>
          </Dialog>
        </DialogAlignment>
      </div>
    );
  }
}

export default { CityTitleModal };
