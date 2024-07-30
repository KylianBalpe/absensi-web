"use server";

import {
  AddFishRequest,
  DeleteFishRequest,
  FetchFishRequest,
  GetFishDetailRequest,
  UpdateFishRequest,
} from "@/lib/definition/fish-type";
import { revalidatePath } from "next/cache";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllFish = async (request: FetchFishRequest) => {
  try {
    const res = await fetch(
      `${backendURL}/library/fish/all?name=${request.search}&currentPage=${request.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.accessToken}`,
        },
      },
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getFish = async (request: GetFishDetailRequest) => {
  try {
    const res = await fetch(`${backendURL}/library/fish/${request.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const addFish = async (request: AddFishRequest, accessToken: string) => {
  try {
    const res = await fetch(`${backendURL}/library/fish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    const response = await res.json();

    revalidatePath("/dashboard/fish", "page");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateFish = async (
  id: number,
  request: UpdateFishRequest,
  accessToken: string,
) => {
  try {
    const res = await fetch(`${backendURL}/library/fish/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    const response = await res.json();

    revalidatePath("/dashboard/fish/[id]/edit", "page");

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFish = async (request: DeleteFishRequest) => {
  try {
    const res = await fetch(`${backendURL}/library/fish/${request.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    });

    const response = await res.json();

    revalidatePath("/dashboard/fish", "page");
    return response;
  } catch (error) {
    console.error(error);
  }
};
