"use client";

import React, { useState } from "react";
import { FaEdit, FaSave, FaCamera, FaTrash, FaLock } from "react-icons/fa";
import MenuLateral from "./MenuLateral";

const ProfilePage = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://via.placeholder.com/150"
  );
  const [formData, setFormData] = useState({
    name: "Adam Elias",
    location: "Brasília DF",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    email: "adam.elias@example.com",
    password: "********",
  });
  const [editingField, setEditingField] = useState("");
  const [modalValue, setModalValue] = useState("");

  const handleRemovePhoto = () => {
    setProfilePhoto("https://via.placeholder.com/150");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditField = (field) => {
    setEditingField(field);
    setModalValue(formData[field]);
  };

  const handleSaveField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setEditingField("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral />

      <div className="flex-grow p-8 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="rounded-lg shadow-xl p-6 bg-white">
          <div className="flex gap-6 items-center">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg">
              <img
                src={profilePhoto}
                alt="Foto do Perfil"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white shadow cursor-pointer hover:bg-blue-700"
              >
                <FaCamera />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">{formData.name}</h1>
              <p className="text-gray-600">{formData.location}</p>
              <p className="text-gray-500 mt-2 text-sm">{formData.bio}</p>
              <div className="mt-4 flex items-center gap-4">
                <button
                  className="text-blue-600 flex items-center gap-2 hover:underline"
                  onClick={handleRemovePhoto}
                >
                  <FaTrash /> Remover foto
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {Object.entries(formData).map(([field, value]) => (
              <div
                key={field}
                className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <label className="w-40 text-gray-700 font-medium capitalize">
                  {field === "bio" ? "Biografia" : field}
                </label>
                <p className="flex-grow text-gray-600">{value}</p>

                {field === "email" ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaLock />
                    <span>Inalterável</span>
                  </div>
                ) : (
                  <button
                    className="ml-4 text-blue-600 hover:underline flex items-center gap-2"
                    onClick={() => handleEditField(field)}
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Editar {editingField === "bio" ? "Biografia" : editingField}
            </h2>
            {editingField === "bio" ? (
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
                maxLength={200}
              />
            ) : (
              <input
                type={editingField === "password" ? "password" : "text"}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
              />
            )}
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setEditingField("")}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => handleSaveField(editingField, modalValue)}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
