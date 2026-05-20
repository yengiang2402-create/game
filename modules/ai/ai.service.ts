import { Board, Direction } from "../board/board.model";
import { getBestMoveExpectimax } from "./expectimax";

export class AIService {
  
  // Trả về hướng di chuyển gợi ý tốt nhất
  getBestMove(board: Board): Direction | null {
    // Gọi thuật toán Expectimax với độ sâu 3
    // Độ sâu 3 nhìn trước 3 bước (Player -> Máy -> Player) đủ mạnh và không gây giật lag.
    return getBestMoveExpectimax(board, 3);
  }
}
