import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const extractMonth = (periode) => {
  if (!periode) {
    return '';
  }
  const months = ['JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
  return months.find(month => periode.toUpperCase().includes(month)) || '';
};


const EventCard = ({
  imageSrc,
  imageAlt,
  title,
  label,
  small = false,
  periode,
  ...props
}) => (
       <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      <div className="EventCard__month">{extractMonth(periode)}</div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
  periode: PropTypes.string.isRequired, 
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard;
