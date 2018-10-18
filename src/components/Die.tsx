import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import { DieColourString, getColour } from './../Colours';
import Dots from './Dots';

const StyledBox = styled(Box)`
    height: 50px;
    width: 50px;
    border-radius: 20%;
    border: 1px solid gray;
`;

export type DieType = {
    value: number;
    colour: DieColourString;
};

export default class Die extends React.PureComponent<DieType> {
    render() {
        const { value, colour } = this.props;

        return (
            <StyledBox m={1} bg={getColour(colour)}>
                <Dots key={`dots-${value}`} value={value} />
            </StyledBox>
        );
    }
}

export const EmptyDie = () => <StyledBox m={1} />;
