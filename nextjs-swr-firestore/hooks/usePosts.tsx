import { useEffect, useMemo, useState } from "react";
import { useCollection } from '@nandorojo/swr-firestore';

interface Post {
  id: string;
  text: string;
  createdAt: any;
}

export const usePosts = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { data,} =
    useCollection<Post>(
      isMounted ? "posts" : undefined,
      { keepPreviousData: true },
      {
        ignoreFirestoreDocumentSnapshotField: false,
        orderBy: ["createdAt", "desc"],
        limit: 10,
      }
    );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const posts = useMemo(() => (data ? data : []), [data]);

  return {
    posts,
    status,
    addPost: add,
    isLoading: status === "loading",
    paginate: fetchNextPage,
    hasMore: hasNextPage,
    isFetchingMore: isFetchingNextPage,
  };
};
