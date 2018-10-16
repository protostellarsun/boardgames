import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import Dots from './Dots';

const StyledBox = styled(Box)`
    border-radius: 20%;
    height: 50px;
    width: 50px;
`;

type Props = {
    value: number;
    colour: string;
};

class Die extends React.PureComponent<Props> {
    render() {
        const { value, colour } = this.props;

        return (
            <StyledBox bg={colour}>
                <Dots value={value} />
            </StyledBox>
        );
    }
}

export default Die;
