import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Menu from 'reapp-ui/components/Menu';
import Button from 'reapp-ui/components/Button';
import LayoutLeftNav from 'reapp-ui/views/LayoutLeftNav';

export default React.createClass({
  render() {
    var button = (
      <Button
        iconProps={{
          file: require('reapp-ui/assets/icons/hamburger.svg'),
          stroke: 1,
          size: 24,
          animations: false
        }}
        chromeless />
    );

    var menu = (
      <Menu>
        <Link to="sub">scotch</Link>
      </Menu>
    );

    return (
      <LayoutLeftNav
        title="scotch"
        side={menu}
        handle={button}>
        <RouteHandler {...this.props} />
      </LayoutLeftNav>
    );
  }
});