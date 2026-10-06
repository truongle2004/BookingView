import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { FiMapPin, FiSearch, FiStar } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

type SearchPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const properties = [
  {
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    name: 'Mekong Riverside Boutique Resort',
    rating: 9.1,
    reviews: 328,
    price: 1_840_000,
  },
  {
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    name: 'Cái Bè Garden House',
    rating: 8.8,
    reviews: 214,
    price: 1_260_000,
  },
  {
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
    name: 'Mekong Lodge Retreat',
    rating: 8.6,
    reviews: 176,
    price: 1_510_000,
  },
] as const;

const filters = ['breakfast', 'free_cancellation', 'pool', 'parking'] as const;

export async function generateMetadata(props: SearchPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'SearchPage' });
  return { title: t('meta_title'), description: t('meta_description') };
}

function getValue(value: string | string[] | undefined, fallback: string) {
  return typeof value === 'string' ? value : fallback;
}

export default async function SearchPage(props: SearchPageProps) {
  const { locale } = await props.params;
  const query = await props.searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'SearchPage' });
  const destination = getValue(query.ss, 'Cái Bè');
  const checkIn = getValue(query.checkin, '2026-10-16');
  const checkOut = getValue(query.checkout, '2026-10-17');
  const adults = getValue(query.group_adults, '2');
  const children = getValue(query.group_children, '0');
  const rooms = getValue(query.no_rooms, '1');
  const currency = new Intl.NumberFormat(locale, {
    currency: 'VND',
    maximumFractionDigits: 0,
    style: 'currency',
  });

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <header className="bg-[#003b95] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <a className="text-2xl font-bold" href={`/${locale}`}>
            Booking<span className="text-[#54a8ff]">View</span>
          </a>
          <span className="text-sm font-semibold">{t('header_action')}</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <form
          action={`/${locale}/search`}
          className="grid gap-1 rounded-lg bg-[#ffb700] p-1 lg:grid-cols-[1.4fr_1fr_1fr_auto]"
        >
          <label className="flex items-center gap-2 rounded-md bg-white px-3">
            <FiMapPin className="text-[#006ce4]" />
            <span className="sr-only">{t('destination')}</span>
            <Input defaultValue={destination} name="ss" />
          </label>
          <div className="grid grid-cols-2 gap-1">
            <Input
              className="rounded-md bg-white px-3"
              defaultValue={checkIn}
              name="checkin"
              type="date"
            />
            <Input
              className="rounded-md bg-white px-3"
              defaultValue={checkOut}
              name="checkout"
              type="date"
            />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <Input
              aria-label={t('adults')}
              className="rounded-md bg-white px-3"
              defaultValue={adults}
              min="1"
              name="group_adults"
              type="number"
            />
            <Input
              aria-label={t('children')}
              className="rounded-md bg-white px-3"
              defaultValue={children}
              min="0"
              name="group_children"
              type="number"
            />
            <Input
              aria-label={t('rooms')}
              className="rounded-md bg-white px-3"
              defaultValue={rooms}
              min="1"
              name="no_rooms"
              type="number"
            />
          </div>
          <Button className="h-12 rounded-md" type="submit">
            <FiSearch />
            {t('search')}
          </Button>
        </form>

        <div className="mt-7 grid gap-7 lg:grid-cols-[17rem_1fr]">
          <aside>
            <Card className="overflow-hidden">
              <div className="bg-[#ffb700] p-5">
                <h2 className="text-lg font-bold">{t('search_summary')}</h2>
                <p className="mt-2 text-sm">{destination}</p>
                <p className="mt-1 text-sm">
                  {checkIn} — {checkOut}
                </p>
                <p className="mt-1 text-sm">{t('guest_summary', { adults, children, rooms })}</p>
              </div>
              <div className="space-y-4 p-5">
                <h2 className="font-bold">{t('filters')}</h2>
                {filters.map((filter) => (
                  <label className="flex items-center gap-2 text-sm" key={filter}>
                    <Checkbox />
                    {t(filter)}
                  </label>
                ))}
              </div>
            </Card>
          </aside>

          <section>
            <h1 className="text-2xl font-bold">{t('results_title', { destination })}</h1>
            <p className="mt-1 text-gray-600">{t('results_count', { count: properties.length })}</p>
            <div className="mt-5 space-y-4">
              {properties.map((property, index) => (
                <article
                  className="grid overflow-hidden rounded-xl border border-gray-200 p-3 sm:grid-cols-[15rem_1fr_auto]"
                  key={property.name}
                >
                  <Image
                    alt={property.name}
                    className="min-h-48 w-full rounded-lg object-cover"
                    height={320}
                    src={property.image}
                    unoptimized
                    width={480}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-[#006ce4]">{property.name}</h2>
                    <div className="mt-2 flex text-[#ffb700]" aria-label={t('stars')}>
                      {[0, 1, 2, 3].map((star) => (
                        <FiStar fill="currentColor" key={star} />
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{t('distance')}</p>
                    <p className="mt-4 font-semibold">
                      {t(index === 0 ? 'room_suite' : 'room_double')}
                    </p>
                    <p className="text-sm text-green-700">{t('cancellation')}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-5 p-4 text-right">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{t('rating_label')}</span>
                      <span className="rounded-md rounded-bl-none bg-[#003b95] p-2 font-bold text-white">
                        {property.rating}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('price_caption', { rooms })}</p>
                      <p className="text-xl font-bold">{currency.format(property.price)}</p>
                      <p className="text-xs text-gray-500">{t('taxes')}</p>
                      <Button className="mt-3">{t('availability')}</Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
