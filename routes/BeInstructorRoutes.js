import express from "express";

import BeInstructor from "../model/BeInstructor.js";
import InstructorFormModel from "../model/InstructorFormModel.js";

const router = express.Router();

router.post('/be-instructor', async (req, res) => {
    try {
        const { email, phone, domain, country, message } = req.body;
        // console.log(domain);
        // Find the registration document by ID
        const user = await BeInstructor.findOne({ email });
        if (user) {
            return res.status(201).send({ success: false, message: "email already exist" });
        }
        const instructor = new BeInstructor({
            email, phone, domain, country, message
        });
        // console.log(pcs360)

        await instructor.save();

        res.status(201).send({
            success: true,
            message: "send details successfully",
            instructor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Details",
            error,
        });
    }

});

router.get('/checkInstructor/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await BeInstructor.findOne({ email: email });
        if (user) {
            res.status(200).json({
                success: true,
                isInstructor: true
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

router.post('/instructorform', async (req, res) => {
    const { email, learn, requirements, courseTarget } = req.body;

    try {
        const newForm = new InstructorFormModel({
            email,
            learn,
            requirements,
            courseTarget
        });

        const form = await newForm.save();
        res.status(201).send({
            success: true,
            message: "Details sends successfully",
            form
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;