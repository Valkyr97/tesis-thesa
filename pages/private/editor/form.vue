<script setup lang="ts">
const { submit } = useSubmit('/api/editor')
</script>

<template>
  <FormKit
    submit-label="Crear"
    type="form"
    @submit="({ password2, ...value }) => submit(value)"
  >
    <div class="flex flex-wrap gap-x-8 xl:flex-row flex-col">
      <div class="flex-1">
        <FormKit required label="Nombre" type="text" name="name" />
        <FormKit
          required
          label="Correo Electrónico"
          type="email"
          name="email"
        />
      </div>
      <div class="flex-1">
        <FormKit requrired type="password" label="Contraseña" name="password" />
        <FormKit
          required
          type="password"
          label="Confirmar Contraseña"
          name="password2"
        />
      </div>
    </div>
  </FormKit>
</template>
