import $ from 'jquery'
import { Color } from "./types";
import "./style.css"

const board = $(".board")
board.on("contextmenu", e => {
    e.preventDefault();
})
let move: Color | undefined = $("input[name=move]:checked").val() as Color

let first_square: Color = "white";
const lettres: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]
const fen_starting_position: string = "rnbqkbnr/pp1ppppp/2P5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1";

draw_chessboard(move, fen_starting_position)

$("form input").on("change", () => { // détecte le changement de couleur
    move = $("input[name=move]:checked").val() as Color
    console.log(move);
    board.empty();
    draw_chessboard(move, fen_starting_position);
})


function draw_chessboard(color: Color, fen: string){

    const fen_position_description = fen.split(" ")[0];
    const fen_rows = fen_position_description.split("/");
    let fen_empty_square: number = 0;
    let fen_empty_square_count: number = 0;
    let position_in_row: number = color == "white" ? 0 : 7;

    for(let i: number = 0; i < 64; i++){
        const row: number = color === "white" ? Math.ceil((64 - i) / 8) : Math.floor((i + 8) / 8);
        const column: number = color === "white" ? i % 8 : 7 - (i % 8);

        let square: JQuery<HTMLDivElement> = $("<div>", {
            class: "square"
        })

        if(i % 8 === 0){ // rows
            square.append($("<div>", {
                text: row,
                class: "row"
            }));
            fen_empty_square = 0;
            fen_empty_square_count = 0;
            position_in_row = color == "white" ? 0 : 7;
        }
        if(i > 55){
            square.append($("<div>", { // column
                text: lettres[column],
                class: "column"
            }));
        }

        const current_fen_row: string = fen_rows[8-row];
        const piece: string = current_fen_row[position_in_row];

        if(!isNaN(Number(piece)) && fen_empty_square === 0){
            fen_empty_square = Number(piece);
            console.log("fen_empty_square : ", fen_empty_square);
            color == "white" ? position_in_row++ : position_in_row --;
        }

        console.log("count : ", fen_empty_square_count);

        if(fen_empty_square == fen_empty_square_count){
            if(isNaN(Number(piece)) && piece !== undefined){
                square.append($("<div>", {
                    text: piece,
                    class: "piece"
                }))
            }
            fen_empty_square_count = 0;
            fen_empty_square = 0;
        }

        /*$("<div>", {
            text: fen_empty_square_count,
            class: "index"
        }).appendTo(square);*/

        if(fen_empty_square != 0) {
            if(fen_empty_square != fen_empty_square_count){
                fen_empty_square_count ++;
            }
        } else {
            color == "white" ? position_in_row++ : position_in_row --;
        }

        if(first_square === "white"){ // fin de ligne : changement de couleur
            if(i % 2 === 0){ // blanc
                square.addClass("white").addClass("black-text")
                board.append(square.prop("outerHTML"))
            } else { // noir
                square.addClass("black").addClass("white-text")
                board.append(square.prop("outerHTML"))
            }

            if((i + 1) % 8 === 0){
                first_square = "black";
            }
        } else if(first_square === "black"){
            if(i % 2 === 0){ // noir
                square.addClass("black").addClass("white-text")
                board.append(square.prop("outerHTML"))
            } else { // blanc
                square.addClass("white").addClass("black-text")
                board.append(square.prop("outerHTML"))
            }
            if((i + 1) % 8 === 0){ // fin de ligne : changement de couleur
                first_square = "white";
            }
        }
    }
}

export {}