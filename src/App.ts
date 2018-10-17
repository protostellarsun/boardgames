import { Game } from 'boardgame.io/core';
import { Client } from 'boardgame.io/react';

import Board from './Board';
import { BOARD_SIZE_X, BOARD_SIZE_Y } from './constants';

const Sagrada = Game({
    setup: () => ({
        cells: Array(BOARD_SIZE_X * BOARD_SIZE_Y).fill(null),
        pool: [],
    }),

    moves: {
        clickCell(G, ctx, id) {
            console.info('cell clicked', id);
            const cells = [...G.cells];
            cells[id] = { colour: 'gray', value: 2 };
            return { ...G, cells };
        },
        rollDice(G, ctx) {
            console.info('Rolling dice...');
            const pool = [];
            for (let i = 0; i < 5; i++) {
                pool.push({ colour: 'gray', value: ctx.random.D6() });
            }
            return { ...G, pool };
        },
        removeDieFromPool(G, ctx, idx) {
            console.info('Remove die from pool ...');
            const pool = G.pool;
            pool.splice(idx, 1);
            return { ...G, pool };
        },
    },

    flow: {
        phases: [
            {
                name: 'Roll 5 dice',
                allowedMoves: ['rollDice'],
                endPhaseIf: (G, ctx) => G.pool.length === 5,
            },
            {
                name: 'Pick',
                allowedMoves: ['removeDieFromPool'],
                endPhaseIf: (G, ctx) => G.pool.length === 0,
            },
        ],
    },
});

const App = Client({ game: Sagrada, board: Board });

export default App;
