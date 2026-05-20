// Trạng thái tổng thể của game 2048
// Đây là "global state" - nơi lưu toàn bộ dữ liệu quan trọng của game

import { Board } from "../board/board.model";

export interface GameState {

    // Bàn cờ hiện tại (ma trận 2 chiều)
    // chứa các số 0, 2, 4, 8, 16...
    board: Board;

    // Điểm số hiện tại của người chơi
    // tăng lên mỗi khi merge thành công
    score: number;

    // Trạng thái kết thúc game
    // true = game over, false = còn chơi được
    gameOver: boolean;

    //Trạng thái bắt đầu game
    //true = đã bắt đầu, false = chưa bắt đầu
    started: boolean;

    //Trạng thái tạm dừng game
    //true = game đang tạm dừng, false = game đang chạy bình thường
    paused: boolean;

}