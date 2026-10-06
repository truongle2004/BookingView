'use client';

import { useState } from 'react';
import {
  FiCalendar,
  FiChevronDown,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiSearch,
  FiUsers,
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/libs/I18nNavigation';

type SearchLabels = {
  addDates: string;
  adults: string;
  children: string;
  checkIn: string;
  checkOut: string;
  destination: string;
  destinationPlaceholder: string;
  done: string;
  guests: string;
  rooms: string;
  search: string;
  workTrip: string;
};

function Counter(props: {
  label: string;
  min: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-8">
      <span className="font-semibold">{props.label}</span>
      <div className="flex h-11 items-center rounded-lg border border-gray-300">
        <button
          aria-label={`${props.label} -`}
          className="flex size-11 items-center justify-center text-[#006ce4] disabled:text-gray-300"
          disabled={props.value <= props.min}
          onClick={() => {
            props.onChange(props.value - 1);
          }}
          type="button"
        >
          <FiMinus />
        </button>
        <span className="w-9 text-center font-semibold">{props.value}</span>
        <button
          aria-label={`${props.label} +`}
          className="flex size-11 items-center justify-center text-[#006ce4]"
          onClick={() => {
            props.onChange(props.value + 1);
          }}
          type="button"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}

export function BookingSearchForm(props: { labels: SearchLabels }) {
  const router = useRouter();
  const [openPanel, setOpenPanel] = useState<'dates' | 'guests' | null>(null);
  const [destination, setDestination] = useState('Cái Bè');
  const [checkIn, setCheckIn] = useState('2026-10-16');
  const [checkOut, setCheckOut] = useState('2026-10-17');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
  });
  const dateValue = `${dateFormatter.format(new Date(`${checkIn}T00:00:00`))} — ${dateFormatter.format(new Date(`${checkOut}T00:00:00`))}`;

  const submitSearch = () => {
    const query = new URLSearchParams({
      ss: destination,
      checkin: checkIn,
      checkout: checkOut,
      group_adults: String(adults),
      group_children: String(children),
      no_rooms: String(rooms),
    });
    router.push(`/search?${query.toString()}`);
  };

  return (
    <div>
      <form
        className="grid gap-1 rounded-xl bg-[#ffb700] p-1 shadow-xl lg:grid-cols-[1.5fr_1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          submitSearch();
        }}
      >
        <label className="flex min-h-16 items-center gap-3 rounded-lg bg-white px-4 text-gray-700">
          <FiMapPin aria-hidden="true" className="shrink-0 text-2xl text-[#006ce4]" />
          <span className="sr-only">{props.labels.destination}</span>
          <Input
            className="font-semibold"
            onChange={(event) => {
              setDestination(event.target.value);
            }}
            placeholder={props.labels.destinationPlaceholder}
            type="search"
            value={destination}
          />
        </label>

        <div className="relative">
          <button
            aria-expanded={openPanel === 'dates'}
            className="flex min-h-16 w-full items-center gap-3 rounded-lg bg-white px-4 text-left"
            onClick={() => {
              setOpenPanel(openPanel === 'dates' ? null : 'dates');
            }}
            type="button"
          >
            <FiCalendar aria-hidden="true" className="shrink-0 text-xl text-[#006ce4]" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-gray-500">{props.labels.addDates}</span>
              <span className="block truncate font-semibold">{dateValue}</span>
            </span>
            <FiChevronDown aria-hidden="true" />
          </button>
          {openPanel === 'dates' && (
            <div className="absolute top-[calc(100%+8px)] right-0 z-30 grid w-[min(36rem,calc(100vw-2rem))] gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-2xl sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">
                <span>{props.labels.checkIn}</span>
                <Input
                  className="rounded-lg border border-gray-300 px-3"
                  max={checkOut}
                  onChange={(event) => {
                    setCheckIn(event.target.value);
                  }}
                  type="date"
                  value={checkIn}
                />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                <span>{props.labels.checkOut}</span>
                <Input
                  className="rounded-lg border border-gray-300 px-3"
                  min={checkIn}
                  onChange={(event) => {
                    setCheckOut(event.target.value);
                  }}
                  type="date"
                  value={checkOut}
                />
              </label>
              <Button
                className="sm:col-span-2"
                onClick={() => {
                  setOpenPanel(null);
                }}
              >
                {props.labels.done}
              </Button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            aria-expanded={openPanel === 'guests'}
            className="flex min-h-16 w-full items-center gap-3 rounded-lg bg-white px-4 text-left"
            onClick={() => {
              setOpenPanel(openPanel === 'guests' ? null : 'guests');
            }}
            type="button"
          >
            <FiUsers aria-hidden="true" className="shrink-0 text-xl text-[#006ce4]" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-gray-500">{props.labels.guests}</span>
              <span className="block truncate font-semibold">
                {adults} {props.labels.adults} · {children} {props.labels.children} · {rooms}{' '}
                {props.labels.rooms}
              </span>
            </span>
            <FiChevronDown aria-hidden="true" />
          </button>
          {openPanel === 'guests' && (
            <div className="absolute top-[calc(100%+8px)] right-0 z-30 w-[min(22rem,calc(100vw-2rem))] space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
              <Counter label={props.labels.adults} min={1} onChange={setAdults} value={adults} />
              <Counter
                label={props.labels.children}
                min={0}
                onChange={setChildren}
                value={children}
              />
              <Counter label={props.labels.rooms} min={1} onChange={setRooms} value={rooms} />
              <Button
                className="w-full"
                onClick={() => {
                  setOpenPanel(null);
                }}
              >
                {props.labels.done}
              </Button>
            </div>
          )}
        </div>

        <Button className="min-h-16 font-bold" size="lg" type="submit">
          <FiSearch aria-hidden="true" />
          {props.labels.search}
        </Button>
      </form>
      <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
        <Checkbox />
        {props.labels.workTrip}
      </label>
    </div>
  );
}
