import React from 'react'
import Icon from '../../components/Icon/Icon';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

const PosrtDropOp = ({dropdownState,post,currentUser,handleCopyPost,handleDeletePost,dropRef}) => {
  return (
   <>
    {dropdownState[post._id] && (
                    <div
                      ref={dropRef}
                      className={`feed-drop-down`}
                      id={`dropdown-${post._id}`}
                    >
                      <ul>
                        {post.postedBy._id == currentUser.id && (
                          <li
                            onClick={() => {
                              handleDeletePost(post._id, currentUser.id);
                            }}
                            className="delete-post"
                          >
                            <Icon icon={faTrash} />
                            <label>Delete</label>
                          </li>
                        )}
                        <li
                          onClick={() => {
                            handleCopyPost(post.content);
                          }}
                          className="copy-post"
                        >
                          <Icon icon={faCopy} />
                          <label>Copy</label>
                        </li>
                      </ul>
                    </div>
                  )}
   </>
  )
}

export default PosrtDropOp