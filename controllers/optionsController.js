const Option = require('../models/Option');
const Question = require('../models/Question');

// Create a new option
module.exports.create = async function (req, res) {
    try {
        // Log the raw request body for debugging
        console.log(req.body);

        // Extract parameters from the request
        const id = req.params.id;
        console.log('Received create request for option ID:', id);

        const { text, votes } = req.body;

        // Validate the request parameters
        if (!id || !text || votes === undefined) {
            return res.status(400).json({
                message: 'Please provide a valid option text and an initial vote count',
            });
        }

        // Find the associated question by its ID
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({
                message: 'Invalid Question id',
            });
        }

        // Check if an option with the same text and question_id already exists
        const existingOption = await Option.findOne({ 'text': text, 'question_id': question._id });

        if (existingOption) {
            // Return a message indicating the option already exists
            return res.status(200).json({
                message: 'Option Already exists',
            });
        }

        // If the option doesn't exist, create a new one
        const option = new Option({ 'text': text, 'question_id': question._id });
        option.votes = votes;

        // Generate a link to vote based on the ID of the newly created option
        option.link_to_vote = `http://localhost:8000/options/add_vote/${option._id}`;
        await option.save();

        if (!option) {
            throw new Error('Unable to create the option. Please check your data and try again.');
        }

        // Update the question with the newly created option
        question.options.push(option._id);
        await question.save();

        return res.status(200).json({
            message: 'Option created successfully',
            option: option,
        });
    } catch (error) {
        console.log('Error in create:', error); // Log errors for debugging
        return res.status(500).json({
            message: 'Server Error',
        });
    }
}

// Add a vote to an option
module.exports.add_vote = async function (req, res) {
    try {
        // Extract the option ID from the request parameters
        const id = req.params.id;

        console.log('Received vote request for option ID:', id);

        // Validate the option ID
        if (!id) {
            return res.status(404).json({
                message: 'Option does not exist',
            });
        }

        // Find the option by its ID
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({
                message: 'Option ID is not valid',
            });
        }

        // Increment the vote count and save the option
        option.votes += 1;
        await option.save();

        // Generate a link to vote based on the ID of the option
        option.link_to_vote = `http://localhost:8000/options/add_vote/${option._id}`;

        return res.status(200).json({
            message: 'Vote added successfully',
            option: option,
        });
    } catch (error) {
        console.log('Error in add_vote:', error); // Log errors for debugging
        return res.status(500).json({
            message: 'Server Error',
        });
    }
}

// Update an option
module.exports.update = async function (req, res) {
    try {
        // Extract the option ID from the request parameters
        const id = req.params.id;

        console.log('Received update request for option ID:', id);

        if (!id) {
            return res.status(400).json({
                message: 'Empty option id received',
            });
        }

        // Find the option by its ID
        const option = await Option.findById(id);

        if (!option) {
            return res.status(404).json({
                message: 'Option not found',
            });
        }

        // Extract the updated text and vote count from the request body
        const { text, votes } = req.body;

        if (text !== undefined) {
            option.text = text;
        }

        if (votes !== undefined) {
            option.votes = votes;
        }

        // Save the updated option
        option.link_to_vote = `http://localhost:8000/options/add_vote/${option._id}`;
        const updatedOption = await option.save();

        return res.status(200).json({
            message: 'Option updated successfully',
            option: updatedOption,
        });
    } catch (error) {
        console.log('Error in update:', error); // Log errors for debugging
        return res.status(500).json({
            message: 'Server Error',
        });
    }
}

// Delete an option
module.exports.delete = async function (req, res) {
    try {
        // Extract the option ID from the request parameters
        const id = req.params.id;

        console.log('Received delete request for option ID:', id);
        if (!id) {
            return res.status(400).json({
                message: 'Empty option id received',
            });
        }

        // Find the option by its ID
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({
                message: 'Option ID is not valid',
            });
        }

        if (option.votes > 0) {
            return res.status(400).json({
                message: 'Option has votes and cannot be deleted',
            });
        }

        // Remove the option from the associated question and delete it
        await Question.findByIdAndUpdate(
            option.question_id, { 
                $pull: { 
                    'options': option.id
                } 
            });
        await Option.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Option deleted successfully',
        });
    } catch (error) {
        console.log('Error in delete:', error); // Log errors for debugging
        return res.status(500).json({
            message: 'Server Error',
        });
    }
}
