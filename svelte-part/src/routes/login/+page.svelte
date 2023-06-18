<script lang="ts">
  import Header from "$lib/Header.svelte";
  import LoginOrSignUp from "$lib/loginOrSignUp.svelte";
  import LoginForm from "./LoginForm.svelte";
</script>

<Header>
  <LoginOrSignUp />
</Header>

<div class="columns">
  <div class="column has-text-centered">
    <img alt="maps" src="/maps.png" width="600" />
  </div>
  <div class="column">
    <div class="box">
      <h1 class="title">Login</h1>
      <LoginForm />
    </div>
  </div>
</div>
