exports.getExamples = (req, res, next) => {
    const examples2Send = [
        'example 1',
        'example 2',
        'example 3'
    ];

    res.json({
        examples: examples2Send
    }).status(200);
};