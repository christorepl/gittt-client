import React from "react";
import * as ImIcons from "react-icons/im";
import CarouselSlide from "../CarouselSlide/CarouselSlide";
import AppContext from "../../Context/AppContext";

export default class HowTo extends React.Component {
  static contextType = AppContext;

  state = {
    x: 0,
  };

  sliderArr = this.context.matchedGames.map((game, index) => {
    return (
      <CarouselSlide
        key={index}
        src={game.game_img_url}
        header={game.game_name}
        url={game.game_bgg_url}
        className={"matchedGames"}
      />
    );
  });

  goLeft() {
    this.state.x === 0
      ? this.setState({ x: -100 * (this.sliderArr.length - 1) })
      : this.setState({ x: this.state.x + 100 });
  }

  goRight() {
    this.state.x === -100 * (this.sliderArr.length - 1)
      ? this.setState({ x: 0 })
      : this.setState({ x: this.state.x - 100 });
  }

  render() {
    return (
      <div className="matchedGamesCarousel">
        <div className="carousel">
          {this.sliderArr.map((item, index) => {
            return (
              <div
                key={index}
                className="matchedGamesSlide"
                style={{ transform: `translateX(${this.state.x}%)` }}
              >
                {item}
              </div>
            );
          })}
          <button
            className="carouselArrows"
            id="goLeft"
            onClick={() => this.goLeft()}
          >
            <ImIcons.ImArrowLeft />
          </button>
          <button
            className="carouselArrows"
            id="goRight"
            onClick={() => this.goRight()}
          >
            <ImIcons.ImArrowRight />
          </button>
        </div>
      </div>
    );
  }
}
