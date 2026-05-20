// Hàm chuyển đổi phím bàn phím (keyboard input)
// sang các hành động trong game 2048

// Mục đích:
// - Tách input (UI) khỏi logic game
// - Dễ mở rộng thêm phím điều khiển (pause, new game, start)

export function mapKey(key: string) {

  switch (key) {

    // Mũi tên trái → di chuyển sang trái
    case 'ArrowLeft':
      return 'LEFT';

    // Mũi tên phải → di chuyển sang phải
    case 'ArrowRight':
      return 'RIGHT';

    // Mũi tên lên → di chuyển lên
    case 'ArrowUp':
      return 'UP';

    // Mũi tên xuống → di chuyển xuống
    case 'ArrowDown':
      return 'DOWN';

    // P → pause / resume game
    case 'p':
      return 'PAUSE';

    // N → bắt đầu game mới
    case 'n':
      return 'NEW';

    // S → start game
    case 's':
      return 'START';

    // Nếu không phải phím điều khiển game → bỏ qua
    default:
      return null;
  }
}