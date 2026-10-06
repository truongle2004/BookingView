import { setRequestLocale } from 'next-intl/server';

export default async function MarketingLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return await Promise.resolve(props.children);
}
