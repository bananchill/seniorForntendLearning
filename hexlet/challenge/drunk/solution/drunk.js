export default class Drunkard {
    #max_rounds = 100;

    constructor() {
    }

    /**
     * @param {number[]} newCards
     * @param {number[]} oldCards
     * @return {number[]}
     * */
    setNewPlayerCards(newCards, oldCards) {
        return [...oldCards, ...newCards];
    }

    /**
     * @param {number[]} value
     * */
    checkingLengthByZero(value) {
        return value.length === 0;
    }

    /**
     * @param {number[]} cardsFirstPlayer
     * @param {number[]} cardsSecondPlayer
     * @return {string}
     * */
    run(cardsFirstPlayer, cardsSecondPlayer) {
        let currentRound = 0

        const getPlayerAction = () => {
            const isFirstPlayerOutOfCards = this.checkingLengthByZero(cardsFirstPlayer)
            const isSecondPlayerOutOfCards = this.checkingLengthByZero(cardsSecondPlayer)

            const isDraw = isFirstPlayerOutOfCards && isSecondPlayerOutOfCards
            const isMaxRoundsReached = currentRound === this.#max_rounds

            if (isDraw || isMaxRoundsReached) {
                return "Botva!"
            }
            if (isSecondPlayerOutOfCards) {
                return `First player. Round: ${ currentRound }`
            }
            if (isFirstPlayerOutOfCards) {
                return `Second player. Round: ${ currentRound }`
            }

            return '';
        }

        while (true) {
            const resWinner = getPlayerAction();
            if (resWinner) {
                return resWinner;
            }

            const cardFirstPlayer = cardsFirstPlayer.shift();
            const cardSecondPlayer = cardsSecondPlayer.shift();


            if (cardFirstPlayer > cardSecondPlayer) {
                cardsFirstPlayer = this.setNewPlayerCards([cardFirstPlayer, cardSecondPlayer], cardsFirstPlayer)
            } else if (cardSecondPlayer > cardFirstPlayer) {
                cardsSecondPlayer = this.setNewPlayerCards([cardSecondPlayer, cardFirstPlayer], cardsSecondPlayer)
            }

            currentRound++;
        }
    }

}