const Question = require('../models/Question');
const Option = require('../models/Option');

// Create a new question with associated options
module.exports.create = async function (req, res) {
    try {
        // Extract the question title and option texts from the request body
        const { title, options } = req.body;

        // Validate the request parameters
        if (!title || !options || !Array.isArray(options)) {
            return res.status(400).json({
                message: "Title and an array of options are required in the request body"
            });
        }

        const questionExist = await Question.findOne({ 'title': title });
        if (questionExist) {
            return res.status(401).json({
                message: "Question is already existed"
            });
        }
        // Create the new question
        const newQuestion = new Question({ 'title': title });

        const createdOptions = await Promise.all(options.map(optionText => {
            const option = new Option({ 'text': optionText, 'question_id': newQuestion._id });
            option.link_to_vote = `http://localhost:8000/options/add_vote/${option._id}`; // Add link_to_vote
            return option.save(); // Save each option individually
        }));

        newQuestion.options = createdOptions.map(option => option._id);
        await newQuestion.save();

        return res.status(200).json({
            message: 'Question created successfully',
            question: newQuestion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server Error'
        });
    }
}

// Show details of a question including its associated options
module.exports.showDetails = async function (req, res) {
    try {
        const questionId = req.params.id;
        
        const question = await Question.findById(questionId).populate('options');

        if (question) {
            res.json(question);
        } else {
            res.status(404).json({
                message: 'Question not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

// Delete a question and its associated options
module.exports.deleteQues = async function (req, res) {
    try {
        const questionId = req.params.id;

        if (!questionId) {
            return res.status(404).json({
                message: 'Please Check The ID'
            });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                message: 'Question not found'
            });
        }

        await Option.deleteMany({ '_id': { $in: question.options } });
        await Question.findByIdAndDelete(questionId);

        return res.status(200).json({
            message: 'Question is deleted'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
}
