<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		registerFormSchema,
		type RegisterFormSchema
	} from '$lib/features/auth/domain/auth.validation';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	let { form: initialForm }: { form: SuperValidated<Infer<RegisterFormSchema>> } = $props();

	const form = superForm(initialForm, {
		validators: zod4Client(registerFormSchema),
		validationMethod: 'oninput',
		onUpdated({ form }) {
			if (!form.valid && form.errors._errors?.length) {
				toast.error(form.errors._errors[0]);
			} else if (form.valid) {
				toast.success('Sign up Successful');
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<div class="h-full flex-center">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title class="text-center font-semibold text-xl">Register for an account</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<div class="flex flex-col gap-4">
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name</Form.Label>
								<Input {...props} bind:value={$formData.name} type="text" placeholder="John Doe" />
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

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

					<Form.Field {form} name="confirmPassword">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Confirm Password</Form.Label>
								<Input
									{...props}
									bind:value={$formData.confirmPassword}
									type="password"
									placeholder="*****"
								/>
							{/snippet}
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

					<Button class="w-full" type="submit" disabled={$delayed}>
						{#if $delayed}
							<LoaderCircle class="size-4 animate-spin" />
							Creating account...
						{:else}
							Register
						{/if}
					</Button>
				</div>
			</form>
		</Card.Content>

		<Card.Footer class="flex-col gap-2">
			<p>Already have an account? <a href="/login" class="text-primary">Login</a></p>
		</Card.Footer>
	</Card.Root>
</div>
