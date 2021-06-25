export const BASE_URL = 'http://localhost:3000/api';

export const REGEX_TEL = '^0\\d{9,11}$';
export const ERR_MSG = {
    EMAIL: 'Sai định dạng email, vui lòng kiểm tra lại',
    REQUIRED: '*',
    MIN: 'Giá trị phải lớn hơn: ',
    MAX: 'Giá trị phải nhỏ hơn: ',
    MIN_LENGTH: 'Độ dài phải lớn hơn: ',
    MAX_LENGTH: 'Độ dài phải nhỏ hơn: ',
    P_TEL: 'Vui lòng kiểm tra lại số điện thoại'
}

export const province = [
    "An Giang",
    "Kon Tum",
    "Bà Rịa – Vũng Tàu",
    "Lai Châu",
    "Bắc Giang",
    "Lâm Đồng",
    "Bắc Kạn",
    "Lạng Sơn",
    "Bạc Liêu",
    "Lào Cai",
    "Bắc Ninh",
    "Long An",
    "Bến Tre",
    "Nam Định",
    "Bình Định",
    "Nghệ An",
    "Bình Dương",
    "Ninh Bình",
    "Bình Phước",
    "Ninh Thuận",
    "Bình Thuận",
    "Phú Thọ",
    "Cà Mau",
    "Phú Yên",
    "Cần Thơ",
    "Quảng Bình",
    "Cao Bằng",
    "Quảng Nam",
    "Đà Nẵng",
    "Quảng Ngãi",
    "Đắk Lắk",
    "Quảng Ninh",
    "Đắk Nông",
    "Quảng Trị",
    "Điện Biên",
    "Sóc Trăng",
    "Đồng Nai",
    "Sơn La",
    "Đồng Tháp",
    "Tây Ninh",
    "Gia Lai",
    "Thái Bình",
    "Hà Giang",
    "Thái Nguyên",
    "Hà Nam",
    "Thanh Hóa",
    "Hà Nội",
    "Thừa Thiên Huế",
    "Hà Tĩnh",
    "Tiền Giang",
    "Hải Dương",
    "TP Hồ Chí Minh",
    "Hải Phòng",
    "Trà Vinh",
    "Hậu Giang",
    "Tuyên Quang",
    "Hòa Bình",
    "Vĩnh Long",
    "Hưng Yên",
    "Vĩnh Phúc",
    "Khánh Hòa",
    "Yên Bái",
    "Kiên Giang",
].sort()

export const career = [
    "IT phần mềm",
    "Du lịch",
    "Giáo dục",
    "Bán lẻ",
    "Báo chí / Truyền hình",
    "Bảo hiểm",
    "Bất động sản",
    "Phiên dịch",
    "Bưu chính viễn thông",
    "Dược phẩm",
    "Kế toán",
    "Luật",
    "Thiết kế đồ họa",
    "Thiết kế nội thất",
    "Thời trang",
    "Xây dựng"
]

export const tag = [
    "Html",
    "CSS",
    "JavaScript",
    "ReactJS",
    "Vue",
    "Angular",
    "Python",
    "C/C++",
    "Java",
    "PHP",
    "Swift",
    "C#",
    "Ruby",
    "Objective-C",
    "Tester",
    "Frontend",
    "Backend",
    "Fullstack",
]

export const genderRequire = [
    {code: 1, label: "Không yêu cầu"},
    {code: 2, label: "Nam"},
    {code: 3, label: "Nữ"},
]

export const workType = [
    {code: 1, label: "Toàn thời gian"},
    {code: 2, label: "Bán thời gian"},
    {code: 3, label: "Thực tập"},
    {code: 4, label: "Remote (làm việc từ xa)"},
]

export const level = [
    {code: 1, label: "Nhân viên"},
    {code: 2, label: "Trưởng nhóm"},
    {code: 3, label: "Trưởng/Phó phòng"},
    {code: 4, label: "Quản lý/Giám sát"},
    {code: 5, label: "Trưởng chi nhánh"},
    {code: 6, label: "Phó giám đốc"},
    {code: 7, label: "Giám đốc"},
    {code: 8, label: "Thực tập sinh"},
]

export const experienceRequire = [
    {code: 1, label: "Chưa có kinh nghiệm"},
    {code: 2, label: "Dưới 1 năm"},
    {code: 3, label: "1 năm"},
    {code: 4, label: "2 năm"},
    {code: 5, label: "3 năm"},
    {code: 6, label: "4 năm"},
    {code: 7, label: "5 năm"},
    {code: 8, label: "Trên 5 năm"},
]

export const jobState = [
    {code: 0, label: "Chờ duyệt"},
    {code: 1, label: "Đã xác thực"},
    {code: 2, label: "Tin bị từ chối xác thực"},
    {code: 3, label: "Tin đã hết hạn"},
]

export const applyState = [
    {code: 0, label: "Chờ duyệt"},
    {code: 1, label: "Đã duyệt"},
    {code: 2, label: "Đã từ chối"},
    {code: 3, label: "Đã đặt lịch hẹn"},
]

export const companyScale = [
    {code: 1, label: "Dưới 10 nhân viên"},
    {code: 2, label: "Từ 10 đến 24 nhân viên"},
    {code: 3, label: "Từ 25 đến 49 nhân viên"},
    {code: 4, label: "Từ 50 đến 100 nhân viên"},
    {code: 5, label: "Từ 100 đến 500 nhân viên"},
    {code: 6, label: "Trên 500 nhân viên"},
    {code: 7, label: "trên 1000 nhân viên"},
]
