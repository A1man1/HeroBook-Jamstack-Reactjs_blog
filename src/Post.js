import axios from 'axios';
import React from 'react';
import fetch from 'fetch';
class Post extends React.Component
{

  constructor(props)
  {
     super(props);
     this.state = {
        error : null,
        isLoaded : false,
        posts : []        
      };

  }

  componentDidMount() {
    // I will use fake api from jsonplaceholder website
    // this return 100 posts 
    fetch("http://127.0.0.1:8000/api")
    .then( response => response.json())
    .then(
        // handle the result
        (result) => {
            this.setState({
                isLoaded : true,
                posts : result
            });
        },

        // Handle error 
        (error) => {
            this.setState({
                isLoaded: true,
                error
            })
        },
    )
}
/*end component mount*/
  
}

export default Post;


/*export default async function data()
{
  let json = await axios.get('http://127.0.0.1:8000/api/');

    // The result of the GET request is available in the json variable.
    // We return it just like in a regular synchronous function.
    const num= json.data.length;
    return JSON.stringify(num);
};
*/
