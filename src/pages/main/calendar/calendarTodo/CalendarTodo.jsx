import React, { useContext, useEffect, useState } from "react";
import S from "./style";
import { useParams } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";

const CalendarTodo = () => {
  const { memberId, calendarId } = useParams();
  const { state } = useContext(CalendarContext);
  const { calendars} = state;

  const [rotated, setRotated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const todosNotCompleted = [];
    const todosCompleted = [];
    //console.log(calendars);
    calendars.forEach((calendar) => {
      //console.log(calendar);
      console.log(calendar);
      if (calendar.id === Number(calendarId)) {
        calendar.todoLists.forEach((todo) => {
          const formattedTodo = {
            id: todo.id,
            text: todo.todoListContent,
          };

          if (todo.todoListIsCompleted === 0) {
            todosNotCompleted.push(formattedTodo);
          } else if (todo.todoListIsCompleted === 1) {
            todosCompleted.push(formattedTodo);
          }
        });
      }
    });

    setTodos(todosNotCompleted);
    setCompletedTodos(todosCompleted);
  }, [calendarId, calendars]);

  const handleRotate = () => {
    setRotated((prev) => !prev);
  };

  const handleAddTodo = async () => {
    if (todoInput.trim() === "") return;
    try {
      const response = await fetch(
        "http://localhost:10000/todo-lists/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todoListContent: todoInput,
            calendarId: calendarId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("할 일 등록 실패");
      }
      const data = await response.json();
      console.log(todoInput)
      console.log(calendarId);
      //console.log("등록 후 응답:", data);
      const savedTodo = {
        id: data,
        text: todoInput,
      };
      setTodos((prev) => [...prev, savedTodo]);
      setTodoInput("");
    } catch (error) {
      console.error("할 일 등록 에러:", error);
    }
  };

  const handleToggleTodo = async (todo, isCompleted) => {
    const updatedStatus = isCompleted ? 0 : 1;
    try {
      const response = await fetch(
        `http://localhost:10000/todo-lists/api/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todoListContent: todo.text,
            todoListIsCompleted: updatedStatus,
            id: todo.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("할 일 상태 업데이트 실패");
      }

      const updatedTodo = { ...todo, todoListIsCompleted: updatedStatus };

      if (isCompleted) {
        setCompletedTodos((prev) => prev.filter((t) => t.id !== todo.id));
        setTodos((prev) => [...prev, updatedTodo]);
      } else {
        setTodos((prev) => prev.filter((t) => t.id !== todo.id));
        setCompletedTodos((prev) => [...prev, updatedTodo]);
      }

      setSelectedId(null);
    } catch (error) {
      console.error("할 일 완료 에러:", error);
    }
  };

  useEffect(() => {
    // console.log("selectedId:", selectedId);
    // console.log("todos:", todos);
  }, [selectedId, todos]);

  const handleRemoveTodo = async (idToRemove) => {
    try {
      const response = await fetch(
        `http://localhost:10000/todo-lists/api/${idToRemove}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("서버에서 삭제 실패");
      }

      // 두 목록에서 모두 제거
      setTodos((prev) => prev.filter((todo) => todo.id !== idToRemove));
      setCompletedTodos((prev) =>
        prev.filter((todo) => todo.id !== idToRemove)
      );
    } catch (error) {
      console.error("할 일 삭제 에러:", error);
    }
    setSelectedId(null);
  };

  return (
    <S.Container>
      <S.TodoContainer>
        {/* 입력 영역 */}
        <S.TodoWrapper>
          <S.TodoInput
            placeholder="할 일을 입력하세요"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <S.CircleIcon
            src="/assets/images/main/calendar/circle.png"
            alt="체크 이미지"
          />
          <S.AddIcon
            src="/assets/images/main/calendar/add.png"
            alt="추가 이미지"
            onClick={handleAddTodo}
          />
        </S.TodoWrapper>
      </S.TodoContainer>

      <S.ScrollContainer>
        {/* 할 일 목록 */}
        {todos.map((todo) => (
          <S.TodoWritten
            key={todo.id}
            onClick={() =>
              setSelectedId((prev) => (prev === todo.id ? null : todo.id))
            }
          >
            <S.CircleIcon
              src="/assets/images/main/calendar/circle.png"
              alt="체크 이미지"
              onClick={(e) => {
                handleToggleTodo(todo, false);
              }}
            />
            <S.TodoTextWrapper>{todo.text}</S.TodoTextWrapper>
            {selectedId === todo.id && (
              <S.DeleteIcon
                src="/assets/images/main/calendar/delete.png"
                alt="삭제 아이콘"
                onClick={(e) => {
                  handleRemoveTodo(todo.id);
                }}
              />
            )}
          </S.TodoWritten>
        ))}

        {/* 완료됨 토글 */}
        <S.DoneWrapper>
          <S.IconButton onClick={handleRotate}>
            <S.ArrowIcon
              src="/assets/images/main/calendar/arrow.png"
              alt="화살표 이미지"
              rotated={rotated}
            />
          </S.IconButton>
          <S.TodoTextWrapper>완료됨</S.TodoTextWrapper>
        </S.DoneWrapper>

        {/* 완료된 할 일 목록 */}
        {rotated && (
          <S.DoneTodoWrapper>
            {completedTodos.map((todo) => (
              <S.TodoDone key={todo.id}>
                <S.CircleIcon
                  src="/assets/images/main/calendar/check.png"
                  alt="완료 체크"
                  onClick={(e) => {
                    handleToggleTodo(todo, true);
                  }}
                />
                <S.TodoTextWrapper>{todo.text}</S.TodoTextWrapper>
                <S.DeleteIcon
                  src="/assets/images/main/calendar/delete.png"
                  alt="삭제 아이콘"
                  onClick={(e) => {
                    handleRemoveTodo(todo.id);
                  }}
                />
              </S.TodoDone>
            ))}
          </S.DoneTodoWrapper>
        )}
      </S.ScrollContainer>
    </S.Container>
  );
};

export default CalendarTodo;
