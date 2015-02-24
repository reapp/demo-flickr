import React from 'react';
import View from 'reapp-ui/views/View';
import BackButton from 'reapp-ui/components/buttons/BackButton';

// looking for more examples? check our kitchen-sink repository:
// https://github.com/reapp/kitchen-sink/tree/master/app/components

export default React.createClass({
  render() {
    var backButton = (
      <BackButton onTap={() => window.history.back()} />
    );

    return (
      <View {...this.props} title={[backButton, "Sub Route"]}>
        <p>Hello, from the sub route!</p>
        <p>You can drag from the left side of the screen to drag this view back out</p>
        <p>Ready to deploy? Run <code>reapp build</code> and check your build directory</p>
      </View>
    );
  }
});