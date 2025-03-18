import { ResourcesWP } from "@/lib/client";
import { useState } from "react";
import useSWR from "swr";

export function useSettings(client: ResourcesWP) {
  const { data, error, isLoading } = useSWR("/settings", client.getSettings);

  return {
    settings: data?.data,
    isLoading,
    error,
  };
}

interface ResourcesResponse {
  data: {
    resources: any[];
    page_count: number;
  };
}

export function useResources(client: ResourcesWP) {
  const [params, setParams] = useState(null);
  const { data, error, isLoading } = useSWR<ResourcesResponse>(
    ["/resources", params],
    () => client.get("/resources", params)
  );

  const refetch = (params: any) => setParams(params);

  return {
    resources: data?.data.resources,
    pageCount: data?.data.page_count,
    isLoading,
    error,
    refetch,
  };
}

export function useResource(client: ResourcesWP, slug: string) {
  const { data, error, isLoading } = useSWR(`/resources/${slug}`, () =>
    client.getResource(slug)
  );

  return {
    resource: data?.data,
    isLoading,
    error,
  };
}

export function useCategories(client: ResourcesWP) {
  const { data, error, isLoading } = useSWR(
    "/categories",
    client.getCategories
  );

  return {
    categories: data?.data,
    isLoading,
    error,
  };
}
