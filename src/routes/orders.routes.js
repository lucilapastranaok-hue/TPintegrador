import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/orders", async (req, res) => {

  try {

    const orders = await prisma.order.findMany({
      include: {
        user: true,

        orderItems: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error getting orders",
    });
  }

});

export default router; 
