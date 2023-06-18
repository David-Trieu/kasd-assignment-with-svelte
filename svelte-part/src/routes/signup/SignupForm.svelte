<script lang="ts">
	import { goto } from "$app/navigation";
	import {placemarkService} from "../../service/placemarkService";

	let userName = "";
	let email = "";
	let password = "";
	let errorMessage = "";

	async function signup() {
		console.log(`attemting to sign up email: ${email}`);
		let success = await placemarkService.signup( userName, email, password);
		if (success) {
			goto("/");
		} else {
			errorMessage = "Error Trying to sign up";
		}
	}
</script>

<form on:submit|preventDefault={signup}>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<label for="username" class="label">First Name</label>
				<input bind:value={userName} id="username" class="input" type="text" placeholder="Enter user name" name="userName" />
			</div>
		</div>
	</div>
	<div class="field">
		<label for="email" class="label">Email</label>
		<input bind:value={email} id="email" class="input" type="text" placeholder="Enter email" name="email" />
	</div>
	<div class="field">
		<label for="password" class="label">Password</label>
		<input bind:value={password} id="password" class="input" type="password" placeholder="Enter Password" name="password" />
	</div>
	<div class="field is-grouped">
		<button class="button is-link">Sign Up</button>
	</div>
</form>
{#if errorMessage}
	<div class="section">
		{errorMessage}
	</div>
{/if}
