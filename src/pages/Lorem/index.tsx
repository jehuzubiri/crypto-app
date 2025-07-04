import { usePathname } from "next/navigation";
import useCounterHook from "@/hooks/Counter.hook";

const LoremPage: React.FC = () => {
  const pathname = usePathname();

  //@DESC: function starts here....
  const { handleDecrement, handleIncrement } = useCounterHook();

  return (
    <section>
      <h1>Dynamic Page</h1>
      <p>{`This is the dynamic page: ${pathname} and sample current count is: ${1}`}</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </section>
  );
};

export default LoremPage;
