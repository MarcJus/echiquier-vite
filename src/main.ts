import $ from 'jquery'
import { Color } from "./types";
import "./style.css"
import {isValidFen} from "./fen";

const board = $(".board")
board.on("contextmenu", e => {
    e.preventDefault();
})
let move: Color | undefined = $("input[name=move]:checked").val() as Color

let first_square: Color = "white";
const lettres: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]
const fen_starting_position: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
console.log(isValidFen(fen_starting_position))

draw_chessboard(move, fen_starting_position)

$("form input").on("change", () => { // détecte le changement de couleur
    move = $("input[name=move]:checked").val() as Color
    console.log(move);
    board.empty();
    draw_chessboard(move, fen_starting_position);
})


function draw_chessboard(color: Color, fen: string): void{

    const fen_position_description: string = fen.split(" ")[0];
    const fen_rows: string[] = fen_position_description.split("/");
    let fen_empty_square: number = 0;
    let fen_empty_square_count: number = 0;
    let position_in_row: number = 0;

    for(let i: number = 0; i < 64; i++){
        const row: number = Math.ceil((64 - i) / 8);
        const column: number = i % 8;
        const row_element:JQuery<HTMLDivElement> = $("<div>", {
            text: row,
            class: "row"
        });
        const column_element:JQuery<HTMLDivElement> = $("<div>", {
            text: lettres[column],
            class: "column"
        });

        let square: JQuery<HTMLDivElement> = $("<div>", {
            class: "square"
        })

        if(i % 8 === 0){
            fen_empty_square = 0;
            fen_empty_square_count = 0;
            position_in_row = 0;
            if(color === "white")
                square.append(row_element);
        }

        if(color === "white"){
            if(i > 55){
                square.append(column_element);
            }
        } else {
            if((i + 1) % 8 === 0){
                square.append(row_element);
            }
            if(i < 8){
                square.append(column_element)
            }
        }

        const current_fen_row: string = fen_rows[8-row];
        const piece: string = current_fen_row[position_in_row];

        if(!isNaN(Number(piece)) && fen_empty_square === 0){
            fen_empty_square = Number(piece);
            position_in_row++
        }

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

        // $("<div>", {
        //     text: i,
        //     class: "index"
        // }).appendTo(square);

        if(fen_empty_square != 0) {
            if(fen_empty_square != fen_empty_square_count){
                fen_empty_square_count ++;
            }
        } else {
            position_in_row++
        }

        if(first_square === "white"){ // fin de ligne : changement de couleur
            if(i % 2 === 0){ // blanc
                square.addClass("white black-text")
            } else { // noir
                square.addClass("black white-text")
            }
            if((i + 1) % 8 === 0){ // fin de ligne : changement de couleur
                first_square = "black";
            }
        } else if(first_square === "black"){
            if(i % 2 === 0){ // noir
                square.addClass("black white-text")
            } else { // blanc
                square.addClass("white black-text")
            }
            if((i + 1) % 8 === 0){ // fin de ligne : changement de couleur
                first_square = "white";
            }
        }
        color === "white" ?
            board.append(square.prop("outerHTML")) :
            board.prepend(square.prop("outerHTML"))
    }
}

export {}