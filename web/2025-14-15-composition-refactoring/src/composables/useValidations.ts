import { ref, computed, watchEffect } from 'vue'

export type ValidationRule<T = unknown> = {
  validator: (value: T) => boolean
  message: string
}

export type ValidationRules<T extends Record<string, unknown>> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

export type ValidationErrors<T extends Record<string, unknown>> = {
  [K in keyof T]: string | null
}

export function useValidations<T extends Record<string, unknown>>(
  data: T,
  rules: ValidationRules<T>,
) {
  const errors = ref<ValidationErrors<T>>(
    Object.keys(data).reduce((acc, key) => {
      acc[key as keyof T] = null
      return acc
    }, {} as ValidationErrors<T>),
  )

  // Validate a single field
  function validateField(field: keyof T) {
    const fieldRules = rules[field]
    if (!fieldRules) {
      errors.value[field] = null
      return true
    }

    for (const rule of fieldRules) {
      if (!rule.validator(data[field])) {
        errors.value[field] = rule.message
        return false
      }
    }

    errors.value[field] = null
    return true
  }

  // Validate all fields
  function validateAll() {
    let isValid = true
    for (const field in data) {
      if (!validateField(field)) {
        isValid = false
      }
    }
    return isValid
  }

  // Check if form is valid
  const isValid = computed(() => {
    return Object.values(errors.value).every((error) => error === null)
  })

  // Check if there are any errors
  const hasErrors = computed(() => {
    return Object.values(errors.value).some((error) => error !== null)
  })

  // Auto-validate on data changes
  watchEffect(() => {
    validateAll()
  })

  return {
    errors,
    isValid,
    hasErrors,
    validateField,
    validateAll,
  }
}

// Common validation rules
export const validationRules = {
  required: <T>(message = 'This field is required'): ValidationRule<T> => ({
    validator: (value: T) => {
      if (typeof value === 'string') return value.trim().length > 0
      if (typeof value === 'boolean') return value === true
      if (Array.isArray(value)) return value.length > 0
      return value != null && value !== undefined
    },
    message,
  }),

  email: (message = 'Invalid email address'): ValidationRule<string> => ({
    validator: (value: string) => /.+@.+\..+/.test(value),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validator: (value: string) => value.length >= min,
    message: message || `Minimum length is ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validator: (value: string) => value.length <= max,
    message: message || `Maximum length is ${max} characters`,
  }),

  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule<string> => ({
    validator: (value: string) => regex.test(value),
    message,
  }),

  min: (min: number, message?: string): ValidationRule<number> => ({
    validator: (value: number) => value >= min,
    message: message || `Minimum value is ${min}`,
  }),

  max: (max: number, message?: string): ValidationRule<number> => ({
    validator: (value: number) => value <= max,
    message: message || `Maximum value is ${max}`,
  }),

  custom: <T>(validator: (value: T) => boolean, message: string): ValidationRule<T> => ({
    validator,
    message,
  }),
}
