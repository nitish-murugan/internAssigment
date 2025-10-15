import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false,
  onClick = null,
  padding = 'medium'
}) => {
  return (
    <div
      className={`card card-${padding} ${hoverable ? 'card-hoverable' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
