<template>
  <div class="simple-input-main">
    <div class="simple-input-box">
      <input
        id="fullName"
        name="fullName"
        type="text"
        class="simple-input"
        placeholder=" "
      />
      <label for="fullName" class="simple-label">Full Name</label>
      <div class="simple-input-underline" />
    </div>
  </div>
</template>

<style lang="scss">
  .simple-input-main {
    @apply text-base w-full;
  }
  .simple-input-box {
    @apply relative;
  }
  .simple-input {
    @apply w-full px-2 bg-transparent text-base text-gray-500;
    outline: none;
    height: 40px;
  }
  .simple-label {
    @apply absolute pointer-events-none block px-2 text-justify text-base text-gray-400;
    transform-origin: top left;
    transform: translate(0, -33px) scale(1);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }
  .simple-label-focus {
    @apply text-gray-600 font-medium;
    transform: translate(0, -45px) scale(0.9);
    transform-origin: top left;
  }
  .simple-input-underline {
    @apply border-b-2;
  }
  .simple-input-underline:after {
    @apply absolute left-0 right-0 pointer-events-none border-b-2 border-green-500;
    bottom: -0.05rem;
    content: '';
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transform: scaleX(0);
  }
  .simple-input:focus ~ .simple-input-underline:after {
    transform: scaleX(1);
  }
  .simple-input:focus + .simple-label,
  .simple-input:not(:placeholder-shown) + .simple-label {
    @apply simple-label-focus;
    transform: translate(0, -50px) scale(0.9);
    transform-origin: top left;
  }
  /* enable to leave border-bottom in modified color when the field is populated */

  .simple-input:not(:placeholder-shown) ~ .simple-input-underline:after {
    transform: scaleX(1);
  }
</style>
