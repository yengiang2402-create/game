import { Board, Position } from "../board/board.model";
import { BoardService } from "../board/board.service";

// Hàm sinh thêm một ô số mới (2 hoặc 4) vào vị trí trống ngẫu nhiên
export function spawnTile(board: Board): Board {

    // Clone bàn cờ để tránh thay đổi trực tiếp board gốc
    // Vì array trong JavaScript là kiểu tham chiếu
    const newBoard = BoardService.cloneBoard(board);

    // Mảng lưu tất cả các ô còn trống
    // Mỗi phần tử gồm row và col
    const emptyCells: Position[] = [];

    // Duyệt toàn bộ bàn cờ để tìm ô có giá trị = 0
    // 0 nghĩa là ô trống
    for (let row = 0; row < newBoard.length; row++) {

        // Duyệt từng cột trong hàng hiện tại
        for (let col = 0; col < newBoard[row].length; col++) {

            // Nếu ô hiện tại trống
            if (newBoard[row][col] === 0) {

                // Lưu vị trí ô trống vào mảng
                emptyCells.push({ row, col });
            }
        }
    }

    // Nếu không còn ô trống
    // => không thể sinh thêm số mới
    // => trả lại board hiện tại
    if (emptyCells.length === 0) {
        return newBoard;
    }

    // Random một vị trí trong danh sách ô trống
    // Math.random() tạo số từ 0 -> <1
    // nhân với số lượng ô trống
    // floor để lấy số nguyên
    const randomIndex = Math.floor(
        Math.random() * emptyCells.length
    );

    // Lấy ô trống ngẫu nhiên vừa chọn
    const randomCell = emptyCells[randomIndex];

    // Random số sẽ sinh ra
    // 90% xác suất ra số 2
    // 10% xác suất ra số 4
    const value = Math.random() < 0.9 ? 2 : 4;

    // Gán giá trị mới vào vị trí ngẫu nhiên
    newBoard[randomCell.row][randomCell.col] = value;

    // Trả về bàn cờ mới sau khi thêm số
    return newBoard;
}