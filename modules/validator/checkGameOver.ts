// Kiểm tra trạng thái kết thúc game (Game Over)
// Game over xảy ra khi:
// 1. Không còn ô trống
// 2. Không còn khả năng merge theo hàng ngang
// 3. Không còn khả năng merge theo cột dọc

import { Board } from "../board/board.model";

export function checkGameOver(board: Board): boolean {

    const size = board.length;

    // =========================
    // BƯỚC 1: kiểm tra ô trống
    // =========================
    // Nếu còn ít nhất 1 ô = 0 → game chưa kết thúc
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {

            // tìm thấy ô trống → chưa game over
            if (board[row][col] === 0) return false;
        }
    }

    // ======================================
    // BƯỚC 2: kiểm tra merge theo hàng ngang
    // ======================================
    // Nếu có 2 số liền nhau giống nhau → còn nước đi
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size - 1; col++) {

            if (board[row][col] === board[row][col + 1]) {
                return false;
            }
        }
    }

    // ======================================
    // BƯỚC 3: kiểm tra merge theo cột dọc
    // ======================================
    // Nếu có 2 số liền nhau theo cột giống nhau → còn nước đi
    for (let col = 0; col < size; col++) {
        for (let row = 0; row < size - 1; row++) {

            if (board[row][col] === board[row + 1][col]) {
                return false;
            }
        }
    }

    // Nếu không còn ô trống + không còn merge được
    // → game kết thúc
    return true;
}