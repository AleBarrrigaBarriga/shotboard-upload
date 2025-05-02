import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dsq2pfj7k', // reemplaza con tu cloud_name real
  api_key: 'TU_API_KEY',
  api_secret: 'TU_API_SECRET'
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' })
  }

  const { image } = req.body
  if (!image) return res.status(400).json({ error: 'Missing image in body' })

  try {
    const uploadRes = await cloudinary.uploader.upload(`data:image/jpeg;base64,${image}`, {
      folder: 'capturas'
    })

    return res.status(200).json({
      message: 'Upload successful',
      url: uploadRes.secure_url
    })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
