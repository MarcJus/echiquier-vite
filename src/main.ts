import $ from 'jquery'
import { Color } from "./types";
import {draw_chessboard} from "./chessboard";
import "./style.css"
import { isValidFen, fen_starting_position } from "./fen";

const board = $(".board")
board.on("contextmenu", e => {
    e.preventDefault();
})
let move: Color = $("input[name=move]:checked").val() as Color
let fen: string = fen_starting_position;

draw_chessboard(move, fen_starting_position, board)

$("form input").on("change", () => { // détecte le changement de couleur
    move = $("input[name=move]:checked").val() as Color
    draw_chessboard(move, fen, board);
})
$("button.define-pos").on("click", () => {
    fen = $("input[name=fen]").val() as string
    if(fen === "")
        fen = fen_starting_position;
    console.log(isValidFen(fen))
    if(isValidFen(fen)){
        draw_chessboard(move, fen, board);
    } else {
        alert("FEN invalide !");
    }
})

export {}