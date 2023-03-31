export function isValidFen(fen: string): boolean {

    const fen_position_description: string = fen.split(" ")[0];
    const fen_rows: string[] = fen_position_description.split("/");

    const fen_accepted_chars: string = "rnbqkpRNBQKP12345678";

    let valid_fen: boolean = true;

    fen_rows.forEach(row => {
        let squares_count: number = 0;
        row.split("").forEach(char => {
            if(!fen_accepted_chars.split("").includes(char)){
                valid_fen = false;
                console.log("non inclus : ", char)
                return;
            }
            if(isNaN(Number(char))){ // lettre
                squares_count++;
            } else { // nombre
                squares_count += Number(char)
            }
        })
        if(squares_count != 8){
            valid_fen = false;
        }
        if(!valid_fen){
            return;
        }
    })

    return valid_fen;
}