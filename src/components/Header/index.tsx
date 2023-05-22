import todoLogo from "../../assets/todoLogo.svg";
import { AiOutlinePlusCircle, } from "react-icons/ai";
import styles from "./header.module.css";
import { ChangeEvent, FormEvent, useState, useEffect  } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setHideContent(true);
      } else {
        setHideContent(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (title.trim() === "") {
      toast.error("Por favor, preencha o campo de entrada!");
      return; // Retorna se o campo de entrada estiver vazio ou contiver apenas espaços em branco
    }

    onAddTask(title);
    toast.success("Tarefa adicionada com sucesso!");
    setTitle(""); 
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles.header}>
    <img src={todoLogo} />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    <form onSubmit={handleSubmit} className={`${styles.newTaskForm} ${hideContent ? "hide-content" : "a"}`}>
      <input
        placeholder="Adicione uma nova tarefa"
        type="text"
        value={title}
        onChange={onChangeTitle}
      />
      <button type="submit">
        {hideContent ? <AiOutlinePlusCircle size={20} /> : (
          <>
            Adicionar
         <span>
            <AiOutlinePlusCircle size={20} />
          </span>
        </>
      )}
    </button>
  </form>
</header>
  );
}
