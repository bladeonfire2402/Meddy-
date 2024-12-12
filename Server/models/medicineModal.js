import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên thuốc
  mfgDate: { type: String, required: false }, // Ngày sản xuất
  expDate: { type: String, required: false }, // Ngày hết hạn
  medType: { type: String, required: false }, // Loại thuốc (Tablet, Capsule, v.v.)
  prescriptionDrug: { type: Boolean, required: false }, // Thuốc kê đơn hay không (Yes/No)
  sideEffects: { type: String, required: false }, // Tác dụng phụ
  ingredients: { type: String, required: false }, // Thành phần
  TRN: { type: Number, required: false }, // Số TRN
  Usagelimit: { type: Number, required: false }, // Giới hạn sử dụng
  Dosage: { type: String, required: false }, // Liều lượng (ví dụ: 10 mg)
  indications: { type: String, required: false }, // Chỉ định sử dụng
  contraindications: { type: String, required: false }, // Chống chỉ định
  usage: { type: String, required: false }, // Hướng dẫn sử dụng
  benefit: { type: String, required: false }, // Lợi ích
  medCategories: { type: String, required: false }, // Loại thuốc
  price: { type: Number, required: false }, // Giá tiền
  stock: { type: Number, required: false, default: 0 }, // Số lượng tồn kho với giá trị mặc định là 0
  unit: { type: String, required: false }, // Đơn vị (ví dụ: tablets, capsules, ml)
  img: { type: String, required: false }, // Đường dẫn hình ảnh thuốc
});

const medicineModel = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);

export default medicineModel;
