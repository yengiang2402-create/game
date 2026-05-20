// Định nghĩa kiểu dữ liệu cho bàn cờ (ma trận 2 chiều gồm các số)
export type Board = number[][];

// Định nghĩa các hướng di chuyển trong game
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Định nghĩa vị trí của một ô trên bàn cờ
export interface Position {
  row: number; // Hàng
  col: number; // Cột
}

// Định nghĩa trạng thái hiện tại của game
export interface GameState {
  board: Board;      // Bàn cờ hiện tại
  score: number;     // Điểm số hiện tại
  gameOver: boolean; // Trạng thái kết thúc game
}