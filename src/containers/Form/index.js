import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// (f)) mock qui simule un appel API avec un délai de 1 seconde
const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  // Déclaration de l'état "sending" pour gérer l'état d'envoi
  const [sending, setSending] = useState(false);

  // (f)) appelée lorsque le formulaire est soumis
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      // Met à jour l'état 'sending' à true pour indiquer que le formulaire est en cours d'envoi
      setSending(true);

      // Nous essayons d'appeler mockContactApi
      try {
        // Attend que mockContactApi soit résolu
        await mockContactApi();
        // Met à jour l'état 'sending' à false pour indiquer que le formulaire a fini d'être envoyé
        setSending(false);
        // Appelle la fonction onSuccess
        onSuccess();
      } catch (err) {
        // Met à jour l'état 'sending' à false même en cas d'erreur
        setSending(false);
        // Appelle la fonction onError avec l'erreur
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" required />
          <Field placeholder="" label="Prénom" required />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field label="Email" type={FIELD_TYPES.INPUT_EMAIL} name="email" required />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
            {/* // Le texte du bouton change en fonction de l'état 'sending' */}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            required />
        </div>
      </div>
    </form>
  );
};

// Ceci définit les types de props attendus pour le composant Form
Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

// Ceci définit les valeurs par défaut des props pour le composant Form
Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
