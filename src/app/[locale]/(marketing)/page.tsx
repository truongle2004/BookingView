import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiGlobe,
  FiHeadphones,
  FiHome,
  FiMapPin,
  FiSearch,
  FiSend,
  FiThumbsUp,
  FiTruck,
  FiUsers,
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Link } from '@/libs/I18nNavigation';

type IndexPageProps = { params: Promise<{ locale: string }> };

const destinations = [
  ['paris', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'],
  ['amalfi', 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80'],
  ['kyoto', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'],
  ['new_york', 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1200&q=80'],
] as const;

const travelTabs = [
  ['stays', FiHome],
  ['flights', FiSend],
  ['packages', FiBriefcase],
  ['cars', FiTruck],
  ['attractions', FiCamera],
  ['taxis', FiMapPin],
] as const;

const benefits = [
  [FiCalendar, 'benefit_pay_title', 'benefit_pay_description'],
  [FiThumbsUp, 'benefit_reviews_title', 'benefit_reviews_description'],
  [FiGlobe, 'benefit_properties_title', 'benefit_properties_description'],
  [FiHeadphones, 'benefit_support_title', 'benefit_support_description'],
] as const;

const footerSections = [
  ['footer_support', ['footer_support_1', 'footer_support_2', 'footer_support_3']],
  ['footer_discover', ['footer_discover_1', 'footer_discover_2', 'footer_discover_3']],
  ['footer_terms', ['footer_terms_1', 'footer_terms_2', 'footer_terms_3']],
  ['footer_partners', ['footer_partners_1', 'footer_partners_2', 'footer_partners_3']],
] as const;

export async function generateMetadata(props: IndexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'IndexPage' });
  return { title: t('meta_title'), description: t('meta_description') };
}

export default async function IndexPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'IndexPage' });

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <header className="bg-[#083b74] text-white">
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#main" className="text-2xl font-bold tracking-tight sm:text-[28px]">
              Booking<span className="text-[#54a8ff]">View</span>
            </a>
            <nav aria-label={t('account_navigation')} className="flex items-center gap-2 sm:gap-4">
              <Button type="button" variant="ghost" size="sm" className="hidden sm:inline-flex">USD</Button>
              <Button type="button" variant="ghost" size="icon" className="hidden rounded-full bg-white/10 sm:inline-flex">EN<span className="sr-only">{t('language_label')}</span></Button>
              <a className="hidden text-sm font-semibold lg:block" href="#footer">{t('list_property')}</a>
              <Button asChild variant="secondary" size="sm"><Link href="/sign-up/">{t('register')}</Link></Button>
              <Button asChild variant="secondary" size="sm"><Link href="/sign-in/">{t('sign_in')}</Link></Button>
            </nav>
          </div>
          <nav aria-label={t('travel_navigation')} className="mt-5 flex gap-2 overflow-x-auto pb-5">
            {travelTabs.map(([key, Icon], index) => (
              <a key={key} href="#search" className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm ${index === 0 ? 'border border-white bg-white/10' : 'hover:bg-white/10'}`}>
                <Icon aria-hidden="true" className="text-lg" />{t(`tab_${key}`)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="relative bg-[#083b74] pb-28 text-white sm:pb-32">
          <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
            <p className="mb-3 text-sm font-semibold text-[#a8d4ff]">{t('hero_eyebrow')}</p>
            <h1 className="max-w-3xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">{t('hero_title')}</h1>
            <p className="mt-4 max-w-2xl text-lg text-blue-100 sm:text-xl">{t('hero_subtitle')}</p>
          </div>
        </section>

        <section id="search" aria-label={t('search_label')} className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <form className="grid gap-1 rounded-xl bg-[#ffb700] p-1 shadow-xl lg:grid-cols-[1.5fr_1fr_1fr_auto]">
            <label className="flex min-h-16 items-center gap-3 rounded-lg bg-white px-4 text-gray-700">
              <FiMapPin aria-hidden="true" className="shrink-0 text-2xl text-[#006ce4]" />
              <span className="sr-only">{t('destination_label')}</span>
              <Input className="font-semibold" type="search" placeholder={t('destination_placeholder')} />
            </label>
            <label className="flex min-h-16 items-center gap-3 rounded-lg bg-white px-4">
              <FiCalendar aria-hidden="true" className="shrink-0 text-xl text-[#006ce4]" />
              <span><span className="block text-xs text-gray-500">{t('check_in')}</span><span className="font-semibold">{t('add_dates')}</span></span>
              <input className="sr-only" type="date" aria-label={t('check_in')} />
            </label>
            <button className="flex min-h-16 items-center gap-3 rounded-lg bg-white px-4 text-left" type="button">
              <FiUsers aria-hidden="true" className="shrink-0 text-xl text-[#006ce4]" />
              <span><span className="block text-xs text-gray-500">{t('guests_label')}</span><span className="font-semibold">{t('guests_value')}</span></span>
            </button>
            <Button className="min-h-16 font-bold" size="lg" type="submit"><FiSearch aria-hidden="true" />{t('search_button')}</Button>
          </form>
          <label className="mt-3 flex items-center gap-2 text-sm text-gray-700"><Checkbox />{t('work_trip')}</label>
        </section>

        <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
          <section>
            <h2 className="text-2xl font-bold">{t('benefits_title')}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(([Icon, title, description]) => (
                <Card key={title}>
                  <CardHeader>
                    <div className="flex size-12 items-center justify-center rounded-full bg-blue-50 text-2xl text-[#006ce4]" aria-hidden="true"><Icon /></div>
                    <CardTitle className="mt-3">{t(title)}</CardTitle>
                    <CardDescription>{t(description)}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">{t('offers_title')}</h2>
            <p className="mt-1 text-gray-600">{t('offers_description')}</p>
            <article className="mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-[#f3f7fc] md:grid-cols-[1.2fr_1fr]">
              <div className="flex flex-col items-start justify-center p-7 sm:p-10">
                <span className="rounded-full bg-[#e8f3ff] px-3 py-1 text-xs font-bold text-[#006ce4]">{t('offer_badge')}</span>
                <h3 className="mt-4 max-w-lg text-2xl font-bold sm:text-3xl">{t('offer_title')}</h3>
                <p className="mt-3 max-w-lg leading-7 text-gray-600">{t('offer_description')}</p>
                <Button asChild className="mt-6"><a href="#search">{t('offer_button')}</a></Button>
              </div>
              <div className="min-h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80')" }}>
                <span className="sr-only">{t('offer_image_label')}</span>
              </div>
            </article>
          </section>

          <section>
            <h2 className="text-2xl font-bold">{t('destinations_title')}</h2>
            <p className="mt-1 text-gray-600">{t('destinations_description')}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map(([key, image]) => (
                <a key={key} aria-label={t(`destination_${key}`)} className="group relative min-h-72 overflow-hidden rounded-2xl bg-gray-200" href="#search">
                  <span className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${image}')` }} />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <span className="absolute right-5 bottom-5 left-5 text-white"><span className="block text-2xl font-bold">{t(`destination_${key}`)}</span><span className="mt-1 block text-sm text-white/85">{t('destination_properties')}</span></span>
                </a>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl bg-[#003b95] px-6 py-10 text-white sm:px-10">
            <div className="absolute -top-20 -right-12 size-64 rounded-full border-[36px] border-[#006ce4] opacity-60" />
            <div className="relative max-w-2xl">
              <span className="text-xl font-bold text-[#ffb700]">Genius</span>
              <h2 className="mt-2 text-3xl font-bold">{t('member_title')}</h2>
              <p className="mt-3 text-blue-100">{t('member_description')}</p>
              <div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="secondary"><Link href="/sign-in/">{t('sign_in')}</Link></Button><Button asChild variant="ghost"><Link href="/sign-up/">{t('register')}</Link></Button></div>
            </div>
          </section>
        </div>
      </main>

      <footer id="footer" className="border-t border-gray-200 bg-[#f5f5f5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {footerSections.map(([section, links]) => (
            <div key={section}><h2 className="font-bold">{t(section)}</h2><ul className="mt-4 space-y-3 text-sm text-gray-600">{links.map(link => <li key={link}><a className="hover:text-[#006ce4] hover:underline" href="#main">{t(link)}</a></li>)}</ul></div>
          ))}
        </div>
        <div className="border-t border-gray-200 px-4 py-6 text-center text-xs text-gray-500">{t('copyright')}</div>
      </footer>
    </div>
  );
}
