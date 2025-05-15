import React, { useState, useRef } from "react";
import S from "./style";

const CalendarRight = () => {
  const [rotated, setRotated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const nextId = useRef(1);

  const handleRotate = () => {
    setRotated((prev) => !prev);
  };

  const handleAddTodo = () => {
    if (todoInput.trim() === "") return;
    setTodos((prev) => [
      ...prev,
      { id: nextId.current++, text: todoInput },
    ]);
    setTodoInput("");
  };

  // ✅ 토글 함수: 완료 → 할 일 / 할 일 → 완료
  const handleToggleTodo = (todo, isCompleted) => {
    if (isCompleted) {
      // 완료 목록 → 할 일 목록
      setCompletedTodos((prev) => prev.filter((t) => t.id !== todo.id));
      setTodos((prev) => [...prev, todo]);
    } else {
      // 할 일 목록 → 완료 목록
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      setCompletedTodos((prev) => [...prev, todo]);
    }
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
          <S.TodoWritten key={todo.id}>
            <S.CircleIcon
              src="/assets/images/main/calendar/circle.png"
              alt="체크 이미지"
              onClick={() => handleToggleTodo(todo, false)} // ✅ false: 할 일 목록
            />
            <S.TodoTextWrapper>{todo.text}</S.TodoTextWrapper>
          </S.TodoWritten>
        ))}

        {/* 완료 토글 버튼 */}
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

        {/* 완료 목록 */}
        {rotated && (
          <S.DoneTodoWrapper>
            {completedTodos.map((todo) => (
              <S.TodoDone key={todo.id}>
                <S.CircleIcon
                  src="/assets/images/main/calendar/check.png"
                  alt="완료 체크"
                  onClick={() => handleToggleTodo(todo, true)} // ✅ true: 완료 목록
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