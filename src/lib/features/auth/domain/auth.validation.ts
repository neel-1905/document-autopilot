import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(1, 'Password is required')
});

export type LoginFormSchema = typeof loginFormSchema;

export const registerFormSchema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		email: z.email(),
		password: z
			.string()
			// .min(8)
			// .max(18, 'Password must contain maximum 18 characters')
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
			),
		confirmPassword: z.string().min(1, 'Confirm Password is required')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

export type RegisterFormSchema = typeof registerFormSchema;
