- Chia thành nhiều module

* Module 1: board - quản lý dữ liệu bàn cờ.
* Module 2: movement - toàn bộ logic di chuyển game.
* Module 3: random - sinh tile mới.
* Module 4; score - tính điểm
* Module 5; validator - luật game.
* Module 6: keyboard - input người chơi.
* Module 7: điều phối toàn game.
* Module 8: ai - gợi ý đường đi.

- Kiến trúc tổng quát
  Keyboard Input
  ↓
  Game Controller
  ↓
  Movement Engine
  ↓
  Spawn Random Tile
  ↓
  Score System
  ↓
  Validator
  ↓
  Update State
  ↓
  React Render
  ↓
  UI

- Các thuật toán dự kiến

* Matrix Representation: cấu trúc dữ liệu ma trận ( module 1)
* Compress Algorithm: dịch chuyển số để ghép
* Adjacent Merge: gộp các ô giống nhau
* Adjacent Merge:
* Reverse Trick:
* Matrix Transpose:
* Random Empty Cell: Random số (thường 2 hoặc 4)
* Accumulated Merge Score: tính điểm
* Win Detection:
* Move Possible Detection:
* Event Listener:
* Game Orchestration:
* Greedy/ Heuristic/ Expectimax: hướng dẫn đường đi

- Thu tu code

1. board.model.ts
2. board.service.ts
3. random/spawnTile.ts
4. movement/compress.ts
5. movement/merge.ts
6. movement/moveLeft.ts
7. movement/moveRight.ts
8. movement/moveUp.ts
9. movement/moveDown.ts
10. movement.service.ts
11. score.service.ts
12. validator/checkGameOver.ts
13. game.controller.ts
14. game.state.ts
15. keyboard.service.ts
16. UI
17. AI
