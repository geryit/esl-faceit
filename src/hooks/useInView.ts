import { MutableRefObject, useEffect } from "react";
import { fetchPosts } from "@/lib/features/posts/postsSlice";
import { ThunkDispatch } from "redux-thunk";

export default function useInView(
  dispatch: ThunkDispatch<any, any, any>,
  page: number,
  scrollTrigger: MutableRefObject<null>
) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchPosts(page));
        }
      },
      { threshold: 1 }
    );

    const currentTarget = scrollTrigger.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        // Use the copied variable
        observer.unobserve(currentTarget);
      }
    };
  }, [dispatch, page, scrollTrigger]);
}
