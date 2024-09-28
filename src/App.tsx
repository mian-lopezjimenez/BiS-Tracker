import { useEffect, useState } from "react";

import axios from "axios";
import qs from "qs";

import "./App.css";

function App() {
  const [token, setToken] = useState<string>("");
  const [character, setCharacter] = useState<any>();

  async function getAccessToken() {
    try {
      const response = await axios.post(
        "https://oauth.battle.net/token",
        qs.stringify({
          grant_type: "client_credentials",
        }),
        {
          auth: {
            username: import.meta.env.VITE_API_CLIENT_ID,
            password: import.meta.env.VITE_API_SECRET,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Retornar el token de acceso
      setToken(response.data.access_token);
    } catch (error) {
      throw new Error(`Error obteniendo el token de acceso: ${error}`);
    }
  }

  async function fetchSpell(spellId: number) {
    try {
      const apiUrl = `https://us.api.blizzard.com/data/wow/spell/${spellId}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
        },
        params: {
          namespace: "static-us",
          locale: "es_ES", // Cambiar a 'es_MX' si deseas español
        },
      });

      console.log(response.data); // Mostrar los datos del hechizo
    } catch (error) {
      console.error(`Error al obtener el hechizo: ${error}`);
    }
  }

  const getCharacterAppearance = async (name: string) => {
    const url: string = `https://eu.api.blizzard.com/profile/wow/character/colinas-pardas/${name}/character-media?namespace=profile-eu&locale=es_ES`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
        },
        params: {
          namespace: "static-us",
          locale: "es_ES", // Cambiar a 'es_MX' si deseas español
        },
      });

      console.log(response.data); // Mostrar los datos del hechizo
      setCharacter(response.data);
    } catch (error) {
      console.error(`Error al obtener apariencia: ${error}`);
    }
  };

  useEffect(() => {
    getAccessToken();

    if (token) {
      fetchSpell(133);
      getCharacterAppearance("morvinhood");
    }
  }, [token]);

  return (
    <main>
      <h1 className="text-3xl font-bold underline">{token}</h1>
      <a
        href="https://www.wowhead.com/item=25697"
        className="q3"
        data-wowhead="gems=23121&amp;ench=2647&amp;pcs=25695:25696:25697"
      >
        Felstalker Bracers
      </a>

      <img src={character?.assets[2]?.value} />
    </main>
  );
}

export default App;
