import React from 'react';


import QuizCard from './QuizCard'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

const QuizMode = () => {

  return (
    <Container maxWidth='md'>
      <Box mt={8}>
        <QuizCard />
      </Box>
    </Container>
  )
}

export default QuizMode;
