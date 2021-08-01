const Button = ({ clickHandler, title }) => {
  return (
    <button onClick={() => clickHandler(50)} type='button'>
      {title}
    </button>
  );
};

export default Button;
