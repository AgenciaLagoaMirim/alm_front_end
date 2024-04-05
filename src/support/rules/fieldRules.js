const rules = {
  required: value => !!value || 'Este campo é obrigatório!',
  minLength: (value, length) => (value && value.length >= length) || `Este campo deve ter no mínimo ${length} caracteres!`,
  maxLength: (value, length) => (value && value.length <= length) || `Este campo deve ter no máximo ${length} caracteres!`,
  email: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Este campo deve ser um e-mail válido!',
  confirmPassword: password => value => value === password || 'As senhas não conferem!',
  number: value => /^\d+$/.test(value) || 'Este campo deve ser numérico!',
}

export default rules
