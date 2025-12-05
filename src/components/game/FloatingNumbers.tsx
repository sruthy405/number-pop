const FLOATING_NUMBERS = [
  { value: '7', top: '10%', left: '80%', color: 'hsl(330, 80%, 50%)', delay: '0s' },
  { value: '2', top: '15%', left: '25%', color: 'hsl(45, 100%, 55%)', delay: '1s' },
  { value: '6', top: '30%', left: '5%', color: 'hsl(330, 80%, 50%)', delay: '2s' },
  { value: '3', top: '25%', left: '90%', color: 'hsl(330, 80%, 50%)', delay: '0.5s' },
  { value: '1', top: '55%', left: '8%', color: 'hsl(210, 80%, 55%)', delay: '1.5s' },
  { value: '8', top: '45%', left: '92%', color: 'hsl(330, 80%, 50%)', delay: '2.5s' },
  { value: '0', top: '75%', left: '3%', color: 'hsl(210, 80%, 55%)', delay: '3s' },
  { value: '4', top: '65%', left: '88%', color: 'hsl(330, 80%, 50%)', delay: '0.8s' },
  { value: '5', top: '85%', left: '85%', color: 'hsl(145, 70%, 45%)', delay: '1.2s' },
];

const FloatingNumbers = () => {
  return (
    <>
      {FLOATING_NUMBERS.map((num, index) => (
        <div
          key={index}
          className="floating-number"
          style={{
            top: num.top,
            left: num.left,
            color: num.color,
            animationDelay: num.delay,
          }}
        >
          {num.value}
        </div>
      ))}
    </>
  );
};

export default FloatingNumbers;
