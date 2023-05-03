import React from 'react';
import BoundingBox from './BoundingBox';
import './FaceRecognition.css';

function FaceRecognition({ imageUrl, init, boxes }) {
    if (!init) {
        return (
        <div className='center tc'>
            {imageUrl ?
                <div className='absolute mt4'>
                {/* <div>Image URL: {imageUrl}</div> */}
                <img src={imageUrl} id='face-image' alt="For face detection" />
                {
                    boxes.map((face, i) => {
                    return (
                        <BoundingBox
                            topRow={boxes[i].topRow}
                            rightCol={boxes[i].rightCol}
                            bottomRow={boxes[i].bottomRow}
                            leftCol={boxes[i].leftCol}
                            key={"Face" + i}
                        />
                    )
                    })
                }
                </div>
                : ''}
        </div>
        )
        } else {
            return(null);
        }
}

export default FaceRecognition;