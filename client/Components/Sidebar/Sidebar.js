import React from 'react';

import ConcertCardList from '../Card/ConcertCardList';
import TempCardList from '../Card/TempCardList';
import './Sidebar.scss';

function Sidebar({ showView }) {
    return (
        <>
            <nav
                style={{ overflowY: 'scroll' }}
                className={showView ? 'nav-menu active' : 'nav-menu'}
            >
                <ul className="nav-menu-items">
                    {/* <ConcertCardList /> */}
                    <TempCardList />
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
