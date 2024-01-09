export type AdopterProfileBody = {
  name: string;
  phone_number: string;
  address: string;
};

export type AdopterProfileResponse = AdopterProfileBody & {
  id: string;
  created_at: string;
  updated_at: string;
};
