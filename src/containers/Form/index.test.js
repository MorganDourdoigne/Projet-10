// Importation des fonctions nécessaires de la bibliothèque de test
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index"; // Importation du composant à tester

// Début de la suite de tests pour le composant Form
describe("When Events is created", () => {
  // Ce test vérifie si certains éléments sont affichés lorsque le composant Form est rendu
  it("a list of event card is displayed", async () => {
    render(<Form />); // Rendu du composant Form
    // Ces lignes vérifient si les textes "Email", "Nom", "Prénom" et "Personel / Entreprise" sont présents dans le document
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Cette suite de tests est pour le cas où un clic est déclenché sur le bouton de soumission
  describe("and a click is triggered on the submit button", () => {
    // Ce test vérifie si l'action de succès est appelée lorsque le bouton de soumission est cliqué
    it("the success action is called", async () => {
      const onSuccess = jest.fn(); // Création d'un mock pour la fonction onSuccess
      render(<Form onSuccess={onSuccess} />); // Rendu du composant Form avec le mock onSuccess comme prop
      // Déclenchement d'un événement de clic sur le bouton de soumission
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours"); // Vérifie si le texte "En cours" est présent dans le document
      // Attends jusqu'à ce que le texte "Envoyer" soit présent dans le document, avec un délai d'attente de 2000ms
      await waitFor(() => screen.findByText("Envoyer"), { timeout: 2000 });
      expect(onSuccess).toHaveBeenCalled(); // Vérifie si la fonction mock onSuccess a été appelée
    });
  });
});
