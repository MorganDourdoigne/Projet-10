import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

// Quand le formulaire est créé le test vérifie que lorsque le composant Home est rendu,
// les 3 champs sont rendu
describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

    // test qui simule un clic sur le bouton “Envoyer” et 
  // vérifie que les messages “En cours” et “Message envoyé !” apparaissent à l’écran.
  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // Utilisez waitFor pour attendre que le texte "Message envoyé !" apparaisse
      await waitFor(() => screen.getByText(/message envoyé/i), { timeout: 2000 });
    });
  });

});


describe("When a page is created", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("une liste d'événements est affichée", () => {
    const eventsList = screen.getByTestId('events-list');
    expect(eventsList).toBeInTheDocument();
  });

  it("une liste de personnes est affichée", () => {
    const peopleList = screen.getByTestId('people-list');
    expect(peopleList).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    await waitFor(() => {
      const lastEventCard = screen.getByTestId('last-event-card');
      expect(lastEventCard).toBeInTheDocument();
    });
  });
});
