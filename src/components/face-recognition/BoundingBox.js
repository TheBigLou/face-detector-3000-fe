import React from 'react'

function BoundingBox({topRow, rightCol, bottomRow, leftCol}) {
  return (
    <div className='bounding-box' style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>
  )
}

export default BoundingBox;