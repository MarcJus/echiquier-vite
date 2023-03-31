import { Color } from "../types";

export default abstract class Piece {

    private color: Color;

    constructor(color: Color) {
        this.color = color
    }

}