import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface FormPlayerProps {
  classname?: string;
  onSubmit: () => void;
}

const FormPlayer: React.FC<FormPlayerProps> = ({ classname, onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    if (username.trim()) {
      onSubmit();
    } else {
      alert("Veuillez saisir un nom !");
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${classname}`}>
      <span className="text-2xl">Quel est votre identifiant ?</span>
      <input
        onChange={handleChange}
        value={username}
        className="text-gray-800 h-[50px] p-4"
        type="text"
        placeholder="Entrez votre identifiant"
      />
      <button onClick={handleSubmit} className="h-[50px] flex items-center justify-center formPlayerButton">
        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
        Valider
      </button>
    </div>
  );
};

export default FormPlayer;