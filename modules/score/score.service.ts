// Service quản lý điểm số trong game 2048
// Bao gồm:
// - score hiện tại

export class ScoreService {

  // Điểm hiện tại trong ván chơi
  private score = 0;

  // Lấy điểm hiện tại
  getScore() {
    return this.score;
  }

  // Reset điểm về 0 (khi start game mới)
  reset() {
    this.score = 0;
  }

  // Cộng điểm sau mỗi lần merge
  add(points: number) {
    // cộng điểm vào score hiện tại
    this.score += points;
  }
}