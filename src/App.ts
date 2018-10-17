import { Game } from 'boardgame.io/core';
import { Client } from 'boardgame.io/react';

import Board from './Board';
import { BOARD_SIZE_X, BOARD_SIZE_Y } from './constants';

const Sagrada = Game({
    setup: () => ({ cells: Array(BOARD_SIZE_X * BOARD_SIZE_Y).fill(null) }),

    moves: {
        clickCell(G, ctx, id) {
            console.warn('cell clicked', id);
            const cells = [...G.cells];
            cells[id] = { colour: 'gray', value: 2 };
            return { ...G, cells };
        },
    },
});

const App = Client({ game: Sagrada, board: Board });

export default App;
