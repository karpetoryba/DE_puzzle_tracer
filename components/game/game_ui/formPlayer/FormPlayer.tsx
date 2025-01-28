import { Player } from "@/types/player";
import { useState } from "react";

type FormPlayerProps = {
  classname: string;
  onSubmit: () => void;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
};

const FormPlayer = ({ classname, onSubmit, setPlayer }: FormPlayerProps) => {
  const [id, setId] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (id < 1000 || id > 9999) {
      alert("Votre ID est constitué de 4 chiffres");
    } else {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        id: id,
      }));

      onSubmit(); // Notifie le parent que le formulaire est soumis
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${classname}`}>
      <span className="text-2xl">Quel est votre ID ?</span>
      <input
        onChange={handleChange}
        className="text-gray-800 h-[50px] p-4"
        type="text"
        placeholder="Entrez votre ID"
      />
      <button onClick={handleSubmit} className="bg-green-900 h-[50px]">
        Valider
      </button>
    </div>
  );
};

export default FormPlayer;
