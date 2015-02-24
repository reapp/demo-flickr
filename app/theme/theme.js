import UI from 'reapp-ui';
import iOS from 'reapp-ui/themes/ios';

// use the ios base stylesheet
import 'reapp-ui/themes/ios/stylesheets';

// custom constants
UI.addConstants(
  iOS.constants.base,
  iOS.constants.components,
  require('./constants/components')
);

// custom styles
UI.addStyles(
  iOS.styles,
  require('./styles')
);

// default animations
UI.addAnimations(
  iOS.animations
);