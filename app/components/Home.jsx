import React from 'react';
import { RoutedViewListMixin } from 'reapp-routes/react-router';
import NestedViewList from 'reapp-ui/views/NestedViewList';
import View from 'reapp-ui/views/View';
import Button from 'reapp-ui/components/Button';
import Superagent from 'superagent';
import Input from 'reapp-ui/components/Input';

const base = 'https://api.flickr.com/services/rest/?api_key=d72c5a85006014ea74022c115e4ebd5b&format=rest&format=json&nojsoncallback=1';

export default React.createClass({
  mixins: [
    RoutedViewListMixin
  ],

  getInitialState() {
    return {
      photos: []
    }
  },

  // see: https://www.flickr.com/services/api/misc.urls.html
  flickrPhotoUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
  },

  handleSearch() {
    let searchText = this.refs.search.getDOMNode().value;
    Superagent
      .get(`${base}&method=flickr.photos.search&text=${searchText}&per_page=10&page=1`, res => {
        if (res.status === 200)
          this.setState({
            photos: res.body.photos.photo
          });
      });
  },

  render() {
    let { photos }  = this.state;

    return (
      <NestedViewList {...this.routedViewListProps()}>
        <View title={[this.props.handle, 'scotch']}>
          <Input ref="search" />
          <Button onTap={this.handleSearch}>Search Images</Button>

          <div>
            {!photos.length &&
              <p>No photos found!</p>
            }

            {photos.length && photos.map(photo =>
              <img src={this.flickrPhotoUrl(photo)} />
            )}
          </div>
        </View>

        {this.childRouteHandler()}
      </NestedViewList>
    );
  }
});