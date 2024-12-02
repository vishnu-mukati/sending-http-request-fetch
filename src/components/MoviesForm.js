import { Fragment, useState } from "react";

const MoviesForm = () => {
    const [enteredtitle,setEnteredTitle] = useState('');
    const [enteredtext,setEnteredText] = useState('');
    const [entereddata,setEnteredData] = useState('');


    const inputChangeHandler = (event) =>{
        setEnteredTitle(event.target.value)
    }

    const textChangeHandler = (event) =>{
          setEnteredText(event.target.value);
    }

    const dataChangeHandler = (event) =>{
          setEnteredData(event.target.value);
    }

    const submitFormHandler = (event) =>{
          event.preventDefault();
          const NewMovieObj = {
            enteredtitle,
            enteredtext,
            entereddata,
          }
          console.log(NewMovieObj);

          setEnteredTitle(' ');
          setEnteredText(' ');
          setEnteredData(' ');
    }
   
    return (
        <Fragment>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={inputChangeHandler}/>
                </div>
                <div>
                    <label htmlFor="text">Opening Text</label>
                    <input type="text" id="text" onChange={textChangeHandler}/>
                </div>
                <div>
                    <label htmlFor="date">Release Date</label>
                    <input type="date" id="date" onChange={dataChangeHandler}/>
                </div>
                <div>
                    <button>Add Movies</button>
                </div>
            </form>
        </Fragment>
    );
}

export default MoviesForm;