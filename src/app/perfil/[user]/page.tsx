type PageParams = {
  params: {
    user: string;
  };
};

export default function PerfilUserPage({ params }: PageParams) {
  return (
    <main>
      <h1 className="title">Perfil - {params.user}</h1>
    </main>
  );
}
