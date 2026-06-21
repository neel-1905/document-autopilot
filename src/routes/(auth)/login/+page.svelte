<script lang="ts">
	import type { PageData } from './$types.js';
	import LoginForm from '$lib/features/auth/ui/login-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<LoginForm form={data.form} />
