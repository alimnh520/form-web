import cloudinary from "./cloud-config";

export const UploadImage = async (file, folder, type) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: type,
            folder: folder,
        }, async (error, result) => {
            if (error) {
                return reject(error.message)
            }
            return resolve(result);
        }).end(bytes);
    });
}
