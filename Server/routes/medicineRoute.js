import express from "express";
import multer from "multer";
import { addMedicine, listMedicines, removeMedicine } from "../controllers/medicineController.js";


const MedicineRouter=express.Router()

const storage= multer.diskStorage({
    destination:"uploadMedicines",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload= multer({storage:storage})

MedicineRouter.post("/add",upload.single("image"),addMedicine);
MedicineRouter.post("/removemedicine", removeMedicine);
MedicineRouter.get("/list",listMedicines);
// Example of calling the removeMedicine function




export default MedicineRouter


