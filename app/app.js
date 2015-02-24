// needed for now, see issue #1 in reapp-ui
import 'reapp-ui';

// import our theme
import './theme/theme';

// routes & run
import Router from 'reapp-routes/react-router';
import Routes from './routes';

Router(Routes);