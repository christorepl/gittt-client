import React from "react";
import * as ImIcons from "react-icons/im";
import CarouselSlide from "../CarouselSlide/CarouselSlide";

export default class HowTo extends React.Component {
  state = {
    x: 0,
  };

  sliderArr = [
    <CarouselSlide
      src={
        "https://cf.geekdo-images.com/ADAWn8ry_CCAXWK9MIgyQA__original/img/1Nbcb2ycm9vUMNzdVmtCn9EjQYc=/0x0/filters:format(jpeg)/pic203394.jpg"
      }
      header={"Step 1"}
      text={
        "After creating your account, go to your contacts tab and add friends using their contact ID."
      }
    />,
    <CarouselSlide
      src={
        "https://cf.geekdo-images.com/0ZWmK_2I_blK72QkiZzMRw__original/img/TMrPqGm65TbAqqbnkNL3yiUrCwg=/0x0/filters:format(jpeg)/pic487521.jpg"
      }
      header={"Step 2"}
      text={
        "Again on the contact tab, create a group with the desired friends."
      }
    />,
    <CarouselSlide
      src={
        "https://s3-us-west-1.amazonaws.com/5cc.images/logos/social-image.jpg"
      }
      header={"Step 3"}
      text={
        "On the game lists tab, add BGA lists to your account. BGA list ID's can be found in the URL of the list between the username and list name."
      }
    />,
    <CarouselSlide
      src={
        "https://www.mrmoneymustache.com/wp-content/uploads/2012/04/IMG_2070.jpg"
      }
      header={"Step 4"}
      text={"On the groups tab, add lists to a group."}
    />,
    <CarouselSlide
      src={"http://img.game.co.uk/ml2/7/7/4/3/774321_gen_a.png"}
      header={"Step 5"}
      text={"Again on the groups tab, select a group and get to swiping."}
    />,
    <CarouselSlide
      src={"https://wallpapercave.com/wp/wp3748776.jpg"}
      header={"Step 6"}
      text={
        "Games that everyone swiped right on will show up in a menu in that group's swipe page."
      }
    />,
  ];

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
      <div className="how-to">
        <div className="carousel">
          {this.sliderArr.map((item, index) => {
            return (
              <div
                key={index}
                className="slide"
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
