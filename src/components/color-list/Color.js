import React from 'react'

function Color({ hex, copyHex }) {
  return (
        <div
            className="color-block white br2 shadow-5 ph3-ns ph2 pv4-ns pv3 ma1 grow pointer"
            style={{backgroundColor: hex}}
            onClick={() => copyHex(hex)}>
            {hex}
        </div>
  )
}

export default Color;