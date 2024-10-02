"use client";
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import supabase from "@/supabaseClient";
import PropTypes from "prop-types";
import tailwindStyles from "../index.css?inline";

Widget.propTypes = {
  projectId: PropTypes.number,
  loop: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  autoplay: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  delay: PropTypes.number,
};

function Widget({
  projectId = 1,
  loop = false,
  autoplay = false,
  delay = 2000,
}) {
  const [plugins, setPlugins] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSameDomain, setIsSameDomain] = useState(false);

  // Convert string values to boolean explicitly
  const isAutoplay = autoplay === "true" || autoplay === true;
  const isLoop = loop === "true" || loop === true;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data, error } = await supabase
        .from("Feedback")
        .select("*")
        .eq("projectId", projectId)
        .eq("isFavorite", true);
      if (error) {
        console.error("Error fetching feedbacks", error);
      } else {
        if (data?.length > 0) {
          setFeedbacks(data);
        }
      }
    };

    if (projectId) {
      fetchFeedbacks();
    }
  }, [projectId]);

  // Fetch the project details from Supabase
  useEffect(() => {
    const fetchProjectDetails = async () => {
      const { data, error } = await supabase
        .from("Project")
        .select("*")
        .eq("id", projectId)
        .single(); // Use single() to fetch a single project

      if (error) {
        console.error("Error fetching project details:", error);
      } else {
        if (data?.url) {
          compareDomains(data.url, window.location.href);
        }
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const compareDomains = (projectUrl) => {
    try {
      const currentUrl = window.top.location.href;
      const projectUrlObj = new URL(projectUrl);
      const currentUrlObj = new URL(currentUrl);
      if (projectUrlObj.origin === currentUrlObj.origin) {
        setIsSameDomain(true);
      } else {
        setIsSameDomain(false);
        console.error("Domains did not match");
      }
    } catch (error) {
      console.error("Error comparing domains:", error);
      setIsSameDomain(false);
    }
  };

  useEffect(() => {
    if (isAutoplay) {
      setPlugins([
        ...plugins,
        Autoplay({
          delay: delay,
        }),
      ]);
    } else {
      setPlugins([...plugins]);
    }
  }, [isAutoplay, delay]);

  if (!isSameDomain) {
    return null;
  }

  return (
    <>
      <style>{tailwindStyles}</style>
      <Carousel
        opts={{
          align: "start",
          loop: isLoop,
        }}
        plugins={plugins}
        className="widget w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-1">
          {feedbacks.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-1 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1 h-full">
                <CarouselCard item={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-8 sm:-left-[3rem]" />
        <CarouselNext className="-right-8 sm:-right-[3rem]" />
      </Carousel>
    </>
  );
}

export default Widget;
