import React from 'react'
import Tilt from 'react-parallax-tilt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

const Logo = () => {
  return (
        <Tilt className='br2 shadow-5 logo flex items-center justify-center bg-half-white'>
            <FontAwesomeIcon icon={faRobot} style={{color: 'var(--color-primary-4)'}}/>
        </Tilt>
  );
}

export default Logo;