import { moveLeft } from "./moveLeft";

// Hàm xử lý di chuyển sang phải (RIGHT move)
// Ý tưởng: biến RIGHT thành LEFT bằng cách đảo mảng
export function moveRight(board: number[][]) {

    // Bước 1: đảo ngược từng hàng
    // Ví dụ: [2,0,2,4] → [4,2,0,2]
    // Mục đích: biến bài toán RIGHT thành LEFT
    const reversed = board.map(row => [...row].reverse());

    // Bước 2: dùng lại logic moveLeft
    // Vì sau khi reverse, việc đi RIGHT trở thành đi LEFT
    //moved: bàn cờ sau khi đã xử lý moveLeft xong
    const { board: moved, scoreGain } = moveLeft(reversed);

    // Bước 3: đảo ngược lại kết quả
    // Đưa board về đúng hướng RIGHT ban đầu
    const newBoard = moved.map(row => row.reverse());

    // Trả về board mới + điểm số đạt được
    return {
        board: newBoard,
        scoreGain
    };
}