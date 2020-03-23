/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { debounce } from "../debounce";
const MAX_STORIES = 100;
const STORY_INCREMENT = 20;

export const useInfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(STORY_INCREMENT);

  const handleScroll = debounce(() => {
    console.log("window: ", window.innerHeight + window.scrollY);
    console.log("docu: ", document.body.scrollHeight);

    if (window.innerHeight + window.scrollY !== document.body.scrollHeight || loading) {
      // console.log("firing", document.documentElement.scrollTop);
      return false;
    }

    setLoading(true);
  }, 500);
  // the innerHeight + scroll top !== offsetHeight;
  // if its bigger then show loading;

  useEffect(() => {
    if (!loading) return;

    if (count + STORY_INCREMENT >= MAX_STORIES) {
      // if count + story increment is > than max stop the scrolling;
      setCount(MAX_STORIES);
    } else {
      // else increment the count by story increment
      setCount(count + STORY_INCREMENT);
    }

    setLoading(false);
  }, [loading]);

  useEffect(() => {
    // listen for the scroll;
    window.addEventListener("scroll", handleScroll);
    // unsubscribe, cleanup.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { count };
};