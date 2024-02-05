import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Information = () => {
    return (
      <>
        <Head>
          <title>Ninja List | Information</title>
          <meta name="keywords" content="ninjas"/>
        </Head>
        <div>
        <h1><FontAwesomeIcon icon={faCircleInfo} /> Information</h1>
          <p>Welcome to our comprehensive educational game, where learning about sexual education is not only informative but also engaging.<br/>
            Dive into different facets of understanding with our quiz game, testing your knowledge, navigate real-life situations in our scenario challenge,
            promoting critical thinking.<br/>
            Join the open dialogue in our discussion forum for healthy conversations, embark on an interactive journey with our story mode, 
            and track your progress with insightful statistics that provide valuable feedback.<br/>
            This immersive experience aims to make learning both enlightening and enjoyable, fostering a more informed and empowered you.
          </p>        
        </div>
      </>
    );
  }
   
  export default Information;