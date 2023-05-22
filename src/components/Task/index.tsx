import React from "react";
import { TbTrash, TbPencil } from "react-icons/tb";
import { BsFillCheckCircleFill, BsCheckCircleFill } from "react-icons/bs";

import styles from "./task.module.css";
import { ITask } from "../../App";

interface Props {
  task: ITask;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdateTitle: (taskId: string, newTitle: string) => void;
}

export function Task({ task, onComplete, onDelete, onUpdateTitle }: Props) {
  const [editMode, setEditMode] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(task.title);

  const handleEdit = () => {
    if (!task.isCompleted) {
      if (editMode) {
        setEditMode(false);
        onUpdateTitle(task.id, editedTitle);
      } else {
        setEditMode(true);
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleUpdateTitle = () => {
    if (editedTitle !== task.title) {
      onUpdateTitle(task.id, editedTitle);
    }
  };

  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task.id)}
      >
        {task.isCompleted ? (
          <BsFillCheckCircleFill style={{ verticalAlign: "middle" }} />
        ) : (
          <div />
        )}
      </button>

      {editMode ? (
        <input 
        type="text" 
        value={editedTitle} 
        onChange={handleTitleChange} 
        onBlur={handleUpdateTitle} 
        className={styles.inputEdit} 
        disabled={task.isCompleted}/>
      ) : (
        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {editedTitle}
        </p>
      )}

        {task.isCompleted ? (
          <span className={styles.tagCompleta}>Concluída</span>
        ) : (
          <span className={styles.tagPendente}>Pendente</span>
        )}

      {!task.isCompleted && (
        <button className={styles.editButton} onClick={handleEdit} disabled={task.isCompleted}>
          {editMode ? (
            <BsCheckCircleFill size={20} style={{ verticalAlign: "middle" }} />
          ) : (
            <TbPencil size={20} style={{ verticalAlign: "middle" }} />
          )}
        </button>
      )}

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} style={{ verticalAlign: "middle" }} />
      </button>
    </div>
  );
}
