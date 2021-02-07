import React from 'react'
import AppContext from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import * as AiIcons from 'react-icons/ai'
// import * as BsIcons from 'react-icons/bs'
import * as GiIcons from 'react-icons/gi'

class NavBar extends React.Component {
    static contextType = AppContext
    render() {

       const NavBarContact = [
        {
            title: 'My LinkedIn',
            path: 'https://www.linkedin.com/in/christopheredwardobrien/',
            icon: <AiIcons.AiOutlineLinkedin/>,
        },
        {
            title: 'My GitHub',
            path: 'https://github.com/christorepl',
            icon: <AiIcons.AiOutlineGithub/>
        }
        ]

        const NavBarMenu = [
            {
                title: 'Home',
                path: '/home',
                icon: <AiIcons.AiOutlineHome/>,
                className: 'nav-text'
            },
            {
                title: !this.context.isAuthenticated ? 'Create Account' : 'Dashboard',
                path: !this.context.isAuthenticated ? '/create-account' : '/user-dash',
                icon: !this.context.isAuthenticated ? <AiIcons.AiOutlineUserAdd/> : <GiIcons.GiInvertedDice6/>,
            },
            {
                title: !this.context.isAuthenticated ? 'Login' : 'Logout',
                path: !this.context.isAuthenticated ? '/login' : '/logout',
                icon: !this.context.isAuthenticated ? <AiIcons.AiOutlineLogin/> : <AiIcons.AiOutlineLogout/>,
            }
        ]

        const toggleClass = this.context.navBarToggle ? 'nav-menu active' : 'nav-menu'

        return (
            <>
            <IconContext.Provider value={{color: 'black'}}>
                <div className="navbar">
                    <div className="nav-bars">
                        <Link to="#" className="navbar-icons">
                            <AiIcons.AiOutlineMenu onClick={() => this.context.setNavBarToggle(!this.context.navBarToggle)}/>
                        </Link>
                    </div>
                    {/* INSERT LOGO HERE AND CHANGE navbar class align items <div className="nav-logo">
                        <img src={logo} alt=""/>
                    </div> */}
                </div>
                    <nav className={toggleClass}>
                        <ul className="navbar-menu-items" onClick={() => this.context.setNavBarToggle(!this.context.navBarToggle)}>
                        <li className="navbar-toggle">
                                <Link to="#" className="navbar-close">
                                    <AiIcons.AiOutlineClose/>
                                </Link>
                        </li>
                            {NavBarMenu.map((item, i) => {
                                return (
                                    <li key={i} className="nav-text">
                                        <Link to={item.path}>
                                                {item.icon}
                                            <span className="nav-span">{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                            {NavBarContact.map((item, i) => {
                                return (
                                    <li key={'contact' + i} className="nav-text">
                                        <a href={item.path} target="_blank" rel="noopener noreferrer">
                                            {item.icon}
                                        <span className="nav-span">{item.title}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
            </IconContext.Provider>
            </>
        )
    }
}


        

export default NavBar