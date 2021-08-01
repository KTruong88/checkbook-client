const Button = ({ clickHandler, title }) => {
  return (
    <button onClick={clickHandler} type='button'>
      {title}
    </button>
  );
};

export default Button;
