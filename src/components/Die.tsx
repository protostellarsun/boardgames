import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import Dots from './Dots';

const StyledBox = styled(Box)`
    height: 50px;
    width: 50px;
    border-radius: 20%;
    border: 1px solid gray;
`;

export type DieProps = {
    value: number;
    colour: string;
};

export default class Die extends React.PureComponent<DieProps> {
    render() {
        const { value, colour } = this.props;

        return (
            <StyledBox m={1} bg={colour}>
                <Dots value={value} />
            </StyledBox>
        );
    }
}

export const EmptyDie = () => <StyledBox m={1} />;
