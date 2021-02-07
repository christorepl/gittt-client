import React from 'react'
import AppContext from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import * as GrIcons from 'react-icons/gr'
import * as RiIcons from 'react-icons/ri'
// import * as BsIcons from 'react-icons/bs'

export default class DashMenu extends React.Component {
    static contextType = AppContext

    render() {
 
        const DashMenu = [
             {
                 title: 'Dashboard',
                 path: '/home',
                 icon: <RiIcons.RiDashboardLine/>
             },
             {
                 title: 'Add Game List',
                 path: '/add-games',
                 icon: <GrIcons.GrAdd/>,
                 className: 'nav-text'
             },
             {
                 title: 'Contacts',
                 path: '/contacts',
                 icon: <RiIcons.RiContactsLine/>,
             },
             {

                 title: 'Groups',
                 path: '/groups',
                 icon: <GrIcons.GrGroup/>,
                }
        ]

        // ,
        //         {
        //             title: 'Swiper',
        //             path: '/swiper',
        //             icon: <BsIcons.BsArrowLeftRight/>
        //         }

                
        return (
            <IconContext.Provider value={{color: 'black'}}>
                <div className="dash-menu">
                             {DashMenu.map((item, i) => { 
                                 return (
                                     <li key={i} className="dash-text">
                                         <Link to={item.path}>
                                                 <span className="dash-icon">{item.icon}</span>
                                             <span className="dash-title">{item.title}</span>
                                         </Link>
                                     </li>
                                 )
                             })}
                </div>
                </IconContext.Provider>
         )
     }
 
}