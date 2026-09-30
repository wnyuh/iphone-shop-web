// "Ốp Lưng Đẹp" → "op lung dep": so khớp không phân biệt hoa thường/dấu
export const normalizeText = (s: string) =>
    s.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase().trim();
