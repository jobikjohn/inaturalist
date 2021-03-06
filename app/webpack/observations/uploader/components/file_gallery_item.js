import _ from "lodash";
import React, { PropTypes, Component } from "react";
import { Glyphicon } from "react-bootstrap";
import Photo from "./photo";

class FileGalleryItem extends Component {

  constructor( props, context ) {
    super( props, context );
    this.openPhotoViewer = this.openPhotoViewer.bind( this );
    this.closeButton = this.closeButton.bind( this );
    this.zoomButton = this.zoomButton.bind( this );
  }

  openPhotoViewer( ) {
    const photoIndex = _.indexOf( this.props.obsCard.uploadedFileIDs(), this.props.file.id );
    this.props.setState( { photoViewer: {
      show: true,
      obsCard: this.props.obsCard,
      activeIndex: ( photoIndex === -1 ) ? 0 : photoIndex
    } } );
  }

  closeButton( ) {
    return (
      <button className="btn-close-photo" onClick={ () =>
        this.props.confirmRemoveFile( this.props.file, this.props.obsCard ) }
      >
        <Glyphicon glyph="remove" />
      </button>
    );
  }

  zoomButton( ) {
    return (
      <button className="btn-enlarge" onClick={ this.openPhotoViewer }>
        <Glyphicon glyph="search" />
      </button>
    );
  }

  render( ) {
    let close;
    let item;
    let zoom;
    if ( this.props.file.upload_state === "uploading" ) {
      item = ( <Glyphicon glyph="refresh" className="fa-spin" /> );
    } else if ( this.props.file.upload_state === "pending" ) {
      item = ( <Glyphicon glyph="hourglass" /> );
    } else if ( this.props.file.photo ) {
      item = ( <Photo { ...this.props } /> );
      zoom = this.zoomButton( );
      close = this.closeButton( );
    } else {
      item = ( <Glyphicon glyph="exclamation-sign" /> );
      close = this.closeButton( );
    }
    return (
      <div className="gallery-item">
        { close }
        { item }
        { zoom }
      </div>
    );
  }
}

FileGalleryItem.propTypes = {
  obsCard: PropTypes.object,
  file: PropTypes.object,
  setState: PropTypes.func,
  confirmRemoveFile: PropTypes.func,
  draggingProps: PropTypes.object,
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func
};

export default FileGalleryItem;
