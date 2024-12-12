import medicineModel from "../models/medicineModal.js";
import fs from "fs";


// Đây là hàm để lấy tất cả dữ liệu về Thuốc
const listMedicines = async (req, res) => {
    try {
      // Lấy tất cả các thuốc từ cơ sở dữ liệu
      const medicines = await medicineModel.find({});
  
      // Trả về dữ liệu với thông báo thành công
      res.json({
        success: true,
        data: medicines,
      });
    } 
    catch (error) {
      console.error("Error fetching medicines:", error);
  
      // Trả về thông báo lỗi nếu có lỗi xảy ra
      res.status(500).json({
        success: false,
        message: "Failed to fetch medicines",
      });
    }
  };


  //add Medicines
const addMedicine = async (req, res) => {
    // Lấy tên tệp hình ảnh được tải lên
    let image_filename = req.file ? req.file.filename : null;
  
    const medicine = new medicineModel({
      name: req.body.name, // Tên thuốc
      mfgDate: req.body.mfgDate, // Ngày sản xuất
      expDate: req.body.expDate, // Ngày hết hạn
      medType: req.body.medType, // Loại thuốc (Tablet, Capsule, etc.)
      prescriptionDrug: req.body.prescriptionDrug, // Thuốc kê đơn hay không (Yes/No)
      sideEffects: req.body.sideEffects, // Tác dụng phụ
      ingredients: req.body.ingredients, // Thành phần
      TRN: req.body.TRN, // Số TRN
      Usagelimit: req.body.Usagelimit, // Giới hạn sử dụng
      Dosage: req.body.Dosage, // Liều lượng (ví dụ: 10 mg)
      indications: req.body.indications, // Chỉ định sử dụng
      contraindications: req.body.contraindications, // Chống chỉ định
      usage: req.body.usage, // Hướng dẫn sử dụng
      benefit: req.body.benefit, // Lợi ích
      medCategories: req.body.medCategories, // Loại thuốc
      price: req.body.price || 0 , // Giá tiền
      stock: req.body.stock || 0, // Số lượng tồn kho (default là 0 nếu không truyền vào)
      unit: req.body.unit, // Đơn vị (ví dụ: tablets, capsules, ml)
      img: image_filename, // Đường dẫn hình ảnh thuốc
    });

    await medicine.save();
  };

  const removeMedicine = async (req, res) => {
    try {
      // Find the medicine by ID
      const medicine = await medicineModel.findById(req.body.id);
  
      if (!medicine) {
        // If the medicine doesn't exist, return a 404 error
        return res.status(404).json({
          success: false,
          message: "Medicine not found",
        });
      }
  
      // Check if the medicine has an image and delete it
      if (medicine.img) {
        const imagePath = `uploadMedicines/${medicine.img}`;
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image at path ${imagePath}:`, err);
          } else {
            console.log(`Image deleted at path: ${imagePath}`);
          }
        });
      }
  
      // Delete the medicine record from the database
      await medicineModel.findByIdAndDelete(req.body.id);
  
      // Send success response
      res.status(200).json({
        success: true,
        message: "Medicine removed successfully",
      });
    } catch (error) {
      console.error("Error removing medicine:", error);
  
      // Send error response
      res.status(500).json({
        success: false,
        message: "Failed to remove medicine",
      });
    }
  };
  

  

  export {addMedicine,listMedicines,removeMedicine}
  

