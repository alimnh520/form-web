import { UploadImage } from "../../../../../../lib/cloudinary/cloud-image";
import { connectDb } from "../../../../../../lib/mongodb";
import LandTax3 from "../../../../../../models/LandTax3";

export const POST = async (request) => {
    await connectDb();

    try {
        const formData = await request.formData();
        const divisionName = formData.get("divisionName");
        const districtName = formData.get("districtName");
        const upazilaName = formData.get("upazilaName");
        const mouzaName = formData.get("mouzaName");
        const khatianNumber = formData.get("khatianNumber");
        const mobile = formData.get("mobile");
        const khatian = formData.get("khatian");
        const dolil = formData.get("dolil");
        const photo = formData.get("photo");
        const dakhila = formData.get("dakhila");

        if (!divisionName || !districtName || !upazilaName || !mouzaName || !khatianNumber || !mobile || !khatian || !dolil || !photo || !dakhila) {
            return Response.json({ message: "Fill all the fields" });
        }

        const khatianPic = await UploadImage(khatian, "land-tax");
        const dolilPic = await UploadImage(dolil, "land-tax");
        const mainPhoto = await UploadImage(photo, "land-tax");
        const dakhilaPic = await UploadImage(dakhila, "land-tax");

        const addDetails = new LandTax3({
            divisionName: divisionName,
            districtName: districtName,
            upazilaName: upazilaName,
            mouzaName: mouzaName,
            khatianName: khatianNumber,
            mobile: mobile,
            khatian: khatianPic.secure_url,
            dolil: dolilPic.secure_url,
            photo: mainPhoto.secure_url,
            dakhila: dakhilaPic.secure_url,
            imgId: [khatianPic.public_id, dolilPic.public_id, mainPhoto.public_id, dakhilaPic.public_id]
        });
        await addDetails.save();
        return Response.json({ message: "uploaded successfully", success: true });

    } catch (error) {
        console.log(error);
        return Response.json({ message: "upload failed", success: false });
    }
}