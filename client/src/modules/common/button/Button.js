const Button = ({ clickHandler, title, styling }) => {
  return (
    <button className={styling} onClick={() => clickHandler(50)} type='button'>
      {title}
    </button>
  );
};

export default Button;
