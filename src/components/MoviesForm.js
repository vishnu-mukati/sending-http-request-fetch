import { Fragment, useState } from "react";

const MoviesForm = (props) => {
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
            title: enteredtitle,
            openingText: enteredtext,
            releaseDate: entereddata
          }
          props.onAddMovie(NewMovieObj);

          setEnteredTitle('');
          setEnteredText('');
          setEnteredData('');
    }
   
    return (
        <Fragment>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={enteredtitle} onChange={inputChangeHandler}/>
                </div>
                <div>
                    <label htmlFor="text">Opening Text</label>
                    <input type="text" id="text" value={enteredtext} onChange={textChangeHandler}/>
                </div>
                <div>
                    <label htmlFor="date">Release Date</label>
                    <input type="date" id="date" value={entereddata} onChange={dataChangeHandler}/>
                </div>
                <div>
                    <button type="submit">Add Movies</button>
                </div>
            </form>
        </Fragment>
    );
}

export default MoviesForm;