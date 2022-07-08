export const cardErrors: Record<string, string> = {
    required: 'Card number is required.',
    minLength: 'Invalid card length.',
    maxLength: 'Invalid card length.',
    validate: 'Card number is invalid.',
}

export const expiryErrors: Record<string, string> = {
    required: 'Expiry date is required',
    validate: 'Invalid expiry date',
}

export const cvvErrors: Record<string, string> = {
    required: 'CVV is required.',
    minLength: 'Invalid CVV number.',
    maxLength: 'Invalid CVV number.',
    pattern: 'Invalid CVV number.'
}

export const nameErrors: Record<string, string> = {
    required: 'Name is required',
    pattern: 'Name must have english characters only.'
}