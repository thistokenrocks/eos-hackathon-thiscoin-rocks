import React from 'react';
import { fire } from './../../services/Gtag';

class ExternalLink extends React.Component {
  render() {
    const title = this.props.title || this.props.children || this.props.href;
    const { href, className, style } = this.props;
    const onClick = () => (fire({ action: 'LINK', category: 'click', label: href}));
    return (
      <a {...{href, className, style, onClick}} rel="noopener noreferrer nofollow" target="_blank">
        {title}
      </a>
    );
  }
}

export default ExternalLink;
