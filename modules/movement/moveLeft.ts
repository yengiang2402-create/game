import { compress } from "./compress";
import { merge } from "./merge";

// Hàm xử lý di chuyển sang trái (LEFT move)
// Input: board hiện tại
// Output: board mới sau khi di chuyển + điểm số cộng thêm
export function moveLeft(board: number[][]) {

    // Biến lưu tổng điểm đạt được trong lượt di chuyển này
    let scoreGain = 0;

    // Duyệt từng hàng trong bàn cờ
    // map giúp tạo ra một board mới (không thay đổi board cũ)
    const newBoard = board.map(row => {

        // Bước 1: dồn tất cả số về bên trái
        // Ví dụ: [2,0,2,4] → [2,2,4,0]
        const compressed = compress(row);

        // Bước 2: merge các số giống nhau liền kề
        // Ví dụ: [2,2,4,0] → [4,0,4,0]
        // gain = điểm sinh ra từ việc merge
        const { row: merged, scoreGain: gain } = merge(compressed);

        // Bước 3: dồn lại lần nữa sau khi merge
        // Vì sau merge sẽ xuất hiện số 0 ở giữa
        // Ví dụ: [4,0,4,0] → [4,4,0,0]
        const finalRow = compress(merged);

        // Cộng điểm của hàng này vào tổng điểm
        scoreGain += gain;

        // Trả về hàng sau khi xử lý xong
        return finalRow;
    });

    // Trả về board mới + tổng điểm đạt được trong lượt di chuyển
    return {
        board: newBoard,
        scoreGain
    };
}