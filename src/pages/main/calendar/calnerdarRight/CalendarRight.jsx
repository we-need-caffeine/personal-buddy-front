import React, { useState, useRef } from "react";
import S from "./style";

const CalendarRight = () => {
  const [rotated, setRotated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [selectedId, setSelectedId] = useState(null); // ✅ 선택된 항목
  const nextId = useRef(1);

  const handleRotate = () => {
    setRotated((prev) => !prev);
  };

  const handleAddTodo = () => {
    if (todoInput.trim() === "") return;
    setTodos((prev) => [...prev, { id: nextId.current++, text: todoInput }]);
    setTodoInput("");
  };

  // ✅ 완료 ↔ 미완료 전환
  const handleToggleTodo = (todo, isCompleted) => {
    if (isCompleted) {
      setCompletedTodos((prev) => prev.filter((t) => t.id !== todo.id));
      setTodos((prev) => [...prev, todo]);
    } else {
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      setCompletedTodos((prev) => [...prev, todo]);
    }
    setSelectedId(null);
  };

  // ✅ 삭제
  const handleRemoveTodo = (idToRemove) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== idToRemove));
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
            onClick={() => console.log("입력창 체크 아이콘")}
          />
          <S.AddIcon
            src="/assets/images/main/calendar/add.png"
            alt="추가 이미지"
            onClick={handleAddTodo}
          />
        </S.TodoWrapper>

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
                e.stopPropagation();
                handleToggleTodo(todo, false);
              }}
            />
            <S.TodoTextWrapper>{todo.text}</S.TodoTextWrapper>
            {selectedId === todo.id && (
              <S.DeleteIcon
                src="/assets/images/main/calendar/delete.png"
                alt="삭제 아이콘"
                onClick={(e) => {
                  e.stopPropagation();
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
                  onClick={() => handleToggleTodo(todo, true)}
                />
                <S.TodoTextWrapper>{todo.text}</S.TodoTextWrapper>
              </S.TodoDone>
            ))}
          </S.DoneTodoWrapper>
        )}
      </S.TodoContainer>
    </S.Container>
  );
};

export default CalendarRight;