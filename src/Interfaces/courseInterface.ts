export interface CourseCatalog {
  maDanhMuc: string;
  tenDanhMuc: string;
}
export interface CourseDetail {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  danhMucKhoaHoc: { maDanhMucKhoahoc: string; tenDanhMucKhoaHoc: string };
  hinhAnh: string;
  luotXem: number;
  maNhom: string;
  moTa: string;
  ngayTao: string;
  soLuongHocVien: string;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
}
export interface RegisterCourse {
  maKhoaHoc: string;
  taiKhoan: string;
}
export interface CourseState {
  courseCatalogs: CourseCatalog[];
  isCourseCatalogsLoading: boolean;
  courseCatalogsError: undefined | string;
}
