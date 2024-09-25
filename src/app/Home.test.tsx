import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import Home from "./page";

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'highscore') {
        return "100"; 
    }
    if (key === 'name') {
        return 'Bartholomew'; 
    }
    return null;
});

jest.spyOn(Storage.prototype, 'setItem');

describe("Make sure card are acting as expected", () => { 
    test("Check that the cards render properly with a question mark", () => {
        render(<Home />)
        const cards = screen.getAllByText("?")
        expect(cards.length).toBe(12)
    })

    test("Check that the cards render an image when clicked", () => {
        render(<Home />)

        const card = screen.getAllByTestId("card")
        let cardImage = screen.queryByTestId("card-image")
        expect(cardImage).toBe(null)

        fireEvent.click(card[0])
        cardImage = screen.queryByTestId("card-image")
        expect(cardImage).toBeInTheDocument()
    })

    test("Check that only two cards can be 'flipped' at the same time", () => {
        render(<Home />)
        const cards = screen.getAllByText("?")
        let cardImages = screen.queryAllByTestId("card-image")

        fireEvent.click(cards[0])
        fireEvent.click(cards[1])
        fireEvent.click(cards[2])

        cardImages = screen.queryAllByTestId("card-image")
        expect(cardImages.length).toBe(2)
    })

    // test("Find a match by systematically clicking the first card with each other card", async () => { 

    //     render(<Home />) 
    //     const cards = screen.getAllByText("?");
    //     let matched = false;
    //     let visibleImages = screen.queryAllByTestId("card-image");

    //     for (let i = 1; i < cards.length; i++) {
    //         fireEvent.click(cards[0]);
    //         console.log(`Clicked first card at index 0`); //added by me
    //         fireEvent.click(cards[i]);
    //         console.log(`Clicked second card at index ${i}`); //added by me

    //         await waitFor(() => {
    //             visibleImages = screen.queryAllByTestId("card-image");
    //             if (visibleImages.length === 2) {

    //                 const firstImage = visibleImages[0] as HTMLImageElement;
    //                 const secondImage = visibleImages[1] as HTMLImageElement;

    //                 console.log(`First card image src: ${firstImage.src}`); //added by me
    //                 console.log(`Second card image src: ${secondImage.src}`); //added by me

    //                 if (firstImage.src === secondImage.src) {
    //                     matched = true;
    //                     console.log("Found a match!"); //added by me
    //                 } 
    //                 else {
    //                     console.log("No match found."); //added by me
    //                 }
    //             }
    //         }, { timeout: 1100 });

    //         if (matched) {
    //             break; //ask Rob why it breaks anyway!
    //         }
    //     }

    //     visibleImages = screen.getAllByTestId("card-image");
    //     console.log(`Total visible cards: ${visibleImages.length}`);

    //     expect(visibleImages.length).toBe(2)
    //     expect(matched).toBe(true);
    // });
    
    test("Check that the two clicked cards unflip if no match", async () => {
        render(<Home />)
        const cards = screen.getAllByTestId("card");
        let visibleImages = screen.queryAllByTestId("card-image");
        
        fireEvent.click(cards[0])
        fireEvent.click(cards[1])
        
        visibleImages = screen.queryAllByTestId("card-image");

        const firstImage = visibleImages[0] as HTMLImageElement;
        const secondImage = visibleImages[1] as HTMLImageElement;
        
        if (firstImage.src !== secondImage.src) {
            await waitFor(() => {
                visibleImages = screen.queryAllByTestId("card-image");
                expect(visibleImages).toStrictEqual([]) 
            }, { timeout: 1500 })
        }
    })
    
    // test("Ensure that all matches are found by systematically clicking every card in combination", () => {
    //     render(<Home />);

    //     const cards = screen.getAllByTestId("card");

    //     for (let i = 0; i < cards.length; i++) {
    //         for (let j = i + 1; j < cards.length; j++) {
    //             fireEvent.click(cards[i]);
    //             fireEvent.click(cards[j]);

    //             act(() => {
    //                 jest.advanceTimersByTime(1100);
    //             });

    //             const flippedCards = screen.getAllByTestId("card-image");

    //             if (flippedCards.length === (i + 1) * 2) {
    //                 break; 
    //             }
    //         }
    //     }

    //     const finalFlippedCards = screen.getAllByTestId("card-image");
    //     expect(finalFlippedCards.length).toBe(12);  
    // });
})

describe("Ensure that New Game button resets the game", () => {
    test("Check that cards unflip when clicking New Game button", () => {
        render(<Home />)
        const newGameBtn = screen.getByTestId("new-game-btn")
        const cards = screen.getAllByTestId("card");
        let visibleImages = screen.queryAllByTestId("card-image");

        fireEvent.click(cards[0])
        visibleImages = screen.queryAllByTestId("card-image");

        expect(visibleImages.length).toBe(1)

        fireEvent.click(newGameBtn)
        visibleImages = screen.queryAllByTestId("card-image");

        expect(visibleImages.length).toBe(0)
    })

    test("Check that 'moves' reset to 0 when clicking New Game button", () => {
        render(<Home />)
        const moves = screen.getByTestId("moves")
        const cards = screen.getAllByTestId("card");
        const newGameBtn = screen.getByTestId("new-game-btn")

        fireEvent.click(cards[0])
        expect(moves).toHaveTextContent("1")

        fireEvent.click(newGameBtn)
        expect(moves).toHaveTextContent("0")
    })

//     test("Check that solved state is reset when clicking New Game button", async () => {
//         render(<Home />);

//         const cards = screen.getAllByText("?"); 
//         let matched = false;
//         let visibleImages = screen.queryAllByTestId("card-image");
//         const newGameBtn = screen.getByTestId("new-game-btn")

//         for (let i = 1; i < cards.length; i++) {
//             fireEvent.click(cards[0]);

//             fireEvent.click(cards[i]);
//             console.log(`Clicked second card at index ${i}`); //added for trial and error

//             await waitFor(() => {
//                 visibleImages = screen.queryAllByTestId("card-image");
//                 if (visibleImages.length === 2) {

//                     const firstImage = visibleImages[0] as HTMLImageElement;
//                     const secondImage = visibleImages[1] as HTMLImageElement;

//                     console.log(`First card image src: ${firstImage.src}`); //added for trial and error
//                     console.log(`Second card image src: ${secondImage.src}`); //added for trial and error

//                     if (firstImage.src === secondImage.src) {
//                         matched = true;
//                         console.log("Found a match!"); //added for trial and error
//                     } 
//                     else {
//                         console.log("No match found."); //added for trial and error
//                     }
//                 }
//             }, { timeout: 1100 });

//             if (matched) {
//                 break; //breaks even tho no match is found
//             }
//         }

//         visibleImages = screen.getAllByTestId("card-image");
//         console.log(`Total visible cards: ${visibleImages.length}`);

//         expect(visibleImages.length).toBe(2)
//         expect(matched).toBe(true);

//         fireEvent.click(newGameBtn)
//         visibleImages = screen.queryAllByTestId("card-image");

//         expect(visibleImages.length).toBe(0)
//     });
})
    
describe("Ensure that 'highscore' and 'moves' work as intended", () => {
    // test("Ensure new highscore is set if lower than current highscore using mock local storage", async () => {
    //     render(<Home />);

    //     let moves = screen.getByTestId("moves");
    //     let highscore = screen.getByTestId("highscore");
    //     const cards = screen.getAllByTestId("card");

    //     expect(moves).toHaveTextContent("0");
    //     expect(highscore).toHaveTextContent("100");  

    //     for (let i = 0; i < cards.length; i++) {
    //         for (let j = i + 1; j < cards.length; j++) {
    //             fireEvent.click(cards[i]);
    //             fireEvent.click(cards[j]);

    //             act(() => {
    //                 jest.advanceTimersByTime(1100);
    //             });

    //             const flippedCards = screen.queryAllByTestId("card-image");

    //             if (flippedCards.length === (i + 1) * 2) {
    //                 break;
    //             }
    //         }
    //     }
        
    //     highscore = screen.getByTestId("highscore");
    //     moves = screen.getByTestId("moves");
    //     const submitHighscoreBtn = screen.getByTestId("submit-highscore-btn")
        
    //     expect(submitHighscoreBtn).toBeInTheDocument();

    //     const highscoreValue = parseInt(highscore?.textContent ?? "0", 10); 
    //     const movesValue = parseInt(moves?.textContent ?? "0", 10);

    //     expect(highscoreValue).toBeGreaterThanOrEqual(movesValue);
        
    //     fireEvent.click(submitHighscoreBtn);
    //     await waitFor(() => {
    //         expect(localStorage.setItem).toHaveBeenCalledWith('highscore', movesValue.toString());
    //     })
    // }); 
    
    test("Check that the highscore popup updates the highscore name", () => {
        render(<Home/>)

        let highscorePopup = screen.queryByTestId("highscore-popup")
        expect(highscorePopup).not.toBeInTheDocument()

        const cards = screen.getAllByTestId("card");

        const flippedCards = screen.queryByTestId("card-image") 
        expect(flippedCards).not.toBeInTheDocument();


        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                fireEvent.click(cards[i]);
                fireEvent.click(cards[j]);

                act(() => {
                    jest.advanceTimersByTime(1100);
                });

                const flippedCards = screen.queryAllByTestId("card-image");

                if (flippedCards.length === (i + 1) * 2) {
                    break;
                }
            }
        }

        const finalFlippedCards = screen.getAllByTestId("card-image");
        expect(finalFlippedCards.length).toBe(12);  //passes!

        act(() => {
            jest.advanceTimersByTime(1100);
        });

        highscorePopup = screen.queryByTestId("highscore-popup")
        expect(highscorePopup).toBeInTheDocument()

        let userInput = screen.getByTestId("input")
        const button = screen.getByTestId("submit-highscore-btn")
        let highscore = screen.getByTestId("highscore")
        let highscoreName = screen.getByTestId("highscore-name")
        const mockName = "Bartholomew"

        fireEvent.change(userInput, { target: { value: mockName } })

        userInput = screen.getByTestId("input")

        expect((userInput as HTMLInputElement).value).toBe(mockName)

        fireEvent.click(button)

        expect(localStorage.setItem).toHaveBeenCalledWith('name', mockName);

        act(() => {
            jest.advanceTimersByTime(4000);
        });

        highscore = screen.getByTestId("highscore")
        highscoreName = screen.getByTestId("highscore-name")

        expect(highscore).toHaveTextContent("100")
        expect(highscoreName).toHaveTextContent(mockName)
    })
})
