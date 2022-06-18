import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function exe() {
    
    try {

        let query = await prisma.Post.create({
            data : {
                postTitle : "hello world",
                postDescription : "post description",
                postImage : "no url"
            }
        })

    }

    catch(e) {
        throw e
    }

    finally {
        await prisma.$disconnect()
    }

} 

exe()
