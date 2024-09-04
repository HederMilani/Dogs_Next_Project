type PageParams = {
  params: {
    id: string;
  };
};

export default function FotoIdPage({ params }: PageParams) {
  return (
    <main>
      <h1 className="title">Foto - {params.id}</h1>
    </main>
  );
}
