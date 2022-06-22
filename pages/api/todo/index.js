import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if(req.method === "POST"){
      const {title, content} = req.body
      const todo = await prisma.todo.create({
        data: {
          title,
          content
        },
      })
      return res.status(201).json({status: "success", data: todo})
    }
    if(req.method === "GET"){
      const todos = await prisma.todo.findMany({take: 10});

      return res.status(200).json({status: "success", results: todos.length, data: todos})
    }
  } catch (error) {
    res.status(500)
    .json({status:"error", reason: error.message })
  } finally {
    await prisma.$disconnect()
  }
}