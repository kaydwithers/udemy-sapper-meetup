<!-- <script>
  let className = undefined;
  export { className as class };
  export let disabled = false;
  export let helperText = '';
  export let hideLabel = false;
  export let id = Math.random();
  export let inline = false;
  export let invalid = false;
  export let invalidText = '';
  export let labelText = '';
  export let light = false;
  export let noLabel = false;
  export let selected = undefined;
  export let style = undefined;

  import { createEventDispatcher, setContext, afterUpdate } from 'svelte';
  import ChevronDown from './icons/ChevronDown.svelte';

  const dispatch = createEventDispatcher();

  let selectedValue = writable(selected);

  setContext('Select', { selectedValue });

  afterUpdate(() => {
    selected = $selectedValue;
    dispatch('change', $selectedValue);
  });

  $: errorId = `error-${id}`;
  $: selectedValue.set(selected);
</script>

<div>
  <select
    class={cx('--select-input')}
    aria-describedby={invalid ? errorId : undefined}
    disabled={disabled || undefined}
    aria-invalid={invalid || undefined}
    on:change={({ target }) => {
      selectedValue.set(target.value);
    }}
    {id}
  >
    <slot />
  </select>
  <ChevronDown />
</div> -->

<script>
  import ChevronDown from './icons/ChevronDown.svelte';
</script>

<div>
  <select
    class=""
  >
    <slot />
  </select>
  <ChevronDown />
</div>
