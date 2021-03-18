import React from "react";

export default class CarouselSlide extends React.Component {
  render() {
    return (
      <>
        {this.props.url ? (
          <a href={`${this.props.url}`}>
            <img
              src={this.props.src}
              alt="slide1"
              className={`imgSlide ${this.props.className}`}
            />
          </a>
        ) : (
          <img
            src={this.props.src}
            alt="slide1"
            className={`imgSlide ${this.props.className}`}
          />
        )}
        <h3 className={`slideHeader ${this.props.className}Header`}>
          {this.props.header}
        </h3>
        <p className={`slideText ${this.props.className}Text`}>
          {this.props.text}
        </p>
      </>
    );
  }
}
