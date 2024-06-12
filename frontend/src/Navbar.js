// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Adjust this if you have a separate CSS file for Navbar

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
   <div className='navbar1'>

      <div id="nav-bar">
        <nav className="nav">
          <div>
            <p className="nav_logo">
              <i className='bx bx-layer nav_logo-icon'></i>
              <span className="nav_logo-name">  MINI-CRM</span>
            </p>
            <div className="nav_list">
            <hr/>
          
            <Link to="/ManageAudience" className={`nav_link ${activeLink === 'ManageAudience' ? 'active' : ''}`} onClick={() => handleLinkClick('ManageAudience')}>
                <i><img src={require("./assets/manage.png")} alt="" width="22px"/></i>
                <span className="nav_name">Manage Audience</span>
              </Link>
              <Link to="/ViewAudience" className={`nav_link ${activeLink === 'ViewAudience' ? 'active' : ''}`} onClick={() => handleLinkClick('ViewAudience')}>
                              <i><img src={require("./assets/audience.png")} alt="" width="24px"/></i>
                <span className="nav_name">View Audience</span>
              </Link>
              <Link to="/SendCampaign" className={`nav_link ${activeLink === 'SendCampaign' ? 'active' : ''}`} onClick={() => handleLinkClick('SendCampaign')}>
              <i><img src={require("./assets/send.png")} alt="" width="20px"/></i>
                <span className="nav_name">Send Campaign</span>
              </Link>
            </div>
          </div>
          
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
