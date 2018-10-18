/*
  Ref.: http://veli.ee/colorpedia/
*/

const black = '#000000';
const scorpion = '#606060';
const gray = '#888888';
const silverChalice = '#ADADAD';
const white = '#FFFFFF';

const scarlet = '#e01a00';
const purpleHeart = '#7926D3';
const matisse = '#1F68AD';
const jewel = '#18874D';
const sun = '#FFB70F';
const lemon = '#FFDF0F';

export type MonoColourString =
    | 'mono.black'
    | 'mono.dark'
    | 'mono.gray'
    | 'mono.light'
    | 'mono.white';

export type DieColourString =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple';

export const DieColourNames: DieColourString[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
];

export type ColorString = MonoColourString | DieColourString;

const nameToColourMap: { [key in ColorString]: string } = {
    "red": scarlet,
    "orange": sun,
    "yellow": lemon,
    "green": jewel,
    "blue": matisse,
    "purple": purpleHeart,
    'mono.black': black,
    'mono.dark': scorpion,
    'mono.gray': gray,
    'mono.light': silverChalice,
    'mono.white': white,
};

export const getColour = (name) => nameToColourMap[name];
