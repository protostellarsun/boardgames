import React from 'react';

const dieSideLength = 50;
const paddingPercentage = 0.25;

const allDotPositions = [
    {
        x: dieSideLength * paddingPercentage,
        y: dieSideLength * paddingPercentage,
    },
    { x: dieSideLength * paddingPercentage, y: dieSideLength / 2 },
    {
        x: dieSideLength * paddingPercentage,
        y: dieSideLength * (1 - paddingPercentage),
    },
    { x: dieSideLength / 2, y: dieSideLength / 2 },
    {
        x: dieSideLength * (1 - paddingPercentage),
        y: dieSideLength * paddingPercentage,
    },
    { x: dieSideLength * (1 - paddingPercentage), y: dieSideLength / 2 },
    {
        x: dieSideLength * (1 - paddingPercentage),
        y: dieSideLength * (1 - paddingPercentage),
    },
];

/*
0   4
1 3 5
2   6
*/

const valueToDotsMap = {
    1: [3],
    2: [0, 6],
    3: [0, 3, 6],
    4: [0, 2, 4, 6],
    5: [0, 2, 3, 4, 6],
    6: [0, 1, 2, 4, 5, 6],
};

class Dots extends React.PureComponent<{ value: number }> {
    componentDidMount() {
        const canvas = this.refs.canvas as any;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';

        allDotPositions
            .filter(
                (dot, idx) => valueToDotsMap[this.props.value].indexOf(idx) > -1
            )
            .forEach((dot) => {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dieSideLength * 0.05, 0, 2 * Math.PI);
                ctx.fill();
            });
    }

    render() {
        return (
            <canvas ref='canvas' width={dieSideLength} height={dieSideLength} />
        );
    }
}

export default Dots;
