import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginFormSchema } from '$lib/features/auth/domain/auth.validation.js';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { setError } from 'sveltekit-superforms';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(loginFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(loginFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.api.signInEmail({
				body: {
					email: form.data.email,
					password: form.data.password
				},
				headers: event.request.headers
			});
		} catch (error) {
			if (error instanceof APIError) {
				return setError(form, '', error.message);
			}
			return setError(form, '', `Something went wrong. Please try again. ${error}`);
		}

		throw redirect(303, '/dashboard');
	}
};
