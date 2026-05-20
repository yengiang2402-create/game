// ===============================
// GAME CONTROLLER (BỘ ĐIỀU KHIỂN CHÍNH)
// ===============================
// Đây là nơi điều phối toàn bộ game 2048:
// - quản lý state
// - xử lý move
// - start / pause / reset
// - cập nhật score
// - kiểm tra game over

import { GameState } from "../game/game.state";
import { Direction } from "../board/board.model";
import { move } from "../movement/movement.service";
import { spawnTile } from "../random/spawnTile";
import { checkGameOver } from "../validator/checkGameOver";
import { ScoreService } from "../score/score.service";

export class GameController {

  private state: GameState;

  private scoreService = new ScoreService();

  // Khởi tạo game với bàn cờ ban đầu
  constructor(initialBoard: number[][]) {
    this.state = {
      board: initialBoard,
      score: 0,
      gameOver: false,
      started: false,
      paused: false
    };
  }

  // Bắt đầu game: cho phép chơi và reset pause
  start() {
    this.state.started = true;
    this.state.paused = false;
  }

  // Nếu game đang chạy → pause
  // Nếu đang pause → resume
  togglePause() {

    // Không cho pause nếu chưa bắt đầu hoặc đã game over
    if (!this.state.started || this.state.gameOver) return;

    this.state.paused = !this.state.paused;
  }

  // Khởi tạo lại toàn bộ trạng thái game
  newGame(initialBoard: number[][]) {

    // reset score về 0
    this.scoreService.reset();

    // reset toàn bộ state
    this.state = {
      board: initialBoard,
      score: 0,
      gameOver: false,
      started: true,
      paused: false
    };
  }

  // Xử lý mỗi lần người chơi di chuyển (UP/DOWN/LEFT/RIGHT)
  move(direction: Direction) {

    // Nếu chưa start → không xử lý
    if (!this.state.started) return this.state;

    // Nếu đang pause → không xử lý
    if (this.state.paused) return this.state;

    // Nếu game over → không xử lý
    if (this.state.gameOver) return this.state;

    // Bước 1: xử lý logic di chuyển (compress + merge)
    const result = move(this.state.board, direction);

    // Bước 2: cộng điểm từ lượt move
    this.scoreService.add(result.scoreGain);

    let newBoard = result.board;

    // Bước 3: sinh tile mới (2 hoặc 4)
    newBoard = spawnTile(newBoard);

    // Bước 4: kiểm tra game over
    const gameOver = checkGameOver(newBoard);

    // Bước 5: cập nhật global state
    this.state = {
      ...this.state,
      board: newBoard,
      score: this.scoreService.getScore(),
      gameOver
    };

    return this.state;
  }

  // Trả về toàn bộ trạng thái game hiện tại (để UI render)
  getState() {
    return this.state;
  }
}