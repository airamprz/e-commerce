const CookiesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Política de Cookies</h1>

      <div className="text-gray-700 mb-4">
        <p>
          Esta página web utiliza cookies. Las cookies son pequeños archivos de
          texto generados por las páginas web que visitas, las cuales contienen
          los datos de sesión que pueden ser de utilidad más adelante en la
          página web. De esta forma esta Web recuerda información sobre tu
          visita, lo que puede facilitar tu próxima visita y hacer que el sitio
          te resulte más útil.
        </p>

        <p className="mt-2">
          Las cookies desempeñan un papel muy importante, al mejorar la
          experiencia de uso de la web.
        </p>
      </div>

      <div className="text-gray-700 mb-4">
        <p className="font-semibold">Tipos de cookies utilizadas</p>

        <p>
          Esta Web utiliza tanto cookies temporales de sesión como cookies
          permanentes. Las cookies de sesión almacenan datos únicamente mientras
          el usuario accede a la Web y las cookies permanentes almacenan los
          datos en el terminal para que sean accedidos y utilizados en más de
          una sesión.
        </p>
      </div>

      <div className="text-gray-700 mb-4">
        <p className="font-semibold">
          Según la finalidad para la que se traten los datos obtenidos:
        </p>

        <p>
          <strong>Cookies técnicas:</strong> Son aquéllas que permiten al
          usuario la navegación a través de la página web o aplicación y la
          utilización de las diferentes opciones o servicios que en ella
          existen. Por ejemplo, controlar el tráfico y la comunicación de datos,
          identificar la sesión, acceder a las partes web de acceso restringido,
          recordar los elementos que integran un pedido, realizar la solicitud
          de inscripción o participación en un evento, utilizar elementos de
          seguridad durante la navegación y almacenar contenidos para la
          difusión de videos o sonido.
        </p>

        <p>
          <strong>Cookies de personalización:</strong> Son aquéllas que permiten
          al usuario acceder al servicio con algunas características de carácter
          general predefinidas en su terminal o que el propio usuario defina.
          Por ejemplo, el idioma, el tipo de navegador a través del cual accede
          al servicio, el diseño de contenidos seleccionado, geolocalización del
          terminal y la configuración regional desde donde se accede al
          servicio.
        </p>

        <p>
          <strong>Cookies publicitarias:</strong> Son aquéllas que permiten la
          gestión, de la forma más eficaz posible, de los espacios publicitarios
          que se pudieran incluir en la página web o aplicación desde la que se
          presta el servicio solicitado en base a criterios como el contenido
          editado o la frecuencia en la que se muestran los anuncios.
        </p>

        <p>
          <strong>Cookies de publicidad comportamental:</strong> Estas cookies
          almacenan información del comportamiento de los usuarios obtenida a
          través de la observación continuada de sus hábitos de navegación, lo
          que permite desarrollar un perfil específico para mostrar avisos
          publicitarios en función del mismo.
        </p>
      </div>

      <div className="text-gray-700 mb-4">
        <p className="font-semibold">Relación y descripción de cookies:</p>

        <p>
          La tabla que publicamos a continuación recoge de forma esquematizada
          las cookies anteriormente descritas y utilizadas en nuestra página
          web:
        </p>
      </div>

      <table className="w-full text-left mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Cookie</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Propiedad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">PHPSESSID</td>
            <td className="py-2 px-4 border-b">
              Cookie de sesión para el funcionamiento de la web. Esta cookie es
              esencial para el funcionamiento de la web.
            </td>
            <td className="py-2 px-4 border-b">Propia</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">_ga</td>
            <td className="py-2 px-4 border-b">
              Se usa para distinguir a los usuarios.
            </td>
            <td className="py-2 px-4 border-b">Google Analytics</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">_gid</td>
            <td className="py-2 px-4 border-b">
              Se usa para distinguir a los usuarios.
            </td>
            <td className="py-2 px-4 border-b">Google Analytics</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">_gat</td>
            <td className="py-2 px-4 border-b">
              Se usa para limitar el porcentaje de solicitudes.
            </td>
            <td className="py-2 px-4 border-b">Google Analytics</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">_fbp</td>
            <td className="py-2 px-4 border-b">
              Se usa para distinguir a los usuarios.
            </td>
            <td className="py-2 px-4 border-b">Facebook</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CookiesPage;
