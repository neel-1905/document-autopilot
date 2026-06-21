import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { registerFormSchema } from '$lib/features/auth/domain/auth.validation.js';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { setError } from 'sveltekit-superforms';
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(registerFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(registerFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name: form.data.name,
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

		throw redirect(303, '/login');
	}
};
