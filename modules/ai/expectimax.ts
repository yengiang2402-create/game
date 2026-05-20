import { Board, Direction } from "../board/board.model";
import { move } from "../movement/movement.service";
import { evaluateBoard } from "./heuristic";

// Xác suất sinh ra số của game 2048
// Trong game 2048 chuẩn, mỗi khi di chuyển sẽ có 90% sinh ra số 2 và 10% sinh ra số 4
const PROB_2 = 0.9;
const PROB_4 = 0.1;

/**
 * Hàm chính để tìm kiếm nước đi tốt nhất bằng thuật toán Expectimax
 * @param board Bàn cờ hiện tại
 * @param depth Số bước muốn nhìn trước (càng sâu càng thông minh nhưng càng chậm)
 * @returns Hướng đi tốt nhất (UP, DOWN, LEFT, RIGHT) hoặc null nếu bị kẹt
 */
export function getBestMoveExpectimax(board: Board, depth: number): Direction | null {
  const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
  let bestScore = -Infinity;
  let bestDir: Direction | null = null;

  // Lặp qua 4 hướng đi có thể của người chơi
  for (const dir of directions) {
    const result = move(board, dir);
    // Bỏ qua nếu di chuyển không làm thay đổi bảng (nước đi không hợp lệ)
    if (JSON.stringify(result.board) === JSON.stringify(board)) {
      continue;
    }
    const score = expectimax(result.board, depth - 1, false);
    if (score > bestScore) {
      bestScore = score;
      bestDir = dir;
    }
  }

  return bestDir;
}

/**
 * Hàm đệ quy Expectimax đánh giá điểm số của một trạng thái bàn cờ
 * @param board Bàn cờ đang mô phỏng
 * @param depth Độ sâu còn lại của cây tìm kiếm
 * @param isPlayerTurn Lượt của ai? true = Người chơi (tìm Max), false = Máy tính sinh số (tính Kỳ vọng - Expectation)
 */
function expectimax(board: Board, depth: number, isPlayerTurn: boolean): number {
  // Điều kiện dừng: Khi hết số bước nhìn trước, gọi hàm Heuristic để chấm điểm bàn cờ
  if (depth === 0) {
    return evaluateBoard(board);
  }

  const size = board.length;

  if (isPlayerTurn) {
    // ==========================================
    // LƯỢT CỦA NGƯỜI CHƠI (MAX NODE)
    // Người chơi luôn muốn chọn nước đi mang lại điểm số cao nhất
    // ==========================================
    let maxScore = -Infinity;
    let moved = false;
    const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    for (const dir of directions) {
      const result = move(board, dir);
      if (JSON.stringify(result.board) !== JSON.stringify(board)) {
        moved = true;
        const score = expectimax(result.board, depth - 1, false);
        if (score > maxScore) maxScore = score;
      }
    }
    // Nếu không thể đi được nước nào nữa (Game Over), trả về điểm của bàn cờ đó
    if (!moved) return evaluateBoard(board); 
    return maxScore;
  } else {
    // ==========================================
    // LƯỢT CỦA MÁY (CHANCE NODE / EXPECTATION NODE)
    // Máy tính sẽ sinh ngẫu nhiên số 2 hoặc 4 vào các ô trống.
    // Ta không thể biết chắc máy sẽ sinh vào đâu, nên phải tính giá trị kỳ vọng (trung bình cộng có trọng số)
    // ==========================================
    let expectedScore = 0;
    
    // Tìm tất cả các ô trống hiện có trên bàn cờ
    const emptyCells: { r: number, c: number }[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] === 0) emptyCells.push({ r, c });
      }
    }

    // Nếu hết ô trống (Game Over), trả về điểm hiện tại
    if (emptyCells.length === 0) {
      return evaluateBoard(board);
    }

    // Tối ưu hiệu năng: Thuật toán Expectimax rất tốn tài nguyên do rẽ nhánh quá nhiều.
    // Nếu bàn cờ to (5x5, 6x6) và có quá nhiều ô trống, ta chỉ lấy ngẫu nhiên 3 ô trống để tính xác suất.
    // Việc này gọi là "Pruning" (tỉa cành) hoặc "Sampling", giúp tránh bị treo trình duyệt.
    let cellsToTest = emptyCells;
    if (emptyCells.length > 5 && size >= 5) {
       cellsToTest = emptyCells.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    const probPerCell = 1 / cellsToTest.length;

    for (const cell of cellsToTest) {
      // Nhánh 1: Sinh ra số 2 (xác suất 90%)
      const board2 = board.map(row => [...row]);
      board2[cell.r][cell.c] = 2;
      expectedScore += expectimax(board2, depth - 1, true) * PROB_2 * probPerCell;

      // Nhánh 2: Sinh ra số 4 (xác suất 10%)
      const board4 = board.map(row => [...row]);
      board4[cell.r][cell.c] = 4;
      expectedScore += expectimax(board4, depth - 1, true) * PROB_4 * probPerCell;
    }

    return expectedScore;
  }
}
