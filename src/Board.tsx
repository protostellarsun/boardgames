import React, { Fragment } from 'react';
import { Box, Flex, Text } from 'rebass';

import Die, { DieProps, EmptyDie } from './components/Die';
import { BOARD_SIZE_X, BOARD_SIZE_Y } from './constants';

class Board extends React.Component<any> {
    onClick(idx) {
        if (this.isActive(idx)) {
            this.props.moves.clickCell(idx);
            this.props.events.endTurn();
        }
    }
    pickDie(idx) {
        // TODO record picked die in component state.
        this.props.moves.removeDieFromPool(idx);
    }

    isActive(id) {
        if (!this.props.isActive) {
            return false;
        }
        if (this.props.G.cells[id] !== null) {
            return false;
        }
        return true;
    }

    render() {
        const {
            G: { cells, pool },
            ctx: { phase },
        } = this.props;

        const cellsArray: DieProps[] = cells.map(
            (cell, idx) =>
                !!cell ? (
                    <Die
                        key={`cell-${idx}`}
                        colour={cell.colour}
                        value={cell.value}
                    />
                ) : (
                    <div key={`cell-${idx}`} onClick={() => this.onClick(idx)}>
                        <EmptyDie />
                    </div>
                )
        );

        const rows = [];
        for (let i = BOARD_SIZE_Y - 1; i >= 0; i--) {
            rows.push(
                <Flex key={`cells-row-${i}`}>
                    {cellsArray.splice(i * BOARD_SIZE_X, BOARD_SIZE_X)}
                </Flex>
            );
        }

        return (
            <Fragment>
                <Flex>
                    Phase: {phase}
                    <div onClick={() => this.props.moves.rollDice()}>
                        [Roll dice]
                    </div>
                    <div onClick={() => this.props.moves.pickDie()}>
                        [Pick dice]
                    </div>
                </Flex>
                Pool
                <Flex pb={5}>
                    {pool.map((cell, idx) => (
                        <div
                            key={`pool-${idx}-${cell.colour}-${cell.value}`}
                            onClick={() => this.pickDie(idx)}
                        >
                            <Die colour={cell.colour} value={cell.value} />
                        </div>
                    ))}
                </Flex>
                Board
                <Box>{rows.reverse()}</Box>
            </Fragment>
        );
    }
}

export default Board;
