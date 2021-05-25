import React from 'react';

import NavBar from './NavBar';
import LandingPage from './LandingPage';
import Map from './Map';

class Main extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <LandingPage />
        {/* <Map/> */}
        <hr />
      </div>
    );
  }
}

export default Main;
