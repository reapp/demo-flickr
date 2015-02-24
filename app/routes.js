// these routes use reapp-routes and webpack to
// make a little magic happen.

// they will automatically require your component
// for you, based on the route structure.

// - name 'app':
//   path '/'
//   handler './components/App'

// - name 'home'
//   path '/home'
//   handler './components/Home'
//     notice the { dir: '' } keeps this from nesting

// - name 'sub'
//   path '/home/sub'
//   handler './components/home/Sub'

module.exports = ({ routes, route }) =>
  routes(require,
    route('app', '/', { dir: '' },
      route('home', '/',
        route('sub')
      )
    )
  );