import { AuthProvider } from "@/stores/AuthContext";
import { Search } from "@/components/index";

import "./App.css";

function App() {
  // async function fetchSpell(id: number) {
  //   try {
  //     const apiUrl = `https://us.api.blizzard.com/data/wow/spell/${id}`;
  //     const response = await axios.get(apiUrl, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
  //       },
  //       params: {
  //         namespace: "static-us",
  //         locale: "es_ES", // Cambiar a 'es_MX' si deseas español
  //       },
  //     });

  //     console.log(response.data); // Mostrar los datos del hechizo
  //   } catch (error) {
  //     console.error(`Error al obtener el hechizo: ${error}`);
  //   }
  // }

  // const getCharacterAppearance = async (name: string) => {
  //   const url: string = `https://eu.api.blizzard.com/profile/wow/character/colinas-pardas/${name}/character-media?namespace=profile-eu&locale=es_ES`;

  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
  //       },
  //       params: {
  //         namespace: "static-us",
  //         locale: "es_ES", // Cambiar a 'es_MX' si deseas español
  //       },
  //     });

  //     console.log(response.data); // Mostrar los datos del hechizo
  //     setCharacter(response.data);
  //   } catch (error) {
  //     console.error(`Error al obtener apariencia: ${error}`);
  //   }
  // };

  // useEffect(() => {
  //   getAccessToken();

  //   if (token) {
  //     fetchSpell(133);
  //     getCharacterAppearance("morvinhood");
  //   }
  // }, [token]);

  return (
    <AuthProvider>
      <main>
        <Search />
      </main>
    </AuthProvider>
  );
}

export default App;
