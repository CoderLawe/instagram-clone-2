import { DotsHorizontalIcon, HeartIcon, ChatIcon,  PaperAirplaneIcon, BookmarkIcon, EmojiHappyIcon} from "@heroicons/react/outline"
import {  HeartIcon as HeartIconFilled  } from "@heroicons/react/solid"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, setDoc, doc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase";
// import Moment from "react-moment";

function Post({id, username,  img, userImg, caption}) {

    const {data:session} = useSession()
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(
        () => onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'), 
    orderBy('timestamp', 'desc')), 
    (snapshot) => setComments(snapshot.docs)),
    [db, id])

    useEffect(
        () => onSnapshot(
            collection(db,'posts', id, 'likes'), snapshot => 
    setLikes(snapshot.docs)),
    [db, id])


    useEffect(() => {
        // Goes through every like any checks for a certain predicate(condition)
        setHasLiked(likes.findIndex((like) => (like.id ===session?.user?.uid)) !== -1
        )
    },[likes])

const likePost = async () => {
    if(hasLiked) {
        await deleteDoc(doc(db,'posts',id, 'likes', session.user.uid))
    }else{
    await setDoc(doc(db, 'posts', id, 'likes', session.user.uid),{
        username:session.user.username,
    });
}
}
    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment:commentToSend,
            username: session.user.username,
            userImage:session.user.image,
            timestamp:serverTimestamp(),
        })
    }

  
    console.log('comments', comments)
    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header  */}
            <div className="flex items-center p-5 ">
                <img className="rounded-full h-12 w-12 object-contain border p-1 mr-3" src={userImg} alt="actual img"/>
               {/* Flex 1 makes it take up as much room as it can */}
                <p className="flex-1 font-bold">{username}</p>
                
                <DotsHorizontalIcon className="h-5"/>
            </div>

            {/* Image */}

            <img className="object-cover w-full" src={img} alt=""/>

            {/* Buttons */}

                    <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        {
                            hasLiked ? (
                                <HeartIconFilled onClick={likePost} className="btn text-red-500" />
                            ):(
                                <HeartIcon onClick={likePost}className="btn"/>
                            )}
                        <ChatIcon className="btn"/>
                        <PaperAirplaneIcon className="btn"/>
                    </div>

                    <BookmarkIcon className="btn"/>
                </div>
       

            {/* Caption */}
          <p className="p-5 truncate">
              {likes.length > 0 &&(
                  <p className="font-bold mb-1">{likes.length} likes</p>
              )}
              <span className="font-bold mr-1">{username} </span>
              {caption}
          </p>

          {/* comments  */}

          {comments.length > 0 && (
              <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                  {comments.map(comment => (
                      <div className="flex items-center space-x-2 mb-3" key={comment.id}>
                        <img className="h-7 rounded-full" src={comment.data().userImage} alt="commenter profile image"/>
                        <p className="text-sm flex-1"><span className="font-bold">{comment.data().username} </span>{comment.data().comment}</p>
{/* 
                        <Moment className="pr-5 text-sm" fromNow>
                            {comment.data().timestamp?.toDate()}
                        </Moment> */}
                      </div>
                  ))}
              </div>
          )}
            {/* Input Box */}
            {session && (
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7"/>
                    <input
                     value={comment}
                     onChange={(e) => setComment(e.target.value)} 
                    placeholder="Add a comment..."
                    className="border-none flex-1 focus:ring-0 outline-none"
                    type="text"/>
                    <button 
                    type="submit" 
                    disabled={!comment}
                    // disabled={!comment.trim()}
                    onClick={sendComment}
                    className="font-semibold text-blue-400">Post</button>
                </form>
            )}
       
        </div>
    )
}

export default Post
