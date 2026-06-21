<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	async function handleLogout() {
		await authClient.signOut();
		await goto('/login', { invalidateAll: true });
	}
</script>

<h1>Dashboard Page</h1>

<Button onclick={handleLogout}>Logout</Button>
