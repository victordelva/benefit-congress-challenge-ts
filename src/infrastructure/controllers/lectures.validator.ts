import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateLecture = [
	body('title').isString().notEmpty().withMessage('Title is required'),
	body('description').isString().notEmpty().withMessage('Description is required'),
	body('speakers').isArray().withMessage('Speakers must be an array'),
	body('day').isString().withMessage('Day must be a string'),
	body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	}
];
