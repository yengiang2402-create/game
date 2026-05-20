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

// Hàm di chuyển xuống (DOWN move)
// Ý tưởng chuẩn:
// DOWN = transpose → moveRight → transpose lại
export function moveDown(board: number[][]) {

    // Bước 1: chuyển hàng ↔ cột
    // Mục đích: biến bài toán DOWN thành RIGHT/LEFT trên trục mới
    const transposed = transpose(board);

    // Bước 2: đảo từng hàng
    // Vì DOWN là hướng ngược với UP nên cần reverse để dùng moveLeft
    const reversed = transposed.map(row => [...row].reverse());

    // Bước 3: dùng lại logic moveLeft
    // Sau reverse + transpose → bài toán trở thành LEFT
    const { board: moved, scoreGain } = moveLeft(reversed);

    // Bước 4: đảo lại để khôi phục hướng ban đầu
    const unreversed = moved.map(row => [...row].reverse());

    // Bước 5: chuyển vị lại về board gốc
    const resultBoard = transpose(unreversed);

    return {
        board: resultBoard,
        scoreGain,
    };
}