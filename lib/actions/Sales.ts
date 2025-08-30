// lib/actions/getRecentSales.ts
'use server'

import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '../db/models/order'


export async function getRecentSales(limit = 5) {
    await connectToDatabase
  
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('customer totalAmount') // select necessary fields only
      .lean()
  
    return orders.map((order) => ({
      name: order.customer.name,
      email: order.customer.email,
      total: order.totalAmount,
    }))
  }
  
  export async function getAllSales() {
    await connectToDatabase; // ✅ Call the function
  
    const totalOrders = await Order.countDocuments(); // ✅ Get total number of orders
  
    return totalOrders; // ✅ Return the result
  }
  
  export async function getTotalRevenue() {
    await connectToDatabase; // ✅ Call the function
  
    const totalOrders = await Order.countDocuments(); // ✅ Get total number of orders
  
    return totalOrders; // ✅ Return the result
  }

  export async function getSalesChartData() {
    await connectToDatabase
  
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .select('customer totalAmount') // select necessary fields only
      .lean()
  
    return orders.map((order) => ({
      name: order.customer.name,
      email: order.customer.email,
      total: order.totalAmount,
    }))
  }





export async function getSalesByCategory() {
  await connectToDatabase;

  const result = await Order.aggregate([
    // Break down items array
    { $unwind: "$items" },

    // Lookup product details
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },

    // Lookup category details from category ID in product
    {
      $lookup: {
        from: "categories",
        localField: "product.category",
        foreignField: "_id",
        as: "categoryData"
      }
    },
    { $unwind: "$categoryData" },

    // Group by date and category name
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          category: "$categoryData.name"
        },
        totalSales: {
          $sum: { $multiply: ["$items.unitPrice", "$items.quantity"] }
        }
      }
    },

    // Group by date to combine all categories into one document
    {
      $group: {
        _id: "$_id.date",
        categories: { $push: { k: "$_id.category", v: "$totalSales" } }
      }
    },

    // Convert categories array into object { desktop: 103, ... }
    {
      $project: {
        _id: 0,
        date: "$_id",
        sales: { $arrayToObject: "$categories" }
      }
    },
     // Merge date and sales into a single object
     {
      $replaceRoot: {
        newRoot: { $mergeObjects: ["$sales", { date: "$date" }] }
      }
    },

    // Sort by date
    { $sort: { date: 1 } }
  ]);
console.log(result)
  return result;
}
////////////////////////


// Fetch sales aggregated by category & date
export async function getSalesByCategories() {
  await connectToDatabase

  const results = await Order.aggregate([
    // flatten items
    { $unwind: '$items' },

    // group by date + category
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          categoryId: '$items.categoryId',
        },
        count: { $sum: '$items.quantity' }, // sales = sum of quantities
      },
    },

    // join with categories to get category name
    {
      $lookup: {
        from: 'categories',
        localField: '_id.categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },

    // reshape
    {
      $group: {
        _id: '$_id.date',
        sales: {
          $push: { category: '$category.name', count: '$count' },
        },
      },
    },

    // pivot into { date, cat1: n, cat2: n }
    {
      $project: {
        _id: 0,
        date: '$_id',
        salesObj: {
          $arrayToObject: {
            $map: {
              input: '$sales',
              as: 's',
              in: ['$$s.category', '$$s.count'],
            },
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ date: '$date' }, '$salesObj'] },
      },
    },
    { $sort: { date: 1 } },
  ])
console.log(results)
  return results
}
