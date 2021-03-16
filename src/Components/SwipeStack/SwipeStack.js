import React from "react";
import AppContext from "../../Context/AppContext";
// import * as FaIcons from 'react-icons/fa'
import TinderCard from "react-tinder-card";

export default class SwipeStack extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.checkAuth();
    this.context.setLastDirection(null);
    this.context.getGamesForSwiper(this.props.match.params.groupID);
  }

  componentWillUnmount() {
    //then when you exit the page, drop the classname that hides the scrollbars
    document.querySelector("body").className = "";
  }

  render() {
    //assign a css class to the body to prevent scrollbars from appearing when you swipe
    document.querySelector("body").className = "no-scroll";

    const games = this.context.games;
    const group_id = this.props.match.params.groupID;

    return (
      <>
        <div className="swiper">
          <div className="cardContainer">
            {games.length > 0 ? (
              games.map((game, index) => (
                <TinderCard
                  className="swipe"
                  key={index + game.game_name}
                  preventSwipe={["up", "down"]}
                  onSwipe={(dir) =>
                    this.context.swiped(dir, game.game_name, group_id)
                  }
                >
                  <div
                    style={{
                      backgroundImage: "url(" + game.game_img_url + ")",
                    }}
                    className="card"
                  >
                    <h3>
                      <a
                        href={game.game_bga_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {game.game_name}
                      </a>
                    </h3>
                  </div>
                </TinderCard>
              ))
            ) : (
              <h3>
                You have no more games to swipe for this group! Any group member
                can add lists to the group.
              </h3>
            )}
          </div>
          {/* <div className='buttons'>
        <div onClick={() => this.context.swiped('left', this.context.currentGame.game_name, group_id)}><FaIcons.FaThumbsDown size={50} color={'red'}/></div>
        <div onClick={() => this.context.swiped('right', this.context.currentGame.game_name, group_id)}><FaIcons.FaThumbsUp size={50} color={'green'}/></div>
      </div> */}

          {(this.context.lastDirection === "right" &&
            this.context.games.length) ||
          (this.context.lastDirection === "left" &&
            this.context.games.length) ? (
            <h2 className="infoText">
              You swiped {this.context.lastDirection}
            </h2>
          ) : null}
        </div>
        {/* {this.context.matchedGames.length
    ?
    <>
    <div className="groupSidebarHeader">
      <h3 className="mobile-header">Matched Games in this Group:</h3>
    </div>
      <div className="groupSidebar">
      <h3 className="desktop-header">Matched Games in this Group:</h3>
        <ul>
          {this.context.matchedGames.map((game, index) =>  {
            return (
              <li key={index}><a href={game.game_bga_url} target="_blank" rel="noopener noreferrer">{game.game_name}</a></li>
            )
          })}
        </ul>
    </div>
    </>
    :
    null
    } */}
      </>
    );
  }
}
