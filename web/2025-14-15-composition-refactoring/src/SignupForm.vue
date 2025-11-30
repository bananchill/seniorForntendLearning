<script setup lang="ts">
import { ref } from 'vue'
import { useDraftState } from './composables/useDraftState'
import { useValidations, validationRules } from './composables/useValidations'
import { useFormState } from './composables/useFormState'
// import { useRouter } from 'vue-router'

// const router = useRouter()

const form = useDraftState('signup:draft', {
  email: '',
  password: '',
  agree: false,
})

const { state: formState, handlers, markAllBlurred } = useFormState(form.value)

const { errors, isValid } = useValidations(form.value, {
  email: [validationRules.email('Invalid email')],
  password: [validationRules.minLength(8, 'min length: 8')],
  agree: [validationRules.required('You must agree')],
})

const loading = ref(false)
const toast = (msg: string) => alert(msg) // псевдо-тост

async function submit() {
  markAllBlurred()
  if (!isValid.value) return
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 400)) // имитация API
    toast('Account created')
    // router.push('/done')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>Email <input v-model="form.email" v-on="handlers.email" /></label>
    <span class="error" v-if="errors.email && formState.email.blurred">{{ errors.email }}</span>

    <label
      >Password <input type="password" v-model="form.password" v-on="handlers.password"
    /></label>
    <span class="error" v-if="errors.password && formState.password.blurred">{{
      errors.password
    }}</span>

    <label><input type="checkbox" v-model="form.agree" v-on="handlers.agree" /> I agree</label>
    <span class="error" v-if="errors.agree && formState.agree.blurred">{{ errors.agree }}</span>

    <button :disabled="loading">Create account</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 340px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.03);
  font-family: system-ui, sans-serif;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #333;
}

label:has(input[type='checkbox']) {
  flex-direction: row;
  align-items: center;
}

input[type='text'],
input[type='password'],
input[type='email'] {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.error {
  color: #d33;
  font-size: 12px;
  margin-top: -8px;
}

button {
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  background: #0074f0;
  color: white;
}
</style>
