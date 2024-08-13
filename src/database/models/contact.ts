interface ContactInterface {
  id?: number;
  phoneNumber?: string | null;
  email?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  invalidate_token_before?: Date | null;
}

export { ContactInterface };
