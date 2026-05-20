// Kết quả sau khi merge:
// - row: hàng sau khi gộp các số giống nhau
// - scoreGain: điểm số tăng thêm sau khi merge (tổng các số được tạo ra)

export interface MergeResult {
    row: number[];
    scoreGain: number;
}

// Hàm merge: gộp 2 số giống nhau liền kề trong 1 hàng
//row: tham số đầu vào, MergeResult: kiểu dữ liệu trả về
export function merge(row: number[]): MergeResult {

    // Biến lưu điểm số cộng thêm trong lượt merge này
    let scoreGain = 0;

    // Tạo bản sao của row để không làm thay đổi dữ liệu gốc
    const newRow = [...row];

    // Duyệt từ trái sang phải
    // i < length - 1 vì luôn so sánh newRow[i] với newRow[i+1]
    for (let i = 0; i < newRow.length - 1; i++) {

        // Chỉ merge khi:
        // 1. Ô hiện tại khác 0
        // 2. Hai ô liền nhau có giá trị bằng nhau
        if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {

            // Gộp 2 ô lại: nhân đôi giá trị ô bên trái
            newRow[i] *= 2;

            // Ô bên phải bị xóa (trở thành 0)
            newRow[i + 1] = 0;

            // Cộng điểm: giá trị tạo ra sau merge được cộng vào score
            scoreGain += newRow[i];

            // Bỏ qua ô kế tiếp vì nó vừa bị merge rồi
            // Tránh trường hợp merge dây chuyền sai
            i++;
        }
    }

    // Trả về:
    // - hàng sau khi merge
    // - điểm số tăng thêm
    return {
        row: newRow,
        scoreGain: scoreGain,
    };
}