import { deleteData } from "@/utils/api/delete";
import { fetchData } from "@/utils/api/fetch";
import { postData } from "@/utils/api/post";
import { updateData } from "@/utils/api/update";
import { create } from "zustand";

interface FetchStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fetch: (url: string, query?: URLSearchParams) => Promise<any>;
  error?: unknown | null;
}

export const useFetchStore = create<FetchStore>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
  fetch: async (url) => {
    try {
      set({ isLoading: true });
      const result = await fetchData(url);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ isLoading: false, error });
    }
  },
}));

interface DeleteStore {
  isSubmitting: boolean;
  setIsSubmitting: (isLoading: boolean) => void;
  _delete: (url: string, id: any) => Promise<any>;
  error?: unknown | null;
}

export const useDeleteStore = create<DeleteStore>()((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => {
    set({ isSubmitting });
  },
  _delete: async (url, id) => {
    try {
      set({ isSubmitting: true });
      const result = await deleteData(url, id);
      set({ isSubmitting: false });
      return result;
    } catch (error) {
      set({ isSubmitting: false, error });
    }
  },
}));

interface PostStore {
  isSubmitting: boolean;
  setIsSubmitting: (isLoading: boolean) => void;
  post: (url: string, body: any) => Promise<any>;
  error?: unknown | null;
}

export const usePostStore = create<PostStore>()((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => {
    set({ isSubmitting });
  },
  post: async (url, body) => {
    try {
      set({ isSubmitting: true });
      const result = await postData(url, body);
      set({ isSubmitting: false });
      return { ...result, ok: true };
    } catch (error) {
      set({ isSubmitting: false, error });
      return { ok: false };
    }
  },
}));

interface UpdateStore {
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;
  update: (url: string, body: any) => Promise<any>;
  error?: unknown | null;
}

export const useUpdateStore = create<UpdateStore>()((set) => ({
  isUpdating: false,
  setIsUpdating: (isUpdating) => {
    set({ isUpdating });
  },
  update: async (url, body) => {
    try {
      set({ isUpdating: true });
      const result = await updateData(url, body);
      set({ isUpdating: false });
      return { ...result, ok: true };
    } catch (error) {
      set({ isUpdating: false, error });
      return { ok: false };
    }
  },
}));
