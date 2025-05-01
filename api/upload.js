import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" })
  }

  const { image } = req.body

  if (!image) {
    return res.status(400).json({ error: "Missing image in body" })
  }

  try {
    const buffer = Buffer.from(image, "base64")
    const filename = `captura-${Date.now()}.jpg`
    const storageRef = ref(storage, `capturas/${filename}`)
    await uploadBytes(storageRef, buffer)
    return res.status(200).json({ message: "Upload successful", file: filename })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}