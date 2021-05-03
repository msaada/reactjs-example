import React, { Component } from 'react';
import Lightbox from 'react-images';
import { Image } from 'react-bootstrap';

import ConditionalCircularProgress from '../common/ConditionalCircularProgress';
export default class ProductImages extends Component {
  styles() {
    return {
      image: {
        display: 'flex',
        justifyContent: 'center',
        width: '40%',
        height: '40%',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
    };
  }

  convertToLightBoxImages(imagesLinks) {
    return imagesLinks.map(picture => {
      return { src: picture };
    });
  }

  render() {
    const {
      currentImage,
      lightboxIsOpen,
      product,
      gotoPrevious,
      gotoNext,
      closeLightbox,
      openLightbox,
    } = this.props;
    if (product && product.imagesLinks.length) {
      const images = this.convertToLightBoxImages(product.imagesLinks);
      return (
        <div style={this.styles().centered}>
          <Image
            style={this.styles().image}
            src={product.imagesLinks[0]}
            onClick={openLightbox}
          />
          {/* <Lightbox
            images={images}
            isOpen={lightboxIsOpen}
            onClickNext={gotoNext}
            onClickPrev={gotoPrevious}
            onClose={closeLightbox}
            showImageCount={true}
            imageCountSeparator={' sur '}
            closeButtonTitle={'Fermer'}
            backdropClosesModal={true}
            currentImage={currentImage}
          /> */}
        </div>
      );
    }
    return <ConditionalCircularProgress predicate={true} />;
  }
}
