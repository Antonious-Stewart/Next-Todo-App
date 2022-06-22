import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function handler(req,res){
try {
  if(req.method === "GET" && req.query.id){
    const todo = await prisma.todo.findUnique({where: {
      id: +req.query.id
    }});

    if(todo){
      return res.status(200).json({status: "success", data: todo});
    }

    return res.status(400).json({status: "fail", message: "Bad Request"})
  }
  if(req.method === "DELETE" && req.query.id){
    await prisma.todo.delete({where:{id: +req.query.id}})
    return res.status(204).json();
  }
  if(req.method === "PUT" && req.query.id){
    const todo = await prisma.todo.update({
      where: {
        id: +req.query.id
      }, 
      data: {
      ...req.body,
      updatedAt: new Date()
    }
  })

    return res.status(200).json({status: "succes", data: todo})
  }
} catch (error) {
  res.status(500)
  .json({status: "error", message: error.message})
} finally {
  await prisma.$disconnect()
}
}