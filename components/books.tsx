"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function BooksSection({
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) {
  const mediaData = [
    {
      id: 1,
      title: "It's Good To Be A Man",
      image: "/recommended-books/it's-good-to-be-a-man.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/its-good-to-be-a-man?_pos=1&_sid=e60b13112&_ss=r",
    },
    {
      id: 2,
      title: "Future Men",
      image: "/recommended-books/future-men.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/future-men-raising-boys-to-fight-giants?_pos=1&_sid=6196922ef&_ss=r",
    },
    
  ];

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current && !start) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        // Check if items are not duplicated already
        if (scrollerContent.length === mediaData.length) {
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            if (scrollerRef.current) {
              scrollerRef.current.appendChild(duplicatedItem);
            }
          });

          const getDirection = () => {
            if (containerRef.current) {
              if (direction === "left") {
                containerRef.current.style.setProperty(
                  "--animation-direction",
                  "forwards",
                );
              } else {
                containerRef.current.style.setProperty(
                  "--animation-direction",
                  "reverse",
                );
              }
            }
          };

          const getSpeed = () => {
            if (containerRef.current) {
              if (speed === "fast") {
                containerRef.current.style.setProperty(
                  "--animation-duration",
                  "20s",
                );
              } else {
                containerRef.current.style.setProperty(
                  "--animation-duration",
                  "80s",
                );
              }
            }
          };

          getDirection();
          getSpeed();
          setStart(true);
        }
      }
    }

    addAnimation();
  }, [direction, mediaData.length, speed, start]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "scroller relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
      )}
    >
      <ul
        ref={scrollerRef}
        className={twMerge(
          "flex min-w-full shrink-0 gap-2 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {mediaData.map((media) => (
          <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-xl"
            key={media.id}
          >
            <div>
              <Image
                src={media.image}
                width={205}
                height={320}
                priority
                quality={100}
                alt={media.title}
                className="object-cover w-auto h-64 aspect-auto group-hover:blur-sm rounded-xl transition-all"
              />
            </div>

            <div className="absolute inset-0 bg-black text-white bg-opacity-0 group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-xl transition-all">
              <div className="absolute z-10 bottom-4 left-4 right-4">
                <div className="flex items-end gap-1">
                  {[...Array(media.rating)].map((_, index) => (
                    <StarFilledIcon className="w-3 h-3" key={index} />
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </ul>
    </div>
  );
}
