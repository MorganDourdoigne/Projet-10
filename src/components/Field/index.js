import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  INPUT_EMAIL: 3,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, required }) => {
  let component;
  const errorMessage = `N’oubliez pas de remplir ce champ.`;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          required={required}
          onInvalid={(e) => {
            e.target.setCustomValidity(errorMessage);
          }}
          onInput={(e) => {
            e.target.setCustomValidity("");
          }}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.INPUT_EMAIL:
      component = (
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          required={required}
          onInvalid={(e) => {
            e.target.setCustomValidity(errorMessage);
          }}
          onInput={(e) => {
            e.target.setCustomValidity("");
          }}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          required={required}
          onInvalid={(e) => {
            e.target.setCustomValidity(errorMessage);
          }}
          onInput={(e) => {
            e.target.setCustomValidity("");
          }}
          data-testid="field-testid"
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          required={required}
          onInvalid={(e) => {
            e.target.setCustomValidity(errorMessage);
          }}
          onInput={(e) => {
            e.target.setCustomValidity("");
          }}
          data-testid="field-testid"
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
   required: false,
}

export default Field;
