import { useState, useMemo, useCallback } from "react";
import {
  Box,
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

/**
 * This allows user to set a to do list. Users can add tasks to remind themselves.
 */

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
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
    <Box
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "10px",
        padding: "2vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "black",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0,0,0,0)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,.4)",
        },
      }}
    >
      {/* title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h3">My Tasks</Typography>
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "black" }}
          onClick={handleHideCompleted}
        >
          {hideCompleted ? "Show" : "Hide"} completed
        </Button>
      </Box>
      <Divider sx={{ my: 2, borderBottomWidth: 3, bgcolor: "black" }} />
      {/* tasks to do */}
      <List>
        {todoList
          .filter(({ isCompleted }) => !isCompleted)
          ?.map(({ content }) => (
            <ListItem key={`${Math.random()}`}>
              <Checkbox onChange={() => handleTaskComplete(content)} />
              <ListItemText primary={content} />
            </ListItem>
          ))}
      </List>

      {/* complete tasks */}
      {!hideCompleted && (
        <>
          {tasks.length > 0 && completedTasks.length > 0 && (
            <Divider sx={{ my: 1, borderBottomWidth: 3 }} />
          )}
          <List>
            {todoList
              .filter(({ isCompleted }) => isCompleted)
              ?.map(({ content }) => (
                <ListItem key={`${Math.random()}`}>
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
                        style={{ textDecoration: "line-through" }}
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          placeholder={"Add new TODO"}
          fullWidth={false}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          variant={"standard"}
          sx={{ flex: 1 }}
        />
        <Button
          variant="text"
          sx={{ color: "black", borderColor: "black" }}
          onClick={handleAddTask}
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
}
