import { Board, Direction } from "../board/board.model";
import { moveUp } from "./moveUp";
import { moveDown } from "./moveDown";
import { moveLeft } from "./moveLeft";
import { moveRight } from "./moveRight";

// Kết quả sau mỗi lần di chuyển
export interface MoveResult {
    board: Board;        // Bàn cờ sau khi di chuyển
    scoreGain: number;   // Điểm số đạt được trong lượt di chuyển
}

// Hàm tổng điều khiển di chuyển trong game 2048
// Nhận board + hướng di chuyển → trả về board mới + điểm
export function move(board: Board, direction: Direction): MoveResult {

    // Dựa vào hướng di chuyển, gọi hàm xử lý tương ứng
    switch (direction) {

        // Di chuyển lên
        case 'UP':
            return moveUp(board);

        // Di chuyển xuống
        case 'DOWN':
            return moveDown(board);

        // Di chuyển sang trái
        case 'LEFT':
            return moveLeft(board);

        // Di chuyển sang phải
        case 'RIGHT':
            return moveRight(board);

        // Trường hợp lỗi: direction không hợp lệ
        default:
            throw new Error('Invalid direction');
    }
}