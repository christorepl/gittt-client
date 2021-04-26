import React from "react";
import * as FaIcons from "react-icons/fa";
import AppContext from "../../Context/AppContext";

export default class Notification extends React.Component {
  static contextType = AppContext;
  render() {
    const iconPicker = (type) => {
      switch (type) {
        case "INFO":
          return <FaIcons.FaInfoCircle />;
        case "WARNING":
          return <FaIcons.FaExclamationTriangle />;
        case "DANGER":
          return <FaIcons.FaExclamationCircle />;
        case "SUCCESS":
          return <FaIcons.FaCheck />;
        case "MATCHED":
          return <FaIcons.FaHeart />;
        default:
          return;
      }
    };

    const bgColorPicker = (type) => {
      switch (type) {
        case "INFO":
          return "blue";
        case "WARNING":
          return "yellow";
        case "DANGER":
          return "red";
        case "SUCCESS":
          return "green";
        case "MATCHED":
          return "purple";
        default:
          return;
      }
    };

    const titlePicker = (type) => {
      switch (type) {
        case "INFO":
          return "You might want to know...";
        case "WARNING":
          return "Sorry, but...";
        case "DANGER":
          return "Error";
        case "SUCCESS":
          return "Request completed";
        case "MATCHED":
          return "It's a match!";
        default:
          return;
      }
    };

    const style = {
      right: `${this.context.right}em`,
    };

    return (
      //i know inline styling isn't preferred but for some reason this was the most reliable solution. using a toggle for the classname was buggy and produced undesirable results.
      <div className="notification-container" style={style}>
        <div
          key={`notification-${this.context.type}`}
          className={`notification box ${bgColorPicker(this.context.type)}`}
        >
          <div className="notification-icon">
            {iconPicker(this.context.type)}
          </div>
          <div>
            <p className="notification-title">
              {titlePicker(this.context.type)}
            </p>
            <p className="notification-message">{this.context.message}</p>
          </div>
        </div>
      </div>
    );
  }
}
