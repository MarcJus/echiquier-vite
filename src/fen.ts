export function isValidFen(fen: string): boolean {

    const fen_position_description: string = fen.split(" ")[0];
    const fen_rows: string[] = fen_position_description.split("/");

    const pieces: string = "rnbqkpRNBQKP";
    let pieces_count: number = 0;

    let valid_fen: boolean = true;

    fen_rows.forEach(row => {
        row.split("").forEach(char => {
            if(!pieces.split("").includes(char)){
                valid_fen = false;
                return;
            }
            if(isNaN(Number(char))){ // lettre
                pieces_count += Number(char)
            } else { // nombre
                pieces_count++;
            }
        })
        if(!valid_fen)
            return;
    })

    return valid_fen;
}