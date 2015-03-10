import React from 'react';
import View from 'reapp-ui/views/View';
import Button from 'reapp-ui/components/Button';
import Input from 'reapp-ui/components/Input';
import Superagent from 'superagent';
import Gallery from 'reapp-ui/components/Gallery';

const flickrKey = 'a6918dd638e6e7624e50eb4c6fc30fe9';
const base = `https://api.flickr.com/services/rest/?api_key=${flickrKey}&format=rest&format=json&nojsoncallback=1`;

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
        if (res.status === 200 && res.body.photos)
          this.setState({
            photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
          });
      });
  },

  styles: {
    view: {
      inner: {
        padding: 20
      }
    },

    input: {
      input: {
        border: '1px solid #ddd',
        marginBottom: 10
      }
    }
  },

  render() {
    var { photos } = this.state;

    return (
      <View title="Flickr Search" styles={this.styles.view}>

        <Input ref="search" styles={this.styles.input} />
        <Button onTap={this.handleSearch}>Search Images</Button>

        <div className="verticalCenter">
          {!photos.length &&
            <p>No photos found!</p>
          }

          {!!photos.length &&
            <Gallery
              onClose={() => {
                this.setState({ photos: [] })
              }}
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