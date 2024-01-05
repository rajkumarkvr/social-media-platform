import React from 'react'
import Alert from '../../components/Alert/Alert';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../components/Icon/Icon';

const FeedAlerts = ({err,errMsg,isCopied}) => {
  return (
   <>
           {err && (
          <>
            {" "}
            <Alert className="err-alert" varient="danger">
              <Icon icon={faWarning} />
              Error occured {errMsg}.Please check your connection
            </Alert>
            <button
              className="err-alert-btn"
              onClick={() => {
                window.location.reload();
              }}
            >
              Try Again
            </button>
          </>
        )}

        {isCopied && (
          <Alert className="copied-alert" varient="success">
            Post Copied Successfully.
          </Alert>
        )}
   </>
  )
}

export default FeedAlerts