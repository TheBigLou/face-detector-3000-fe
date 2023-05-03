import React from 'react';
import Logo from '../logo/Logo';
import Rank from '../rank/Rank';

const Navigation = ({ onRouteChange, isSignedIn, userName, userEntries }) => {
  if (isSignedIn) {
    return (
      <nav className='shadow-5 pa3 dt dt--fixed w-100 center flex justify-between items-center'>
        <Logo />
        <span className="dtc tc f1-ns f3 ph2">Face Detector <span className='b' style={{color: 'var(--color-primary-4)'}}>3000</span></span>
          <div className="dtc flex flex-column justify-around tc shadow-5 pa3-ns br2 bg-half-white" id="rank-and-sign">
            <Rank userName={userName} userEntries={userEntries} />
            <div
              className='link dim pointer f5-ns f7 b br2 pa2 center white'
              style={{backgroundColor: 'var(--color-secondary-2-0)' }}
              onClick={() => onRouteChange('signIn')}> Sign Out</div>
          </div>
      </nav>
    );
  } else {
    return (
      <nav className='shadow-5 pa3 dt dt--fixed w-100 center flex justify-between items-center'>
        <Logo />
        <span className="dtc tc f1-ns f3 ph2">Face Detector <span className='b' style={{color: 'var(--color-primary-4)'}}>3000</span></span>
          <div className="dtc flex flex-column justify-around tc shadow-5 pa3-ns br2 bg-half-white" id="rank-and-sign">
            <div
            className='link dim pointer f4-ns f7 b br2 pa2 center w-90'
            id="sign-in-btn"
            onClick={() => onRouteChange('signIn')}> Sign In
            </div>
            <div
            className='link dim pointer f5-ns f7 b br2 pa1'
            id="register"
            onClick={() => onRouteChange('register')}> Register</div>
          </div>
      </nav>
    );
  }
}


export default Navigation;