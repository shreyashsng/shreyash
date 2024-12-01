"use client";

import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";

export default function Lanyard() {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);

  const getStatusTextAndColor = () => {
    if (!data || !data.discord_status) {
      return { statusText: "Loading...", dotColor: "bg-gray-400" };
    }

    const discordStatus = data.discord_status;
    let statusText, dotColor;

    switch (discordStatus) {
      case "idle":
        statusText = "Idle";
        dotColor = "bg-yellow-300";
        break;
      case "online":
        statusText = "Online";
        dotColor = "bg-green-500";
        break;
      case "dnd":
        statusText = "Do Not Disturb";
        dotColor = "bg-red-500";
        break;
      default:
        statusText = "Unknown Status";
        dotColor = "bg-gray-400";
        break;
    }

    return { statusText, dotColor };
  };

  const [indianTime, setIndianTime] = useState("00:00 IST");

  useEffect(() => {
    const getCurrentTimeInIndianStandardTime = () => {
      const indianTimezone = "Asia/Kolkata"; // IST timezone
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: indianTimezone,
        timeStyle: "short",
        hour12: true,
      });
      const currentTime = formatter.format(new Date());
      setIndianTime(currentTime);
    };

    const interval = setInterval(getCurrentTimeInIndianStandardTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:flex space-y-4 md:space-y-0 justify-between">
      <div className="text-muted-foreground text-xs">
        <div className="flex gap-2">
          <div
            className={`w-2 h-2 animate-pulse rounded-full my-auto ${
              getStatusTextAndColor().dotColor
            }`}
          />
          <p className="my-auto text-black dark:text-white">
            {getStatusTextAndColor().statusText}
          </p>
        </div>
        <p>{indianTime} IST</p>
      </div>
    </div>
  );
}
