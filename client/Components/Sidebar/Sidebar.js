import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';

import ConcertCardList from '../Card/ConcertCardList';
import './Sidebar.scss';

function Sidebar({ showView }) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    //console.log(showView);
    return (
        <>
            {/* <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div> */}
            <nav
                style={{ overflowY: 'scroll' }}
                className={showView ? 'nav-menu active' : 'nav-menu'}
            >
                <ul className="nav-menu-items">
                    {/* <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </Link>
                    </li> */}
                    <ConcertCardList />
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
