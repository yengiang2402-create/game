import { moveLeft } from "./moveLeft";

// Hàm chuyển vị ma trận (transpose)
// Chuyển hàng thành cột và cột thành hàng
function transpose(board: number[][]): number[][] {

    const size = board.length;

    // Kết quả sau khi chuyển vị
    const result: number[][] = [];

    // Duyệt theo cột trước
    for (let col = 0; col < size; col++) {

        const newRow: number[] = [];

        // Với mỗi cột, lấy tất cả phần tử theo từng hàng
        for (let row = 0; row < size; row++) {

            // Đảo vị trí: board[row][col] → thành hàng mới
            newRow.push(board[row][col]);
        }

        // Thêm hàng mới vào kết quả
        result.push(newRow);
    }

    return result;
}

// Hàm di chuyển lên (UP move)
// Ý tưởng: chuyển UP thành LEFT bằng cách transpose
export function moveUp(board: number[][]) {

    // Bước 1: chuyển cột thành hàng
    // Ví dụ:
    // 2 0 2
    // 0 4 0
    // 2 0 8
    //
    // → sau transpose:
    // 2 0 2
    // 0 4 0
    // 2 0 8
    const transposed = transpose(board);

    // Bước 2: dùng lại logic moveLeft (đi trái trên ma trận đã xoay)
    const { board: moved, scoreGain } = moveLeft(transposed);

    // Bước 3: chuyển ngược lại về dạng ban đầu
    const resultBoard = transpose(moved);

    // Trả về board mới + điểm số đạt được
    return {
        board: resultBoard,
        scoreGain,
    };
}