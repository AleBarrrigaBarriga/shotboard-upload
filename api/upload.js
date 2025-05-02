import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Missing image in body' });
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${image}`, {
      folder: 'capturas'
    });

    return res.status(200).json({
      message: 'Upload successful',
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
