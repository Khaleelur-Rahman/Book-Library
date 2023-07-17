import { collection, getDocs, query, deleteDoc, doc} from "firebase/firestore";
import connection from "../backend/connection";
import React, { useEffect, useState } from "react";
import { trimAndAddDots } from "../components/utils";
import { auth } from "../backend/firebase-config";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noBookCoverImage from "../images/No-book-cover.png";


function Read() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function setLink(url) {
    window.location.href = url;
  }

  async function bookDelete(id,title) {
    const db = connection();
    localStorage.setItem("bookTitle",title)
    localStorage.setItem("action", "deleted");
    // console.log(localStorage.getItem('bookTitle'));
    // const res = await db.collection('Read').doc(id).delete();
    // console.log(id);
    const res = await deleteDoc(doc(db, "Read",id));
    // console.log(res);
    setLink("/Read");
  }

  useEffect(() => {
    const fetchData = async (user) => {
      const db = connection();
      const docsSnap = await getDocs(query(collection(db, "Read")));
      const imageElements = docsSnap.docs
        .filter((doc) => doc.data().userId === user.uid)
        .map((doc) => {
          const book = doc.data().book;
          // console.log(doc.data());
          return (
            <div className="book-details">
              <img
                key={doc.id}
                className="read-books-image"
                src={book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail: noBookCoverImage}
                alt={book.volumeInfo?.title}
              />
              <div className="text-xl text-slate-800 font-semibold subpixel-antialiased m-3">{trimAndAddDots(book.volumeInfo.title)}</div>
              <div className="text-lg ">Rating : {doc.data().rating} / 5</div>
              <div className="image-links"> 
                <Link
                    to={"/BookForm/ReadlistReview"} state={{ state: book, bookRating: doc.data().rating, bookDescription: doc.data().description, bookDate: doc.data().dateCompleted, docId: doc.data().docId}}
                    className="add-read"
                    >
                    View and Edit Description
                </Link>
                <br />
                <div onClick={() => setLink(book.volumeInfo.infoLink)}>
                    Book Details
                </div>
                <div className ="mt-6" onClick={() => bookDelete(doc.data().docId, book.volumeInfo.title)}>
                  Delete
                </div>

              </div>
            </div>
          );
        });
      setImages(imageElements);
      setIsLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData(user);
      } else {
        setIsLoading(false);
        window.location.href = "/Login";
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const displayToast = () => {
    // console.log(localStorage.getItem('bookTitle'));
    if(localStorage.getItem('bookTitle') !== null) {
      const title = localStorage.getItem('bookTitle');
      const action = localStorage.getItem('action');
      localStorage.clear();

      // return (
      //   <div className="absolute p-2 right-0 top-30 border-2 border-cyan-400 rounded-lg font-bold text-slate-500">
      //     {`${title} was ${action}`}
      //   </div>
      // )

      toast(`${title} was ${action}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-16">
        {displayToast()}
        <div className="read-header">Readlist</div>
        <br /><br />
        <div className="read-books">{images}</div>
      </div>
    </div>
  );
}

export default Read;