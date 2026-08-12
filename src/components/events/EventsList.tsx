"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  format,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isBefore,
  isAfter,
  startOfDay,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Event } from "@/services/event.service";

// Month Picker Component
function MiniMonthPicker({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}) {
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4 w-[280px] z-50">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setViewYear(viewYear - 1)}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-bold text-lg text-gray-900">{viewYear}</span>
        <button
          onClick={() => setViewYear(viewYear + 1)}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((m, i) => {
          const d = new Date(viewYear, i, 1);
          const isSelected = isSameMonth(d, selectedDate);
          return (
            <button
              key={m}
              onClick={() => onSelect(d)}
              className={`py-3 rounded-md text-sm font-semibold transition-all
                ${isSelected ? "bg-[#f9c602] text-gray-900 shadow-md transform scale-105" : "hover:bg-gray-100 text-gray-700"}
              `}
            >
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function EventsList({
  initialEvents,
}: {
  initialEvents: Event[];
}) {
  const publishedEvents = initialEvents
    .filter((e) => e.status === "published")
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    );

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentMonthStart = startOfMonth(selectedDate);
  const currentMonthEnd = endOfMonth(selectedDate);

  const eventsInView = publishedEvents.filter((e) => {
    const d = new Date(e.eventDate);
    return isSameMonth(d, selectedDate);
  });

  const hasPrevious = publishedEvents.some((e) =>
    isBefore(new Date(e.eventDate), currentMonthStart),
  );
  const hasNext = publishedEvents.some((e) =>
    isAfter(new Date(e.eventDate), currentMonthEnd),
  );

  const handlePrevMonth = () => {
    if (hasPrevious) {
      setSelectedDate(startOfMonth(subMonths(selectedDate, 1)));
    }
  };

  const handleNextMonth = () => {
    if (hasNext) {
      setSelectedDate(startOfMonth(addMonths(selectedDate, 1)));
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const groupedEvents = eventsInView.reduce(
    (acc, event) => {
      const monthYear = format(new Date(event.eventDate), "MMMM yyyy");
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  // Dynamic Label logic
  const now = new Date();
  let label = "This Month Events";
  if (isBefore(endOfMonth(selectedDate), startOfMonth(now))) {
    label = "Recent";
  } else if (isAfter(startOfMonth(selectedDate), endOfMonth(now))) {
    label = "Upcoming";
  }

  return (
    <div className="pt-16 mt-16 ">
      <div className="mb-12 text-center flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Events & Programs
        </h2>
      </div>

      {/* Top Header / Navigation (Highlighted Toolbar) */}
      <div
        className="bg-yellow-50 border border-gray-200 rounded-2xl p-4 md:p-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative "
        ref={dropdownRef}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-lg px-2 py-1">
            <button
              onClick={handlePrevMonth}
              disabled={!hasPrevious}
              className={`p-1 ${hasPrevious ? "text-gray-900 hover:bg-gray-100" : "text-gray-300"} rounded transition-colors`}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
            <button
              onClick={handleNextMonth}
              disabled={!hasNext}
              className={`p-1 ${hasNext ? "text-gray-900 hover:bg-gray-100" : "text-gray-300"} rounded transition-colors`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={handleToday}
            className="bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50 hover:text-[#f9c602] transition-colors"
          >
            Today
          </button>

          <div className="relative ml-2 md:ml-6">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2 cursor-pointer transition-colors"
            >
              {label} - {format(selectedDate, "MMMM yyyy")}
              <ChevronDown size={20} className="mt-1" />
            </button>

            {isCalendarOpen && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <MiniMonthPicker
                  selectedDate={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d);
                    setIsCalendarOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-10">
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-medium">
            No events found for {format(selectedDate, "MMMM yyyy")}.
          </div>
        ) : (
          Object.entries(groupedEvents).map(([monthYear, events]) => (
            <div key={monthYear} className="space-y-0">
              {/* Timeline Month Header */}
              <div className="flex items-center gap-4 py-4 mb-2">
                <h3 className="text-lg font-bold text-gray-900 whitespace-nowrap">
                  {monthYear}
                </h3>
                <div className="relative flex-1 flex items-center">
                  <div className="absolute left-0 w-[5px] h-[5px] bg-black rounded-full" />
                  <div className="w-full h-[1px] bg-gray-200" />
                </div>
              </div>

              <div className="flex flex-col">
                {events.map((event) => {
                  const isPast = isBefore(
                    new Date(event.eventDate),
                    startOfDay(new Date()),
                  );
                  return (
                    <div
                      key={event._id}
                      className={`flex flex-col md:flex-row gap-6 py-6 border-b border-gray-100 last:border-0 relative ${isPast ? "opacity-70 hover:opacity-100 transition-opacity" : ""}`}
                    >
                      {/* Date Column */}
                      <div className="w-16 md:w-20 flex flex-col items-center flex-shrink-0 pt-1">
                        <span className="text-xs font-bold uppercase text-gray-900">
                          {format(new Date(event.eventDate), "eee")}
                        </span>
                        <span className="text-3xl md:text-4xl font-bold text-gray-900 mt-0 tracking-tighter">
                          {format(new Date(event.eventDate), "dd")}
                        </span>
                      </div>

                      {/* Details Column */}
                      <div className="flex-1 flex flex-col md:pr-8">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-medium">
                          <CalendarIcon size={12} className="text-[#f9c602]" />
                          <span>
                            {format(
                              new Date(event.eventDate),
                              "MMM d, yyyy @ h:mm a",
                            )}
                          </span>
                        </div>
                        <Link
                          href={`/events/${event.slug}`}
                          className="group inline-block w-fit mb-3"
                        >
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#f9c602] transition-colors leading-tight">
                            {event.title}
                          </h3>
                        </Link>
                        {event.eventLocation && (
                          <div className="text-[13px] text-gray-700 mb-4 font-medium">
                            {event.eventLocation}
                          </div>
                        )}
                        <p className="text-gray-500 line-clamp-3 text-[14px] leading-relaxed">
                          {event.excerpt}
                        </p>
                      </div>

                      {/* Image Column */}
                      <div className="md:w-[280px] lg:w-[340px] flex-shrink-0">
                        <Link
                          href={`/events/${event.slug}`}
                          className="block relative aspect-[16/10] w-full overflow-hidden group"
                        >
                          {event.cover?.url ? (
                            <Image
                              src={event.cover.url}
                              alt={event.title}
                              fill
                              className={`object-cover rounded-xl  transition-transform duration-700 ${isPast ? "grayscale group-hover:grayscale-0" : ""}`}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination / Navigation Footer */}
      <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200 text-sm font-bold text-gray-900">
        <button
          onClick={handlePrevMonth}
          disabled={!hasPrevious}
          className={`flex items-center gap-2 transition-colors ${hasPrevious ? "hover:text-[#f9c602] cursor-pointer" : "text-gray-400 cursor-not-allowed opacity-50"}`}
        >
          <span>←</span> Previous Events
        </button>
        <button
          onClick={handleNextMonth}
          disabled={!hasNext}
          className={`flex items-center gap-2 transition-colors ${hasNext ? "hover:text-[#f9c602] cursor-pointer" : "text-gray-400 cursor-not-allowed opacity-50"}`}
        >
          Next Events <span>→</span>
        </button>
      </div>
    </div>
  );
}
