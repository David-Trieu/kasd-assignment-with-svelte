<script lang="ts">
  import Header from "$lib/Header.svelte";
  import SignupForm from "./SignupForm.svelte";
  import LoginOrSignUp from "$lib/loginOrSignUp.svelte";
</script>

<Header>
  <LoginOrSignUp />
</Header>

<div class="columns">
  <div class="column">
    <div class="box">
      <h1 class="title">Sign Up</h1>
      <SignupForm />
    </div>
  </div>
  <div class="column has-text-centered">
    <img alt="maps" src="/maps.png" width="600" />
  </div>
</div>
