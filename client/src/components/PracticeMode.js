import React from 'react';


import PracticeCard from './PracticeCard'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

const PracticeMode = () => {

  return (
    <Container maxWidth='md'>
      <Box mt={8}>
      <PracticeCard/>
      </Box>
    </Container>
  )
}

export default PracticeMode;
