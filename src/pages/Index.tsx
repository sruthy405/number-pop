import { Helmet } from 'react-helmet-async';
import NumberPopGame from '@/components/game/NumberPopGame';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Number Pop - Fun Math Puzzle Game</title>
        <meta name="description" content="Test your math skills with Number Pop! Practice addition, subtraction, multiplication, square roots, and cube roots in this fun and addictive number puzzle game." />
      </Helmet>
      <NumberPopGame />
    </>
  );
};

export default Index;
