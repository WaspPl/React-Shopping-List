import Button from './Button';

function Toggle({onChange, value, valueOn, valueOff, color, variant}) {
  return (
    <div className="flex items-center align-middle place-content-center">
      <Button onClick={onChange} square color={color} variant={variant}>
        {value ? valueOff : valueOn }
      </Button>
    </div>
    )
}

export default Toggle