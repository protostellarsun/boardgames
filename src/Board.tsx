import React from 'react';
import { Box, Flex } from 'rebass';

import Die, { DieProps, EmptyDie } from './components/Die';
import { BOARD_SIZE_X, BOARD_SIZE_Y } from './constants';

class Board extends React.Component<any> {
    onClick(id) {
        if (this.isActive(id)) {
            this.props.moves.clickCell(id);
            this.props.events.endTurn();
        }
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
            G: { cells },
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

        return <Box>{rows.reverse()}</Box>;
    }
}

export default Board;
