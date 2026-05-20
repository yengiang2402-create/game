// Chứa các logic xử lý liên quan đến bàn cờ
import { spawnTile } from "../random/spawnTile";
import { Board } from "./board.model";

export class BoardService {

    // Tạo bàn cờ rỗng kích thước n × n
    // static: có thể gọi trực tiếp bằng BoardService.createEmptyBoard()
    static createEmptyBoard(size: number): Board {
        //size * size
        return Array.from({ length: size }, () => Array(size).fill(0)); //ban dau toan 0
    }

    // Sao chép bàn cờ để tránh thay đổi dữ liệu gốc
    static cloneBoard(board: Board): Board {
        return board.map(row => [...row]);
    }

     // Tạo bàn cờ ban đầu khi bắt đầu game
    static createInitialBoard(size: number): Board {

        // Bước 1: tạo bàn cờ rỗng toàn số 0
        let board = this.createEmptyBoard(size);

        // Bước 2: sinh ô số đầu tiên (2 hoặc 4)
        // vị trí được chọn ngẫu nhiên trong các ô trống
        board = spawnTile(board);

        // Bước 3: sinh thêm ô số thứ hai
        // Game 2048 khi bắt đầu luôn có 2 ô số
        board = spawnTile(board);

        // Trả về bàn cờ hoàn chỉnh lúc bắt đầu game
        return board;
    }
}