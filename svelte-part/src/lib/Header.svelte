<script lang="ts">
    import TitleBar from './TitleBar.svelte';
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={'Placemark GmbH'} subTitle={'We show you interesting parts of the world'} />
    </div>
    <div class="column">
        <slot />
    </div>
</div>
