/* eslint-disable no-unused-vars */
import { useState, useMemo, useCallback } from "react";
import {
  Checkbox,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFetch } from "../../hooks/useFetch.js";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { useMutation } from "../../hooks/useMutation.js";
import { HTTP_METHOD } from "../../hooks/http-methods.js";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [newTask, setNewTask] = useState("");

  const { getCustomUser } = useAuth();
  const {
    data,
    isLoading,
    reFetch: fetchTodo,
  } = useFetch(`users?_id=${getCustomUser()._id}`);
  const toggleTodoHandler = useMutation("users/todo/toggle", HTTP_METHOD.PATCH);
  const addTodoHandler = useMutation("users/todo", HTTP_METHOD.POST);

  const todoList = useMemo(() => {
    if (isLoading || !data) return [];
    return data[0]?.todoList;
  }, [data, isLoading]);

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const handleAddTask = useCallback(async () => {
    if (newTask.trim() === "") {
      setNewTask("");
      return;
    }
    await addTodoHandler.run({
      body: { content: newTask },
      query: { userId: getCustomUser()._id },
    });
    setNewTask("");
    await fetchTodo();
  }, [addTodoHandler, newTask, getCustomUser, fetchTodo]);

  const handleTaskComplete = useCallback(
    async (content) => {
      await toggleTodoHandler.run({
        body: { content },
        query: { userId: getCustomUser()._id },
      });
      await fetchTodo();
    },
    [toggleTodoHandler, getCustomUser, fetchTodo]
  );

  return (
    <div className="bg-white shadow-lg rounded-md p-8 flex flex-col justify-between text-gray-800 overflow-y-auto scrollbar">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3" className="font-semibold text-xl">
          My Tasks
        </Typography>
        <Button
          variant="outlined"
          className="text-gray-800 border-gray-800"
          onClick={handleHideCompleted}
        >
          {hideCompleted ? "Show" : "Hide"} Completed
        </Button>
      </div>
      <Divider className="my-2 border-gray-800" />
      {/* Tasks to do */}
      <List>
        {todoList
          .filter(({ isCompleted }) => !isCompleted)
          ?.map(({ content }) => (
            <ListItem key={`${Math.random()}`} className="flex items-center">
              <Checkbox onChange={() => handleTaskComplete(content)} />
              <ListItemText primary={content} />
            </ListItem>
          ))}
      </List>

      {/* Completed tasks */}
      {!hideCompleted && (
        <>
          {tasks.length > 0 && <Divider className="my-1 border-gray-800" />}
          <List>
            {todoList
              .filter(({ isCompleted }) => isCompleted)
              ?.map(({ content }) => (
                <ListItem
                  key={`${Math.random()}`}
                  className="flex items-center"
                >
                  <Checkbox
                    color="secondary"
                    checked
                    onChange={() => handleTaskComplete(content)}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        color="secondary"
                        variant="body1"
                        className="line-through"
                      >
                        {content}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </>
      )}

      {/* Add new task */}
      <div className="flex justify-start items-center mt-4">
        <TextField
          placeholder="Add new TODO"
          fullWidth={false}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          variant="standard"
          className="flex-1"
        />
      </div>
      <div className="py-2 mx-auto">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}
