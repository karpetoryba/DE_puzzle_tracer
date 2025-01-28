import { useState } from "react";

type FormPlayerProps = {
  classname: string;
  onSubmit: () => void;
};

const FormPlayer = ({ classname, onSubmit }: FormPlayerProps) => {
  const [username, setUsername] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    if (username.trim()) {
      onSubmit(); // Notifie le parent que le formulaire est soumis
    } else {
      alert("Veuillez saisir un nom !");
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${classname}`}>
      <span className="text-2xl">Comment te nommes-tu ?</span>
      <input
        onChange={handleChange}
        value={username}
        className="text-gray-800 h-[50px] p-4"
        type="text"
        placeholder="Entrez votre nom"
      />
      <button onClick={handleSubmit} className="bg-green-900 h-[50px]">
        Valider
      </button>
    </div>
  );
};

export default FormPlayer;
