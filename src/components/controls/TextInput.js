import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {

  isFocused = false;

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    autofocus: PropTypes.any
  };

  onFocus = () => {
    this.isFocused = true;
  };

  onBlur = () => {
    this.isFocused = false;
  };

  safeValue = () => {
    return this.props.value ? this.props.value : '';
  }
  componentDidMount() {
    this.input.value = this.safeValue();
    if (this.props.autofocus) {
      setTimeout(() => { this.input.focus(); }, 500);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (!this.isFocused) {
        this.input.value = this.safeValue();
      }
    }
  }

  handleKeyPress = (e) => {
    if (e.which === 13 && typeof this.props.onEnter === 'function') {
      this.props.onEnter();
    }
    if (e.which === 27 && typeof this.props.onEsc === 'function') {
      this.props.onEsc();
    }
  };

  render() {
    const onChange = e => (this.props.onChange(e.target.value));
    return (
      <input
        id={this.props.id}
        maxLength={this.props.maxLength}
        ref={(input) => { this.input = input; }}
        onChange={onChange}
        onKeyPress={this.handleKeyPress}
        placeholder={this.props.placeholder}
        className={`form-control ${this.props.className ? this.props.className : ''}`}
        onFocus={this.onFocus} onBlur={this.onBlur}
        style={this.props.style}
        defaultValue={this.safeValue()}
        type={this.props.type ? this.props.type : 'text'}
      />
    );
  }
}

export default TextInput;
