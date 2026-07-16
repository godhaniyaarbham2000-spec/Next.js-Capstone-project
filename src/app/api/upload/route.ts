import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const formData = await request.formData()
  const file = formData.get('file') as File
  const taskId = formData.get('taskId') as string
  
  if (!file || !taskId) {
    return NextResponse.json({ error: 'Missing file or taskId' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        folder: 'taskflow/attachments',
        resource_type: 'auto',
      }, (err, result) => err ? reject(err) : resolve(result)).end(buffer)
    })
    
    await prisma.attachment.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        taskId
      }
    })
    
    revalidatePath('/', 'layout')
    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
