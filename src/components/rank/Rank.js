import React from 'react'

const Rank = ({userName, userEntries}) => {
  return (
    <div>
        <div className="f4-ns f6 b center">
            {userName}
        </div>
        <div className="f6-ns f7 center">
            {(userEntries === '1') ? `${userEntries} detection` : `${userEntries} detections` }
        </div>
    </div>
  )
}

export default Rank;