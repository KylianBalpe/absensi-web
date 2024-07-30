export type FishType = {
  id: number;
  name: string;
  latin_name: string;
  images_url: string[];
  description: string;
  ideal_temperature: string;
  ideal_ph: string;
  foods: string[];
  tags: string[];
  compatibility: string[];
  treatment: string;
  general_problem: string;
  history: string;
  info_src: string[];
};

export type FetchFishRequest = {
  accessToken: string;
  search?: string;
  page?: number;
};

export type FetchFishResponse = {
  data: {
    fishs: [FishType];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    };
  };
};

export type GetFishDetailRequest = {
  id: number;
  accessToken: string;
};

export type AddFishRequest = {
  name: string;
  latin_name: string;
  ideal_temperature: string;
  ideal_ph: string;
  description: string;
  treatment: string;
  general_problem: string;
  history: string;
  tipe: string;
  tags: string[];
  info_src: string[];
  foods: string[];
  compatibility: string[];
  images_url: string[];
};

export type UpdateFishRequest = {
  name: string;
  latin_name: string;
  ideal_temperature: string;
  ideal_ph: string;
  description: string;
  treatment: string;
  general_problem: string;
  history: string;
  tipe: string;
  tags: string[];
  info_src: string[];
  foods: string[];
  compatibility: string[];
  images_url: string[];
};

export type DeleteFishRequest = {
  accessToken: string;
  id: number;
};
