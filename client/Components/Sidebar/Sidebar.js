import React from 'react';

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
                    <TempCardList />
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
