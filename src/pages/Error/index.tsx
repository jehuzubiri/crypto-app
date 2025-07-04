import { useEffect } from "react";
import { TheAnyToDo } from "@/models/General.model";

const ErrorPage: React.FC<TheAnyToDo> = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <section>
      <h2>Error Page</h2>
      <p>Oops! An error occurred: {error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </section>
  );
};

export default ErrorPage;
