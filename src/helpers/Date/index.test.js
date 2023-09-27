// Importation du fichier avec la fonction pour tester getMonth ()
import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            // crée une nouvelle date
            const date = new Date('2022-01-01');
            // appelle getMonth() avec la date
            const result = getMonth(date);
            // verifie que la résultat est janvier
            expect(result).toBe('janvier');
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const date = new Date('2022-07-08');
            const result = getMonth(date);
            expect(result).toBe('juillet');
        });
    });
});