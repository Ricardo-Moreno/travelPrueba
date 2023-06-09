import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const UpdateObjectForm = () => {
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    if (!formData.objectId) {
      console.error(`El ID del objeto es requerido ${formData.objectId}`);
      setIsSaving(false);
      return;
    }
    const objectId = formData.objectId.trim();
    try {
      const db = getFirestore();
      const objectRef = doc(db, "items", objectId);
      const objectDoc = await getDoc(objectRef);

      if (objectDoc.exists()) {
        await updateDoc(objectRef, formData);
        console.log("Object updated successfully!");
        setIsSaving(false);
        setSaveSuccess(true);
      } else {
        console.error(`No se encontró el objeto con ID ${formData.objectId}`);
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Error updating object:", error);
      setIsSaving(false);
    }
  };

  return (
    <form className="mx-6 max-w-2xl sm:mx-4" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <input
            type="text"
            id="objectId"
            name="objectId"
            className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
            value={formData.objectId || ""}
            onChange={handleChange}
            placeholder="ID del objeto a modificar"
          />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Título del anuncio
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
                  value={formData.title || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Descripcion del Destino
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="description"
              rows={3}
              className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="destination"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ciudad
              </label>
              <div className="mt-2">
                <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-white sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="destination"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 px-2"
                    placeholder=""
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="duration"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Duración
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  autoComplete="duration"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
                  value={formData.duration || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pais
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  id="location"
                  autoComplete="location"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
                  value={formData.location || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block
                  text-sm font-medium leading-6 text-gray-900"
              >
                Precio
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  autoComplete="price"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
                  value={formData.price || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="availability"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Disponibilidad
              </label>
              <div className="mt-2">
                <select
                  id="availability"
                  name="availability"
                  autoComplete="availability"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-white sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.availability || ""}
                  onChange={handleChange}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No disponible</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Calificación
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  autoComplete="rating"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
                  value={formData.rating || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 px-2"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder=" Pegar la ruta de la imagen"
      />

      <button
        type="submit"
        className="bg-custom-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm mt-4 my-12"
        disabled={isSaving}
      >
        {isSaving ? "Guardando..." : "Guardar"}
      </button>
      {saveSuccess && (
        <div className="text-green-500 mt-2">
          Cambios guardados con éxito en el Destino con el ID
        </div>
      )}
    </form>
  );
};

export default UpdateObjectForm;
