import React from 'react';
import Color from './Color';
import './Color.css';

function ColorList({ colors, copyHex, init }) {
  if (!init) {
    return (
      <div className='center mt4-ns mt2 shadow-5 br2 pv3 tc w-70-ns w-80 flex flex-column bg-half-white'>
        <div className='flex center pb2 f3-ns f6 w-80'>
          Click to copy the color hex
        </div>
        <div id='copied-value' className='i pb3'></div>
        <div className='center flex flex-wrap justify-center'>
          {
            colors.map((color, i) => {
              return (
                  <Color
                    hex={color.raw_hex}    
                    key={"Color" + i}
                    copyHex={copyHex}
                  />
              )})
          }
        </div>
      </div>
    );
  } else {
    return (null);
  }
}

export default ColorList;