import { S3 } from 'aws-sdk';

export async function uploadImages(files: Array<Express.Multer.File>) {
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY
    });

    type UploadedImage = {
        Bucket: string;
        Key: string;
        Location: string;
    };

    const uploadPromises = files.map(file => {
        const filename = file.originalname;
        const params = {
            Bucket: `${process.env.AWS_S3_BUCKET_NAME}/products`,
            Key: filename,
            Body: file.buffer,
        };
        return s3.upload(params).promise();
    });

    try {
        const uploadResponses = await Promise.all(uploadPromises);
        const images: UploadedImage[] = uploadResponses.map(uploadResponse => ({
            Bucket: uploadResponse.Bucket,
            Key: uploadResponse.Key,
            Location: uploadResponse.Location
        }));
        return images;
    } catch (error) {
        throw error;
    }
}
