<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { loginFormSchema, type LoginFormSchema } from '$lib/features/auth/domain/auth.validation';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	let { form: initialForm }: { form: SuperValidated<Infer<LoginFormSchema>> } = $props();

	const form = superForm(initialForm, {
		validators: zod4Client(loginFormSchema),
		validationMethod: 'oninput',
		onUpdated({ form }) {
			if (!form.valid) {
				console.log(form);
				return toast.error(form.errors?._errors?.[0] || 'Login failed');
			}

			toast.success('Login Successful');
		}
	});

	const { form: formData, enhance } = form;
</script>

<div class="h-full flex-center">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title class="text-center font-semibold text-xl">Login to your account</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<div class="flex flex-col gap-4">
					<Form.Field {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input
									{...props}
									bind:value={$formData.email}
									type="email"
									placeholder="johndoe@example.com"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input
									{...props}
									bind:value={$formData.password}
									type="password"
									placeholder="*****"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

					<Button class="w-full" type="submit">Login</Button>
				</div>
			</form>
		</Card.Content>

		<Card.Footer class="flex-col gap-2">
			<p>Don't have an account? <a href="/register" class="text-primary">Register</a></p>
		</Card.Footer>
	</Card.Root>
</div>
