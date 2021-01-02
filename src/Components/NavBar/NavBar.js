import React from 'react'
import AppContext from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'

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
                title: !this.context.isAuthenticated ? 'Login' : 'Logout',
                path: !this.context.isAuthenticated ? '/login' : '/logout',
                icon: !this.context.isAuthenticated ? <AiIcons.AiOutlineLogin/> : <AiIcons.AiOutlineLogout/>,
            },
            {
                //replace with chats in full stack version
                //
                //BsFillChatDotsFill
                title: !this.context.isAuthenticated ? 'Create Account' : 'Get To Swiping',
                path: !this.context.isAuthenticated ? '/create-account' : '/swiper',
                icon: !this.context.isAuthenticated ? <AiIcons.AiOutlineUserAdd/> : <BsIcons.BsArrowLeftRight/>,
            },
            {
                title: 'Play During Lockdown?',
                path: '/how-to-play',
                icon: <AiIcons.AiOutlineQuestionCircle/>
            }
        ]

        const toggleClass = this.context.navBarToggle ? 'nav-menu active' : 'nav-menu'

        return (
            <>
            <IconContext.Provider value={{color: 'white'}}>
                <div className="navbar">
                    <div className="nav-bars">
                        <Link to="#" className="navbar-icons">
                            <AiIcons.AiOutlineMenu onClick={() => this.context.setNavBarToggle(!this.context.navBarToggle)}/>
                        </Link>
                    </div>
                    {/* INSERT LOGO HERE AND CHANGE navbar class align items <div className="nav-logo">
                        <img src={logo} alt="a clenched fist with the phrase 'food justice now' in stencil lettering below it, against a backdrop of a crossed fork and knife"/>
                    </div> */}
                </div>
                    <nav className={toggleClass}>
                        <ul className="navbar-menu-items" onClick={() => this.context.setNavBarToggle(!this.context.navBarToggle)}>
                            {NavBarMenu.map((item, i) => {
                                return (
                                    <li key={i} className="nav-text">
                                        <Link to={item.path}>
                                                {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                            {NavBarContact.map((item, i) => {
                                return (
                                    <li key={'contact' + i} className="nav-text">
                                        <a href={item.path} target="_blank" rel="noopener noreferrer">
                                            {item.icon}
                                        <span>{item.title}</span>
                                        </a>
                                    </li>
                                )
                            })}
                            <li className="navbar-toggle">
                                <Link to="#" className="navbar-icons">
                                    <AiIcons.AiOutlineClose/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
            </IconContext.Provider>
            </>
        )
    }
}


        

export default NavBar