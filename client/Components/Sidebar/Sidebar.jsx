import React, { useContext } from 'react';

import { GlobalState } from '../../contexts/Store';
import TempCardList from '../Card/TempCardList';
import './Sidebar.scss';

function Sidebar({ showView }) {
    const { personalization } = useContext(GlobalState);
    const [personalized, setPersonalized] = personalization;

    const scrollbarClass = personalized
        ? 'nav-menu personalized'
        : 'nav-menu active';

    return (
        <>
            <nav
                style={{ overflowY: 'scroll' }}
                className={showView ? scrollbarClass : 'nav-menu'}
            >
                <ul
                    style={{
                        padding: 0,
                    }}
                    className="nav-menu-items"
                >
                    <TempCardList />
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
