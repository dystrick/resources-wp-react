export interface ClientConfig {
  baseUrl?: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
  parent: number;
}

export interface Resource {
  id: number;
  slug: string;
  uri: string;
  created_at: number;
  updated_at: number;
  status: string;
  title: string;
  description: string;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
    background_size: string;
  };
  assets: any[];
  categories: Category[];
  social_share_buttons: string[];
  form: {
    enabled: boolean;
    provider: string;
    title: string;
    success_message: string;
    config: {
      email_addresses: string;
    };
  };
}
