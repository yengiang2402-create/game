// Hàm "nén" một hàng trong game 2048
// Mục tiêu: dồn tất cả số khác 0 về bên trái, giữ số 0 ở bên phải

export function compress(row: number[]): number[] {

    // Bước 1: Lọc ra tất cả các số khác 0
    // => chỉ giữ lại các ô có giá trị (2,4,8,...)
    const filter = row.filter(value => value !== 0);

    // Bước 2: Tính số lượng ô trống (0) cần thêm vào phía sau
    // Ví dụ row = [2,0,2,4] => filter = [2,2,4] => còn thiếu 1 số 0
    const zero = Array(row.length - filter.length).fill(0);

    // Bước 3: Ghép lại
    // Đưa các số về bên trái + thêm số 0 vào bên phải
    // Ví dụ: [2,2,4] + [0] => [2,2,4,0]
    return [...filter, ...zero];
}