// pages/api/exam.ts

import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/db';
import FormDataModel from '../../Models/ExamModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    await dbConnect.connect();

    switch (req.method) {
        case 'GET':
            return getHandler(req, res);
        case 'POST':
            return postHandler(req, res);
        case 'DELETE':
            return deleteHandler(req, res);
        case 'PUT':
            return updateHandler(req, res);
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const formDataList = await FormDataModel.find({});
        res.status(200).json(formDataList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const formData = await FormDataModel.create(req.body);
        res.status(201).json(formData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const id = req.query.id as string;
        const deletedFormData = await FormDataModel.findByIdAndDelete(id);
        if (deletedFormData) {
            res.status(200).json({ message: 'FormData deleted successfully' });
        } else {
            res.status(404).json({ message: 'FormData not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateHandler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const id = req.query.id as string;
        const updatedFormData = await FormDataModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedFormData) {
            res.status(200).json(updatedFormData);
        } else {
            res.status(404).json({ message: 'FormData not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
