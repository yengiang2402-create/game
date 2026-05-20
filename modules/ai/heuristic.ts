import { Board } from "../board/board.model";

/**
 * Hàm lượng giá (Heuristic) cho bàn cờ 2048.
 * Hàm này "chấm điểm" bàn cờ để AI biết trạng thái này là tốt hay xấu.
 * @param board Bàn cờ cần đánh giá
 * @returns Điểm số của bàn cờ (càng cao càng tốt)
 */
export function evaluateBoard(board: Board): number {
  let emptyCells = 0;
  let maxTile = 0;
  const size = board.length;

  let smoothness = 0;

  // ==========================================
  // TRỌNG SỐ HEURISTIC
  // Đây là phần quan trọng nhất để tinh chỉnh độ thông minh của AI.
  // - EMPTY_WEIGHT: Rất cao vì ô trống là yếu tố sống còn để game không kết thúc.
  // - MAX_WEIGHT: Khuyến khích tạo ra số lớn.
  // - SMOOTH_WEIGHT: Giảm thiểu sự chênh lệch giữa các ô cạnh nhau (giúp dễ gộp hơn).
  // - MONOTONE_WEIGHT: Khuyến khích các số được sắp xếp theo một chiều nhất định (tăng/giảm dần).
  // ==========================================
  const EMPTY_WEIGHT = 270;
  const MAX_WEIGHT = 10;
  const SMOOTH_WEIGHT = 1;
  const MONOTONE_WEIGHT = 10;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = board[r][c];
      if (val === 0) {
        emptyCells++;
      } else {
        if (val > maxTile) maxTile = val;
      }

      // 1. Độ mượt (Smoothness):
      // Bàn cờ càng "mượt" (các số cạnh nhau có giá trị gần bằng nhau) thì càng dễ gộp.
      // Chúng ta sẽ trừ điểm nếu 2 ô cạnh nhau có độ chênh lệch lớn (tính bằng hàm log2).
      if (val !== 0) {
        // So sánh với phần tử bên phải
        if (c + 1 < size && board[r][c + 1] !== 0) {
          smoothness -= Math.abs(Math.log2(val) - Math.log2(board[r][c + 1]));
        }
        // So sánh với phần tử bên dưới
        if (r + 1 < size && board[r + 1][c] !== 0) {
          smoothness -= Math.abs(Math.log2(val) - Math.log2(board[r + 1][c]));
        }
      }
    }
  }

  // 2. Tính đơn điệu (Monotonicity):
  // Bàn cờ lý tưởng là khi các số to dồn hết về 1 góc và giảm dần đều về phía góc đối diện.
  // Ở đây chúng ta duyệt qua các hàng và cột, tính điểm cộng dồn theo chiều tăng hoặc giảm.
  let leftToRight = 0;
  let rightToLeft = 0;
  let upToDown = 0;
  let downToUp = 0;

  // Duyệt qua từng Hàng để tính đơn điệu ngang
  for (let r = 0; r < size; r++) {
    let current = 0;
    let next = 1;
    while (next < size) {
      while (next < size && board[r][next] === 0) next++;
      if (next >= size) next--;
      let currentVal = board[r][current] !== 0 ? Math.log2(board[r][current]) : 0;
      let nextVal = board[r][next] !== 0 ? Math.log2(board[r][next]) : 0;
      if (currentVal > nextVal) {
        rightToLeft += nextVal - currentVal;
      } else if (nextVal > currentVal) {
        leftToRight += currentVal - nextVal;
      }
      current = next;
      next++;
    }
  }

  // Duyệt qua từng Cột để tính đơn điệu dọc
  for (let c = 0; c < size; c++) {
    let current = 0;
    let next = 1;
    while (next < size) {
      while (next < size && board[next][c] === 0) next++;
      if (next >= size) next--;
      let currentVal = board[current][c] !== 0 ? Math.log2(board[current][c]) : 0;
      let nextVal = board[next][c] !== 0 ? Math.log2(board[next][c]) : 0;
      if (currentVal > nextVal) {
        upToDown += nextVal - currentVal;
      } else if (nextVal > currentVal) {
        downToUp += currentVal - nextVal;
      }
      current = next;
      next++;
    }
  }

  const monotonicity = Math.max(leftToRight, rightToLeft) + Math.max(upToDown, downToUp);

  return (
    emptyCells * EMPTY_WEIGHT +
    maxTile * MAX_WEIGHT +
    smoothness * SMOOTH_WEIGHT +
    monotonicity * MONOTONE_WEIGHT
  );
}
