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

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (scrollTrigger.current) {
        observer.unobserve(scrollTrigger.current);
      }
    };
  }, [dispatch, page, scrollTrigger]);
}
