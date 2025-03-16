import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

//setting up a local upload middleware using multer
export const localUpload = multer({ dest: 'uploads' });

export const remoteUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/ecommerce-api/*'
    })
});
