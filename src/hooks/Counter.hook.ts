const useCounterHook = () => {
  //@DESC: function starts here....
  const handleIncrement = () => console.log("handleIncrement");
  const handleDecrement = () => console.log("handleDecrement");

  return { handleIncrement, handleDecrement };
};

export default useCounterHook;
