// pages/api/staff.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/db";
import StaffModel from "../../Models/Staff";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect.connect(); // Correct invocation of connect function

  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    case "POST":
      return postHandler(req, res);
    case "DELETE":
      return deleteHandler(req, res);
    case "PUT":
      return updateHandler(req, res);
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const staff = await StaffModel.find({});
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { name, email, phoneNumber, department } = req.body;
    const newStaffMember = new StaffModel({
      name,
      email,
      phoneNumber,
      department,
    });
    await newStaffMember.save();
    res.status(201).json(newStaffMember);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const id = req.query.id as string;
    const deletedStaff = await StaffModel.findByIdAndDelete(id);
    if (deletedStaff) {
      res.status(200).json({ message: "Staff member deleted successfully" });
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const id = req.query.id as string;
    const { name, email, phoneNumber, department } = req.body;

    const updatedStaff = await StaffModel.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, department },
      { new: true }
    );
    if (updatedStaff) {
      res.status(200).json(updatedStaff);
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
