export let blockColors = {
    Laranja: "#EC711F", //"#DD722A"
    Roxo: "#bc86ff", //"#AC9FBB"
    Azul: "#2d8cff", //"#4392F1"
    Verde: "#0EA53E", //"#26C485"
    Rosa: "#ed1dff" //"#ffc34b"
};

export type BlockColors = (typeof blockColors)[keyof typeof blockColors];
