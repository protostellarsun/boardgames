import { Game } from 'boardgame.io/core';
import { Client } from 'boardgame.io/react';

import Board from './Board';
import { DieColourNames } from './Colours';
import { DieType } from './components/Die';
import { BOARD_SIZE_X, BOARD_SIZE_Y } from './constants';

const Sagrada = Game({
    setup: () => ({
        cells: Array(BOARD_SIZE_X * BOARD_SIZE_Y).fill(null),
        pool: [],
    }),

    moves: {
        clickCell(G, ctx, id, die) {
            console.info('cell clicked', id, die);
            const cells = [...G.cells];
            cells[id] = { colour: die.colour, value: die.value };
            return { ...G, cells };
        },
        rollDice(G, ctx) {
            console.info('Rolling dice...');
            const pool: DieType[] = [];
            for (let i = 0; i < 5; i++) {
                pool.push({
                    colour: DieColourNames[ctx.random.D6() - 1],
                    value: ctx.random.D6(),
                });
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
                allowedMoves: ['removeDieFromPool', 'clickCell'],
                /* End the phase when expected number of dice has been removed from the pool and placed on the board. */
                endPhaseIf: (G, ctx) =>
                    G.pool.length === 1 &&
                    G.cells.filter((cell) => !!cell).length % 4 === 0,
                onPhaseEnd: (G, ctx) => {
                    // TODO: put last die in progress tracker.
                    if (G.pool.length === 1) {
                        const pool = [];
                        return { ...G, pool: [] };
                    } else {
                        return G;
                    }
                },
            },
        ],
    },
});

const App = Client({ game: Sagrada, board: Board });

export default App;
