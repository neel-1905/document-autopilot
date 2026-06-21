<script lang="ts">
	import type { PageData } from './$types.js';
	import RegisterForm from '$lib/features/auth/ui/register-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<RegisterForm form={data.form} />
