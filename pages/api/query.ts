import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/db";
import QueryModel from "../../Models/Query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect.connect();

  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    case "POST":
      return postHandler(req, res);
    case "DELETE":
      return deleteHandler(req, res);
    case "PUT":
      return putHandler(req, res); // Adding a new case for the PUT method
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const queries = await QueryModel.find({});
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { name, email, message } = req.body;
    const newQuery = new QueryModel({ name, email, message });
    await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Query ID is required" });
    }

    const deletedQuery = await QueryModel.findByIdAndDelete(id);
    if (!deletedQuery) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function putHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { id } = req.query;
    const { replied } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Query ID is required" });
    }

    const updatedQuery = await QueryModel.findByIdAndUpdate(id, { replied }, { new: true });

    if (!updatedQuery) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: "Query updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
