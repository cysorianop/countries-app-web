import CountryDetail from '@/components/CountryDetail';

export default function Page({ params }: { params: { name: string } }) {
  //Reutilizacion del componente Country detail
  return <CountryDetail name={decodeURIComponent(params.name)} />;
}