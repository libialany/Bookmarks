import React from 'react'

function About() {
  return (
    <div className='container'>
    <div className="row">
        <div className="col-md-4">
        When my father died I found two boxes full of old photos and one of them had a flash drive. Some of the photos were simple mementos of a simple, casual gathering of family and friends. The flash drive had a txt file with many links on it. My father used to save links to educational web pages, when I was little I used to learn at home. He used to configure the browser. That's why this application is called Bookmarks.
        </div>
        <div className="col-md-7">
          <div className='card card-style'>
             <img src="internet.jpg" alt="..." className="img"></img> 
          </div>
        </div>
        {/* END TABLE */}
    </div>
</div>    
  )
}

export default About
