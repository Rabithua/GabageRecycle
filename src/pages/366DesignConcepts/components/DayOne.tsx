import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Check, Edit3Icon } from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import "../styles/index.css";
import NoStyleInput from "./NoStyleInput";

export default function DayOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("Groceries list");
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Whole milk", completed: true },
    { id: 2, text: "Tomatos", completed: false },
    { id: 3, text: "Chicken tenders", completed: false },
    { id: 4, text: "Orange juice", completed: false },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from("#thirdContainer", {
        borderRadius: "17.5%",
        duration: 0.5,
        ease: "ease.inOut",
      });

      tl.from("#secondContainer", {
        borderRadius: "17.5%",
        duration: 1,
        ease: "ease.inOut",
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      id="firstContainer"
      className="w-full h-full bg-[#CCB689] shadow-[inset_0_0_0_0.2cqw_#00000010] rounded-[17.5%] overflow- selectColor"
      style={{ containerType: "inline-size" }}
    >
      <div
        id="secondContainer"
        className="w-full h-full rounded-[17.5%] rounded-br-[33%] shadow-[inset_0_0_0_0.2cqw_#00000010] bg-[#E5D4B1]"
      >
        <div
          id="thirdContainer"
          className="w-full h-full flex flex-col py-[10%] px-[8%] shadow-[inset_0_0_0_0.2cqw_#00000010] bg-[#FFF4DE] rounded-[17.5%] rounded-br-[45%] overflow-hidden"
        >
          <div className="shrink-0 flex justify-between items-center mb-[6%]">
            <div className="font-medium text-[4cqw] text-[#715c42]/60 tracking-widest">
              NOTES
            </div>
            <div className="text-[#715c42]/40 text-[4cqw]">
              {moment().format("MMM D, YYYY")}
            </div>
          </div>

          <div className="shrink-0 font-medium text-[#715c42] text-[10cqw] leading-[1.1] truncate">
            <NoStyleInput value={title} onChange={(value) => setTitle(value)} />
          </div>

          <div
            ref={listRef}
            className="grow flex flex-col mb-[2%] py-[3%] gap-[5%] overflow-scroll [mask-image:linear-gradient(180deg,transparent_0%,#000_10%,#000_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,#000_10%,#000_90%,transparent_100%)]"
          >
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`w-full flex duration-300 gap-[3.5%] items-center ${
                  !todo.completed ? " text-[#715c42]/40" : "text-[#715c42]"
                }`}
              >
                <div className="shrink-0 w-[6cqw] h-[6cqw] relative">
                  <input
                    className="block cursor-pointer w-full h-full accent-[#715c42]/60 rounded-full appearance-none checked:bg-[#715c42]/60 border-[#715c42]/40 border-[0.4cqw] duration-300"
                    style={{ outline: "none" }}
                    aria-label="Mark todo as completed"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      setTodos((prevTodos) =>
                        prevTodos.map((t) =>
                          t.id === todo.id
                            ? { ...t, completed: !t.completed }
                            : t
                        )
                      )
                    }
                  />
                  <Check
                    className={`pointer-events-none absolute top-0 left-0 w-full h-full text-white ${todo.completed ? "scale-80" : "scale-0"} duration-300`}
                  />
                </div>

                <div className="text-[6cqw] truncate">
                  <NoStyleInput
                    value={todo.text}
                    onChange={(value) =>
                      setTodos((prevTodos) =>
                        value.trim() === ""
                          ? prevTodos.filter((t) => t.id !== todo.id)
                          : prevTodos.map((t) =>
                              t.id === todo.id ? { ...t, text: value } : t
                            )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 flex items-center gap-[2%]">
            <Edit3Icon className="shrink-0 text-[#715c4280] w-[6cqw] h-[6cqw]" />
            <div className="font-normal text-[#715c4280] text-[7cqw] leading-[1.1] truncate">
              <NoStyleInput
                value={newTodo}
                onChange={(value) => setNewTodo(value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTodo.trim()) {
                    setTodos((prevTodos) => {
                      const newList = [
                        ...prevTodos,
                        {
                          id: Date.now(),
                          text: newTodo.trim(),
                          completed: false,
                        },
                      ];
                      setTimeout(() => {
                        if (listRef.current) {
                          listRef.current.scrollTo({
                            top: listRef.current.scrollHeight,
                            behavior: "smooth",
                          });
                        }
                      }, 0);
                      return newList;
                    });
                    setNewTodo("");
                  }
                }}
                placeholder="Add a new task"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
