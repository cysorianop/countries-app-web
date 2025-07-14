import CountryDetail from '@/components/CountryDetail';

export default function Page({ params }: { params: { name: string } }) {
  return <CountryDetail name={decodeURIComponent(params.name)} />;
}