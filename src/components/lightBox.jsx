import React from 'react';
import Lightbox from 'react-image-lightbox';

const LightBox = ({ photoIndex, images, toggleLightBox, handleIndex }) => (
    <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={() => toggleLightBox(false)}
        onMovePrevRequest={() =>
            handleIndex((photoIndex + images.length - 1) % images.length)
        }
        onMoveNextRequest={() =>
            handleIndex((photoIndex + 1) % images.length)
        }
    />
)
// toggleLightBox(tt) {
//   console.log("tt", tt)
//   this.setState({
//     isOpen: tt
//   })
// }

// changeSelectedImageIndex(currentIndex) {
//   this.setState({
//     photoIndex: currentIndex
//   })
// }
export default LightBox