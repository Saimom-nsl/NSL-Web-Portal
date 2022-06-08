import React from 'react'
import SingleProject from '../Components/Project Components/Single/SingleProject'

const Projects = () => {
  return (
    <div class="container mt-5 mb-3">
    <div class="d-flex flex-wrap justify-content-center ">
      {[1,2,3].map(p => <SingleProject /> )}
        

    </div>
</div>
  )
}

export default Projects