import React from 'react';
import View from 'reapp-ui/views/View';
import Button from 'reapp-ui/components/Button';
import Input from 'reapp-ui/components/Input';
import Superagent from 'superagent';
import Gallery from 'reapp-ui/components/Gallery';

const base = 'https://api.flickr.com/services/rest/?api_key=&format=rest&format=json&nojsoncallback=1';

export default React.createClass({
  getInitialState() {
    return {
      photos: []
    }
  },

  // see: https://www.flickr.com/services/api/misc.urls.html
  getFlickrPhotoUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
  },

  handleSearch() {
    let searchText = this.refs.search.getDOMNode().value;
    Superagent
      .get(`${base}&method=flickr.photos.search&text=${searchText}&per_page=10&page=1`, res => {
        if (res.status === 200)
          this.setState({
            photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
          });
      });
  },

  render() {
    var { photos } = this.state;

    return (
      <View title="Flickr Search" styles={{ inner: { padding: 20 } }}>

        <Input ref="search" />
        <Button onTap={this.handleSearch}>Search Images</Button>

        <div>
          {!photos.length &&
            <p>No photos found!</p>
          }

          {photos.length &&
            <Gallery
              images={photos}
              width={window.innerWidth}
              height={window.innerHeight - 44}
            />
          }
        </div>

      </View>
    );
  }
});