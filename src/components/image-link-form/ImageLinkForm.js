import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onDetectSubmit, validImage, hasFace, init, input }) => {
  const detectButtonLabel = !init && input === '' ? 'Reset' : 'Detect';

  return (
    <div className='center ph1 pv4 br2 shadow-5 flex-column mt4 w-80 bg-half-white'>
      <div className='f3-ns f6 tc center pb3 w-80'>
          {'Enter the URL of an image below to detect colors and any faces present!'}
      </div>
      <div className='form pa3 center w-80-ns w-100'>
        <input
          type="text"
          id="input-field"
          className='f4 pa2 w-70 center shadow-5'
          onChange={onInputChange}
        />
        <button
          className='w-40 f4-ns f6 link pv2 br2 shadow-5 b ml1 tc'
          onClick={onDetectSubmit}
          id="sign-in-btn"
          value='Detect'>{detectButtonLabel}</button>
      </div>
      {!validImage ? 
        <div className='center' style={{color: 'var(--color-primary-4)'}}>
          This doesn't appear to be an image URL. Please try again!
        </div>
        : null}
      {!init && !hasFace &&
        <div className='center' style={{color: 'var(--color-primary-4)'}}>
          We couldn't detect a face in your image, but you can still copy the colors below!
        </div>
      }
    </div>
  )
}

export default ImageLinkForm;
