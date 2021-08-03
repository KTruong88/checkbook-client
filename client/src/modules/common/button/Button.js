const Button = ({ clickHandler, title, styling }) => {
  return (
    <button className={styling} onClick={() => clickHandler()} type='button'>
      {title}
    </button>
  );
};

export default Button;
